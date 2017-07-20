import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { EditorService } from '../shared/editor.service';
import { CustomValidatorService } from '../shared/custom-validator.service';

import { Books } from '../shared/books';

@Component({
	moduleId: module.id,
	selector: 'editor-form',
	templateUrl: 'editor-form.component.html',
	styleUrls: ['editor-form.component.css']
})
export class EditorFormComponent implements OnInit, OnDestroy {
	id: number;
  private sub: any;
	bookForm: FormGroup;
  constructor(private editorService: EditorService,
						  private route: ActivatedRoute, 
  						private router: Router, 
  						public fb: FormBuilder) {}

	ngOnInit() {
		this.bookForm = this.fb.group({
  		'title': ['', [Validators.required, Validators.maxLength(30)]],
  		'authors': this.fb.array([
  			this.initAuthors()
  		]),
  		'pages': ['', [Validators.required, Validators.min(0), Validators.max(10000)]],
  		'publishingHouse': ['', Validators.maxLength(30)],
  		'yearOfPublication': ['', [CustomValidatorService.minValue(1800), CustomValidatorService.maxValue(2017)]],
  		'releaseDate': ['',[CustomValidatorService.minDate("1800-01-01"), CustomValidatorService.maxDate("")]],
  		'ISBN': ['', CustomValidatorService.isbn("")],
  		'imgSrc': ['']
  	})
  	this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
       console.log(this.id)
       // In a real app: dispatch action to load the details here.
    });
  }

	initAuthors() {
		return this.fb.group({
			'firstName': ['', [Validators.required, Validators.maxLength(20)]],
			'lastName': ['', [Validators.required, Validators.maxLength(20)]]
		})
	}

	getEditedPageIndex() {
		return this.editorService.getEditPageIndex();		
	}

  onAdd() {
  	const control = <FormArray>this.bookForm.controls['authors'];
    control.push(this.initAuthors());
  }

  onDelete(i: number) {
		const control = <FormArray>this.bookForm.controls['authors'];
    control.removeAt(i);
  }

  onChange(event) {
    let bannerImage = document.querySelector('.form__img-input');
		let imgData = getBase64Image(bannerImage);
		localStorage.setItem("imgData", imgData);

    function getBase64Image(img) {
	    var canvas = document.createElement("canvas");
	    canvas.width = img.width;
	    canvas.height = img.height;

	    var ctx = canvas.getContext("2d");
	    ctx.drawImage(img, 0, 0);

	    var dataURL = canvas.toDataURL("image/png");

	    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
		}
  }

  onSubmit(form: Books) {
		this.editorService.createBook(form);
		this.router.navigate(['/list']);
	}

	cancel() {
		this.router.navigate(['/list']);
	}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}