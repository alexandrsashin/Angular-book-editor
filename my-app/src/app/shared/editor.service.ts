import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Books } from './books';

@Injectable()
export class EditorService {
	private dataUrl = './assets/data/data.json';
	editPageIndex: number = -1; // -1 - default value (when create new note)
	books: Books[] = [];

	constructor(private http: Http) {}

	getBooks(): Observable<Books[]> {
		return this.http.get(this.dataUrl)		
										.map(res => res.json())
										.catch(this.handleError);
	}

	setNoteBook(books: Books[]) {
		this.books = books;
	}

	getEditPageIndex() {
		return this.editPageIndex;
	}

	setEditPageIndex(state: number) {
		this.editPageIndex = state;	
	}

	createBook(book: Books) {
		this.books.push(book);
		console.log(this.books)
	}

	editBook(books: Books[], item: Books) {
		let index;
		this.books = books;
		index = this.books.indexOf(item);
	}

	deleteBook(books: Books[], item: Books) {
		let index;
		this.books = books;
		index = this.books.indexOf(item);

		if (index > -1) {
			this.books.splice(index, 1);
		}
		return this.books;
	}

	private handleError(error: any) {
		console.error("Error ", error);
		return Promise.reject(error.message || error);
	}
}