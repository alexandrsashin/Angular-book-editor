import { Component, OnInit } from '@angular/core';
import { ReversePipe } from 'ngx-pipes/src/app/pipes/array/reverse';
import { Books } from '../shared/books';
import { EditorService } from '../shared/editor.service';

@Component({
  selector: 'editor-list',
  templateUrl: './editor-list.component.html',
  styleUrls: ['./editor-list.component.css'],
  providers: [ ReversePipe ]
})

export class EditorListComponent implements OnInit {
	books: Books[];

	constructor(private editorService: EditorService, private reversePipe: ReversePipe) {
		this.books = [];
	}

	ngOnInit() {
		this.editorService.getTodos().subscribe(books => this.books = books);
	}
	
	delete(book: Books) {
		this.editorService.deleteTodo(book);
	}	
}