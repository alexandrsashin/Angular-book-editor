import { Component, OnInit } from '@angular/core';
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

	constructor(private editorService: EditorService) {
		this.books = [];
	}

	ngOnInit() {	
		if (localStorage.getItem('appData')) {
			this.books = JSON.parse(localStorage.getItem('appData'));
		} else {
			this.editorService.getTodos().subscribe(books => this.books = books);
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

	getPageState() {
		return this.editorService.getPageState();		
	}

	setPageState(state: string) {
		this.editorService.setPageState(state);		
	}
	
	delete(book: Books) {
		let updatedData = this.editorService.deleteBook(this.books, book);
		localStorage.setItem('appData', JSON.stringify(updatedData));
	}	
}