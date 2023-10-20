import { environment } from "src/environments/environment.development";
import { CategoryModel } from "../models/category-model";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { Injectable } from "@angular/core";
import { BookModel } from "../models/book-model";



@Injectable({
    providedIn: 'root'
})
export class DataService {

    public constructor(private http: HttpClient) { }

    public async getAllCategories(): Promise<CategoryModel[]> {
        const observable = this.http.get<CategoryModel[]>(environment.categoriesUrl);
        const categories = await firstValueFrom(observable);
        return categories;
    }

    public async getAllBooks(): Promise<BookModel[]>{
        const observable = this.http.get<BookModel[]>(environment.booksUrl);
        const books = await firstValueFrom(observable);
        return books;
    }

    public async addBook(book: BookModel): Promise<void>{
        const observable = this.http.post<BookModel>(environment.booksUrl, book);
        await firstValueFrom(observable);
    }

    public async deleteBook(_id: string): Promise<void>{
        const observable = this.http.delete(environment.booksUrl + _id);
        await firstValueFrom(observable);
    }

}


