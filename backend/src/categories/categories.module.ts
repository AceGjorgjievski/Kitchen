import { Module } from "@nestjs/common";
import { CategoryController } from "./categories.controller";
import { CategoryService } from "./categories.service";
import { FirestoreModule } from "src/firestore/firestore.module";


@Module({
  imports: [FirestoreModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {

}