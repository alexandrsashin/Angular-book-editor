import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
	/*
	registerForm = new FormGroup({
    title: new FormControl(),
    authors: new FormGroup({
      firstname: new FormControl(),
	    lastname: new FormControl(),
      zip: new FormControl(),
      city: new FormControl()
    })
  });*/

  constructor(private editorService: EditorService) { }

	ngOnInit() {
  	let author = new Authors();
		this.authorList.push(author);
	}

	getPageState() {
		return this.editorService.getPageState();		
	}

	setPageState(state: string) {
		this.editorService.setPageState(state);		
	}

  onAdd() {
  	let author = new Authors();
		this.authorList.push(author);
  }

  onDelete(author: Authors) {
		let index = this.authorList.indexOf(author);

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
  	this.editorService.setPageState('view');
		this.editorService.createBook(this.title);
	}
}