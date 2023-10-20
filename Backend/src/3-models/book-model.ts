import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { CategoryModel } from "./category-model";

// 1. Interface:
export interface IBookModel extends Document {
    bookName: string;
    categoryId: ObjectId;
    summary: string;
    price: number;
    stock: number;    
}

// 2. Schema: 
export const BookSchema = new Schema<IBookModel>({
    bookName: {
        type: String,
        required: [true, "Missing book name."]
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId
    },
    summary: {
        type: String,
        required: [true, "Missing summary."]
    },
    price: {
        type: Number,
        required: [true, "Missing price."]
    },
    stock: {
        type: Number,
        required: [true, "Missing stock."]
    }
}, {
    versionKey: false, // don't add __v to an added document.
    toJSON: { virtuals: true }, // Return foreign key in JSON.
    id: false // Don't add id on top of _id.
});

BookSchema.virtual("category", {
    ref: CategoryModel, // Foreign Model.
    localField: "categoryId", // foreign key.
    foreignField: "_id", // primary key.
    justOne: true // Shop has one category.
});

// 3. Model:
export const BookModel = model<IBookModel>("BookModel", BookSchema, "books");
