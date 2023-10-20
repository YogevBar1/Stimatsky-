import { CategoryModel } from "./category-model"

export class BookModel {
    public _id: string
    public bookName: string
    public categoryId: string
    public summary: string
    public price: number
    public stock: number
    public category: CategoryModel
  }
  
