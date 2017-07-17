import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {

  transform(array:Array<any>, args?) {
  	if (!args) return array;
    if (array) {
      let orderByValue = args;
      let byVal = 1;

      if (orderByValue.charAt(0) === "!") {
        // decrease sorting
        byVal = -1;
        orderByValue = orderByValue.substring(1);
      }

      array.sort((a: any, b: any) => {
        if ( a[orderByValue] < b[orderByValue] ) {
          return -1 * byVal;
        } else if ( a[orderByValue] > b[orderByValue] ) {
          return 1 * byVal;
        } else {
          return 0;
        }
      });
      return array;
    }
  }
}
