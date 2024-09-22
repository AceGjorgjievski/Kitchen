import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { FirestoreService } from './firestore.service';

@Controller('firestore')
export class FirestoreController {
    constructor(private firestoreService: FirestoreService) {}

    @Get(':collection')
    async getAll(@Param('collection') collection: string) {
        return this.firestoreService.getAll(collection);
    }

    @Get(':collection/:id')
    async getById(@Param('collection') collection: string, @Param('id') id: string) {
        return this.firestoreService.getById(collection, id);
    }

    @Post(':collection')
    async create(@Param('collection') collection: string, @Body() data: any) {
        return this.firestoreService.create(collection, data);
    }

    @Put(':collection/:id')
    async update(@Param('collection') collection: string, @Param('id') id: string, @Body() data: any) {
        return this.firestoreService.update(collection, id, data);
    }

    @Delete(':collection/:id')
    async delete(@Param('collection') collection: string, @Param('id') id: string) {
        return this.firestoreService.delete(collection, id);
    }
}
