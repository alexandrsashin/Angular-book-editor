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
		this.editorService.getTodos().subscribe(books => this.books = books);
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
	
	delete(book: Books) {
		this.editorService.deleteTodo(book);
	}	
}