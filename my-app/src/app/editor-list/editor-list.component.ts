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

	constructor(private editorService: EditorService) {
		this.books = [];
	}

	ngOnInit() {
		this.books = this.editorService.getTodos();
	}
	
	delete(book: Books) {
		this.editorService.deleteTodo(book);
	}	
}