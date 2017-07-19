import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Books } from '../shared/books';

@Component({
	moduleId: module.id,
  selector: 'editor-item',
  templateUrl: './editor-item.component.html',
  styleUrls: ['./editor-item.component.css']
})

export class EditorItemComponent {
	@Input() book: Books;
	//@Output() delete = new EventEmitter(); 
	@Output() edit = new EventEmitter();

	onDelete() {
	//	this.delete.emit(this.book);
	}

	onEdit() {
		this.edit.emit(this.book);
	}
} 