import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Books } from '../shared/books';
import { EditorService } from '../shared/editor.service';

@Component({
  selector: 'editor-list',
  templateUrl: './editor-list.component.html',
  styleUrls: ['./editor-list.component.css']
})

export class EditorListComponent implements OnInit {
	books: Books[];
	sortParam: string;

	constructor(private editorService: EditorService, private router: Router) {
		this.books = [];
	}

	ngOnInit() {
		var savedData = JSON.parse(localStorage.getItem('appData'));
		this.editorService.getTodos().subscribe(books => this.books = books);
		console.log(savedData, this.books)
		if (savedData && savedData.length > this.books.length) {
			this.books = JSON.parse(localStorage.getItem('appData'));
		}
		this.sortParam = localStorage.getItem('sortParam');
	}

	onSort(param: string) {
		if ( param === this.sortParam ) {
			if (this.sortParam.charAt(0) === "!") {
				this.sortParam = this.sortParam.substring(1);
			} else {
				this.sortParam = "!" + param;
			}
		} else {
			this.sortParam = param;
		}
		localStorage.setItem('sortParam', this.sortParam);
	}

	create() {
		this.router.navigate(['/form']);
	}

	edit(book: Books) {
		console.log(book)
		this.editorService.editBook(this.books, book);	

		this.router.navigate(['/form']);
	}
	
	delete(book: Books) {
	console.log(book)
		let updatedData = this.editorService.deleteBook(this.books, book);
		localStorage.setItem('appData', JSON.stringify(updatedData));
	}	
}