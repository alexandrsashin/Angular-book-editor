import { Component, OnInit } from '@angular/core';
import { EditorService } from '../shared/editor.service';

import { Authors } from '../shared/authors';

@Component({
	moduleId: module.id,
	selector: 'editor-form',
	templateUrl: 'editor-form.component.html',
	styleUrls: ['editor-form.component.css']
})
export class EditorFormComponent implements OnInit {
	title: string = '';
	authorList: Authors[] = [];

  constructor(private editorService: EditorService) { }

	ngOnInit() {
  	let author = new Authors();
		this.authorList.push(author);
	}

  onAdd() {
  	let author = new Authors();
		this.authorList.push(author);
		console.log(this.authorList)
  }

  onDelete(author: Authors) {
		let index = this.authorList.indexOf(author);
		console.log(author)

		if (index > -1) {
			this.authorList.splice(index, 1);
		}  
  }

  onChange(event) {
    var files = event.srcElement.files;
    console.log(files);

    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let fileList: FileList = target.files;
        console.log(fileList[0]);
  }

  onSubmit() {
		this.editorService.createTodo(this.title);
	}
}