import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryModel } from 'src/app/models/category-model';
import { BookModel } from 'src/app/models/book-model';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    public categories: CategoryModel[];
    public books: BookModel[];

    public constructor(private dataService: DataService) { }

    public async ngOnInit() {
        try {
            this.categories = await this.dataService.getAllCategories();
            this.getBooks();


        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async getBooks() {
        try {
            this.books = await this.dataService.getAllBooks();
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async deleteMe(_id: string) {
        try {
            const sure = window.confirm("Are you sure?");
            if (!sure) return;
            await this.dataService.deleteBook(_id);
            alert("Book deleted");
            this.books = this.books.filter(b => b._id !== _id)
        }
        catch (err: any) {
            alert(err.message);
        }
    }
}
