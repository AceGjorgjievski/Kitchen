import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {ShoppingCart} from "../models/ShoppingCart";
import {FirestoreService} from "../firestore/firestore.service";
import {FirebaseService} from "../firebase/firebase.service";
import {ShoppingCartDto} from "../models/ShoppingCartDto";


@Injectable()
export class ShoppingCartService {

    constructor(private readonly firestoreService: FirestoreService,
                private readonly firebaseService: FirebaseService) {}


    async getAll(): Promise<ShoppingCart[]> {
        const shoppingCarts = await this.firestoreService.getDocuments("shoppingCarts");
        return shoppingCarts.map(doc => ({
            id: doc.data().id,
            username: doc.data().username,
            userId: doc.data().userId,
            createdAt: doc.data().createdAt,
            shoppingCartItems: doc.data().shoppingCartItems,
            totalPrice: doc.data().totalPrice,
        }))
    }

    async getById(shoppingCartId: string) : Promise<ShoppingCart> {
        const allShoppingCarts = await this.getAll();
        const foundShoppingCart = allShoppingCarts.find((shoppingCart) => shoppingCart.id === shoppingCartId);

        if(!foundShoppingCart) {
            throw new ConflictException(`ShoppingCart with id: ${shoppingCartId} does not exist`);
        }

        return foundShoppingCart;
    }

    async getByUserId(authHeader: string): Promise<ShoppingCart | undefined> {

        const token = authHeader.replace('Bearer ', '');
        if(!token) {
            throw new UnauthorizedException('No token provided');
        }
        const currentUser = await this.firebaseService.checkLoggedInUser(token);


        const userShoppingCart = await this.getById(currentUser?.shoppingCartId);
        return userShoppingCart;
    }


    async addMealToCart(body: ShoppingCartDto) : Promise<void> {
        try {

            const cartDoc = await this.firestoreService.getDocument("shoppingCarts", body.shoppingCartId);

            if (cartDoc) {

                // Check for existing item
                const existingItemIndex = cartDoc.shoppingCartItems.findIndex(
                    (item: ShoppingCartDto) => item.mealId === body.mealId
                );
                console.log("Existing item index:", existingItemIndex);

                if (existingItemIndex !== -1) {
                    // Update existing item quantity
                    cartDoc.shoppingCartItems[existingItemIndex].quantity += body.quantity;
                    console.log(`Updated quantity for mealId ${body.mealId}:`, cartDoc.shoppingCartItems[existingItemIndex]);
                } else {
                    cartDoc.shoppingCartItems.push({
                        mealId: body.mealId,
                        mealImage: body.mealImage,
                        mealName: body.mealName,
                        quantity: body.quantity,
                        price: body.price
                    });
                    console.log("Added new meal to cart:", cartDoc.shoppingCartItems);
                }

                // Update the cart in Firestore
                await this.firestoreService.update("shoppingCarts", body.shoppingCartId, {
                    shoppingCartItems: cartDoc.shoppingCartItems
                });
            } else {
                // Create a new cart if it doesn't exist
                const newCart = {
                    id: body.shoppingCartId,
                    userId: body.shoppingCartId,
                    createdAt: new Date().toISOString(),
                    shoppingCartItems: [{
                        mealId: body.mealId,
                        mealImage: body.mealImage,
                        quantity: body.quantity,
                        price: body.price
                    }]
                };

                await this.firestoreService.addDocument("shoppingCarts", body.shoppingCartId, newCart);
                console.log("Created new shopping cart:", newCart);
            }
        } catch (err) {
            console.error("Error occurred while adding meal to the shopping cart:", err);
            throw new ConflictException(`Error adding meal to the shopping cart with id: ${body.shoppingCartId}`);
        }
    }

    async calculateTotalPrice(userId: string): Promise<number> {
        const currentUserShoppingCart: ShoppingCart = await this.getByUserId(userId);
        const allShoppingCartItems = currentUserShoppingCart.shoppingCartItems;
        var totalAmount = 0;

        for(const shoppingCartItem of allShoppingCartItems) {
            var totalPriceInShoppingCart = shoppingCartItem.price * shoppingCartItem.quantity;

            totalAmount += totalPriceInShoppingCart;
        }


        return totalAmount;
    }
}
