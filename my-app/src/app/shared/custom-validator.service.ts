import { Injectable } from '@angular/core';
import { FormControl,  ValidatorFn } from '@angular/forms';

@Injectable()
export class CustomValidatorService {

 constructor() { }

  static maxValue(max: Number): ValidatorFn {
	  return (control: FormControl): {[key: string]: any} => {
	    const input = control.value,
	          isValid = input <= max;
	    if (isValid) {
        return { 'maxValue': {max} }
      } else {
        return null;
      }
	  };
	}

  static minValue(min: Number): ValidatorFn {
	  return (control: FormControl): {[key: string]: any} => {
	    const input = control.value,
	          isValid = input >= min;
	    if (isValid) {
        return { 'minValue': {min} }
      } else {
        return null;
      }
	  };
	}

	static maxDate(max: string): ValidatorFn {
	  return (control: FormControl): {[key: string]: any} => {
	    let input = control.value;
	    input = input.split('.').reverse().join('-');
	    const isValid = max === '' ? new Date(input) > new Date(max) : new Date(input) > new Date();
	    console.log(isValid)
	    if(isValid) {
        return { 'maxDate': {max} }
      } else {
        return null;
      }
	  };
	}

  static minDate(min: string): ValidatorFn {
	  return (control: FormControl): {[key: string]: any} => {
	    let input = control.value;
	    input = input.split('.').reverse().join('-');
	    const isValid = new Date(input) < new Date(min);
	    if(isValid) {
        return { 'minDate': {min} }
      } else {
        return null;
      }
	  };
	}

	static isbn(code: string): ValidatorFn {
	  return (control: FormControl): {[key: string]: any} => {
	  	
	  	let isbn = control.value;
	  	let chars;
	  	isbn = isbn.replace(/[^\dX]/gi, '');	  	
		  chars = isbn.split('');

		  if (isbn.length === 10) {
		  	// ISBN-10 Validating a Check Digit

		  	if (chars[9].toUpperCase() == 'X') {
			    chars[9] = 10;
			  }
			  let sum = 0;
			  for (let i = 0; i < chars.length; i++) {
			    sum += ((10 - i) * parseInt(chars[i]));
			  };
			  return (sum % 11) == 0 ? null : { 'ISBN': true }
		  } else if (isbn.length === 13) {
		  	// ISBN-13 Validating a Check Digit

		  	let sum = 0;
			  for (let i = 0; i < chars.length; i++) {
			  	let weight = (i + 1) % 2 ? 1 : 3;
			    sum += (weight * parseInt(chars[i]));
			  };
			  return (sum % 10) == 0 ? null : { 'ISBN': true }
		  } else {
		    return { 'ISBN': true }
		  }		  
	  };
	}
}