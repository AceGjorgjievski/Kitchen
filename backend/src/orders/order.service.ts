import {ConflictException, Injectable, UnauthorizedException} from "@nestjs/common";
import {Order} from "../models/Order";
import {OrderDto} from "../models/OrderDto";
import {FirestoreService} from "../firestore/firestore.service";
import {FirebaseService} from "../firebase/firebase.service";
import {OrderState} from "../models/enums/OrderState";


@Injectable()
export class OrderService {

    constructor(private readonly firestoreService: FirestoreService,
                private readonly firebaseService: FirebaseService) {
    }

    async getAll(): Promise<Order[]> {
        const users = await this.firestoreService.getDocuments("orders");

        const allOrders = [];

        for (const userDoc of users) {
            const userOrders = await this.firestoreService.getDocuments(`orders/${userDoc.id}/orders`);

            userOrders.forEach(doc => {
                const data = doc.data();
                allOrders.push({
                    id: data.id,
                    totalPrice: data.totalPrice,
                    shoppingCartItems: data.shoppingCartItems,
                    createdAt: data.createdAt,
                    userId: data.userId,
                    userName: data.userName,
                    userEmail: data.userEmail,
                    orderState: data.orderState || OrderState.Issued // Default to 'Issued' if not set
                });
            });
        }

        return allOrders;
    }

    async add(body: OrderDto, authHeader: string): Promise<Order> {
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        // Verify the user token and get current user
        const currentUser = await this.firebaseService.checkLoggedInUser(token);

        try {
            // Check if a document for the user exists in the 'orders' collection
            const userOrderDoc = await this.firestoreService.getDocument("orders", currentUser.id);

            // If the user order document does not exist, create it
            if (!userOrderDoc) {
                // Create a user document with an empty orders subcollection
                await this.firestoreService.addDocument("orders", currentUser.id, {
                    userId: currentUser.id
                });
                console.log("User document created in orders collection");
            }

            // Add the new order to the 'orders' subcollection under the user document
            const newOrder: Order = {
                id: '',  // Generate unique order ID
                totalPrice: body.totalPrice,
                userId: currentUser.id,
                userName: currentUser.name,
                userEmail: currentUser.email,
                shoppingCartItems: body.shoppingCartItems,
                createdAt: body.createdAt,
                orderState: OrderState.Issued
            };

            // Add the new order to the subcollection 'orders/{userId}/orders'
            await this.firestoreService.addDocument(`orders/${currentUser.id}/orders`, newOrder.id, newOrder);
            console.log("Order added to user's orders subcollection");

            return newOrder;

        } catch (err) {
            console.log("Error when adding new order: ", err);
            throw new ConflictException(`Error when adding new order`);
        }
    }

    async listAllOrdersForCurrentUser(authHeader: string) : Promise<Order[]> {
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        const currentUser = await this.firebaseService.checkLoggedInUser(token);

        const currentUserOrders = await this.firestoreService.getDocuments(`orders/${currentUser.id}/orders`);

        const orders: Order [] = currentUserOrders.map(doc => {
            const data = doc.data();
            return {
                id: data.id,
                totalPrice: data.totalPrice,
                shoppingCartItems: data.shoppingCartItems,
                createdAt: data.createdAt,
                userId: data.userId,
                userName: data.userName,
                userEmail: data.userEmail,
                orderState: data.orderState || OrderState.Issued
            } as Order;
        });

        return orders;
    }

}
