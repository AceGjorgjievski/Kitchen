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


    async getById(id: number): Promise<Category | undefined> {

        const categories = await this.getAll();

        const foundCategory = categories.find((doc) => doc.id === id);
        if(!foundCategory) {
            throw new ConflictException(`Category does not exist with id: ${id}`);
        }

        return {
            id: id,
            strCategory: foundCategory.strCategory
        }
    }


    async add(newCategory: Category): Promise<Category> {

        const plainCategory = {
            id: newCategory.id,
            strCategory: newCategory.strCategory
        };

        //todo
        await this.firestoreService.addDocument('categories', null, plainCategory);

        return newCategory;
    }
}
