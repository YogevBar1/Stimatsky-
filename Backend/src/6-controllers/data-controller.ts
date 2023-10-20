import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import { BookModel } from "../3-models/book-model";
import StatusCode from "../3-models/status-code";

const router = express.Router();

// GET http://localhost:4000/api/categories
router.get("/categories", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categories = await dataService.getAllCategories();
        response.json(categories);
    }
    catch (err: any) { next(err); }
});

// GET http://localhost:4000/api/books
router.get("/books", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const books = await dataService.getAllBooks();
        response.json(books);
    }
    catch (err: any) { next(err); }
});

// post http://localhost:4000/api/books
router.post("/books", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const book = new BookModel(request.body);
        const addedBook = await dataService.addBook(book);
        response.status(StatusCode.Created).json(addedBook);
    }
    catch (err: any) { next(err); }
});

// delete http://localhost:4000/api/books
router.delete("/books/:_id([a-fA-F0-9]{24})", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await dataService.deleteBook(_id);
        response.sendStatus(StatusCode.NoContent); // Use `sendStatus` to send a status code without a response body.
    }
    catch (err: any) { next(err); }
});


export default router;
