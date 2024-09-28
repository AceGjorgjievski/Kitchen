import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Category } from 'src/categories/category.model';

@Injectable()
export class FirestoreService {
    private firestore = admin.firestore();

    async getAll(collection: string): Promise<any[]> {
        const snapshot = await this.firestore.collection(collection).get();
        return snapshot.docs.map(doc => doc.data());
    }

    async getById(collection: string, id: string): Promise<any> {
        const docRef = this.firestore.collection(collection).doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            throw new Error(`Document with id ${id} not found`);
        }

        return doc.data();
    }

    async create(collection: string, data: any): Promise<void> {
        await this.firestore.collection(collection).add(data);
    }

    async update(collection: string, id: string, data: any): Promise<void> {
        const docRef = this.firestore.collection(collection).doc(id);
        await docRef.update(data);
    }

    async delete(collection: string, id: string): Promise<void> {
        await this.firestore.collection(collection).doc(id).delete();
    }

    async getDocuments(collection: string) {
        const snapshot = await this.firestore.collection(collection).get();
        return snapshot.docs;
    }

    async getDocument(collection: string, documentId: string) {
        const doc = await this.firestore.collection(collection).doc(documentId).get();
        return doc.exists ? doc.data() : null;
    }

    async addDocument(collection: string, docId: string | null, data: any): Promise<void> {
        console.log("data: ", data);
        //todo - change or not? - for docId
        const collectionRef = this.firestore.collection(collection);

        if (docId) {
            // If docId is provided, use set() to create a document with the given ID
            const docRef = collectionRef.doc(docId);
            await docRef.set(data);
        } else {
            // If no docId is provided, use add() to auto-generate the ID
            await collectionRef.add(data);
        }
        console.log("user added");
    }

}
