import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Books } from './books';

@Injectable()
export class EditorService {
	private dataUrl = './assets/data/data.json';
	pageState: string = 'create'; // view - see books list, create - make new signature about book, edit - edit signature
	books: Books[] = [];

	constructor(private http: Http) {}

	getTodos(): Observable<Books[]> {
		return this.http.get(this.dataUrl)		
										.map(res => res.json())
										.catch(this.handleError);
	}

	getPageState() {
		return this.pageState;
	}

	setPageState(state: string) {
		this.pageState = state;	
		window.scrollTo(0,0);
	}

	createBook(title: string) {
		let book = new Books(title);

		this.books.push(book);
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