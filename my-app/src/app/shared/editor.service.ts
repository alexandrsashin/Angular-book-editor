import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Books } from './books';

@Injectable()
export class EditorService {
	private dataUrl = 'api/data.json';
	books: Books[] = [];

	constructor(private http: Http) {}

	getTodos(): Books[] {
		return this.books;
	}

	/*getTodos(): any {
		return this.http.get(this.dataUrl)
										.map(res => res.json());/*
										.toPromise()
										.then(res => res.json().data)
										.then(books => this.books = books)
										.catch(this.handleError);*/
		//return this.books;
	//}

	createTodo(title: string) {
		let book = new Books(title);

		this.books.push(book);
	}

	deleteTodo(book: Books) {
		let index = this.books.indexOf(book);

		if (index > -1) {
			this.books.splice(index, 1);
		}
	}

	private handleError(error: any) {
		console.error("Error ", error);
		return Promise.reject(error.message || error);
	}
}