import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryModel } from 'src/app/models/category-model';
import { BookModel } from 'src/app/models/book-model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-insert',
    standalone: true,
    imports: [CommonModule,FormsModule],
    templateUrl: './insert.component.html',
    styleUrls: ['./insert.component.css']
})
export class InsertComponent {

    public categories: CategoryModel[];
    public book = new BookModel();
    // public selectedCategoryId: string; // Variable to store the selected categoryId


    public constructor(private dataService: DataService,
        private router: Router) { }


    public async ngOnInit() {
        try {
            this.categories = await this.dataService.getAllCategories();
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async send() {
        try {
            // this.book.categoryId = this.selectedCategoryId;
            await this.dataService.addBook(this.book);
            alert("book added!");
            this.router.navigateByUrl("/list");


        }
        catch (err: any) {
            alert(err.message);
        }
    }

}
