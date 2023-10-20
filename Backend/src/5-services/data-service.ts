import { BookModel, IBookModel } from "../3-models/book-model";
import { CategoryModel, ICategoryModel } from "../3-models/category-model";
import { ResourceNotFoundError } from "../3-models/error-models";

function getAllCategories(): Promise<ICategoryModel[]> {
    return CategoryModel.find().exec();
}

async function getAllBooks(): Promise<IBookModel[]> {
    try {
        const books = await BookModel.find()
            .populate({
                path: "category",
                select: "categoryName", // specify the fields you want to retrieve
            })
            .exec();
        return books
    }
    catch (err: any) {
        alert(err.message);

    }
}

function addBook(book: IBookModel): Promise<IBookModel>{
    book.validateSync();
    return book.save();
}

async function deleteBook(_id: string): Promise<void>{
    const deletedBook = await BookModel.findByIdAndDelete(_id).exec();
    if(!deleteBook) throw new ResourceNotFoundError(_id);
}



export default {
    getAllCategories,
    getAllBooks,
    addBook,
    deleteBook
};

