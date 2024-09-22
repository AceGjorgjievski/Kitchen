import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "./category.model";
import { FirestoreService } from "src/firestore/firestore.service";



@Injectable()
export class CategoryService {
    private categories: Category [] = [];

    constructor(private readonly firestoreService: FirestoreService) {}

    async getAll(): Promise<Category[]> {
        const categories = await this.firestoreService.getDocuments('categories');
        return categories.map(doc => ({
            id: doc.data().id,
            strCategory: doc.data().strCategory
        }));
    }

    // getAll(): Category [] {
    //     return [...this.categories];
    // }

    // getById(id: number): Category | undefined {
    //     const foundCategory: Category = this.categories.find((category) => category.id === id);

    //     if(!foundCategory) {
    //         throw new ConflictException(`Category does not exist with id: ${id}`);
    //     }

    //     return {...foundCategory};
    // }

    async getById(id: number): Promise<Category | undefined> {
        const foundCategory = await this.firestoreService.getDocument('categories', id.toString());
        if(!foundCategory) {
            throw new ConflictException(`Category does not exist with id: ${id}`);
        }

        return {
            id: id,
            strCategory: foundCategory.strCategory
        }
    }

    // add(strCategory: string): Category {
    //     const newId = this.categories.length + 1;
    //     const newCategory : Category = {
    //         id: newId,
    //         strCategory: strCategory
    //     }

    //     this.categories.push(newCategory);

    //     return newCategory;
    // }

    async add(strCategory: string): Promise<Category> {
        const newId = this.categories.length + 1;
        const newCategory: Category = {
            id: newId,
            strCategory: strCategory
        }

        console.log("came here", typeof(newCategory));

        const plainCategory = {
            id: newId,
            strCategory: strCategory
        };

        await this.firestoreService.addDocument('categories', plainCategory);

        return newCategory;
    }
}
