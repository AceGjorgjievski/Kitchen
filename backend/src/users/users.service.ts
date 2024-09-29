import {Injectable} from "@nestjs/common";
import { FirestoreService } from "src/firestore/firestore.service";
import {User} from "../models/User";


@Injectable()
export class UsersService {

    constructor(private readonly firestoreService: FirestoreService) {
    }

    async getAll(): Promise<Array<Omit<User, 'password'>>> {
        const users = await this.firestoreService.getDocuments("users");

        return users.map((doc) => ({
            name: doc.data().name,
            email: doc.data().email,
            id: doc.data().id,
            createdAt: doc.data().createdAt,
            role: doc.data().role,
            shoppingCartId: doc.data().shoppingCartId
        }))
    }

    async getUserByName(name: string): Promise<Omit<User, 'password'> | null> {
        const users = await this.getAll(); // Reuse getAll()

        const user = users.find(user => user.name === name);

        return user || null;
    }

    async getUserByEmail(email: string): Promise<Omit<User, 'password'> | null> {
        const users = await this.getAll();

        const user = users.find(user => user.email === email);

        return user || null;
    }

}
