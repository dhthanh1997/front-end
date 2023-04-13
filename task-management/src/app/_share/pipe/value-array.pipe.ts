import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueArray'
})
export class ValueArrayPipe implements PipeTransform {

  transform(objects: any): any {
    debugger;
    console.log(objects);
    const list = Array.from(Object.values(objects));
    return Object.values(objects);
  } 

}
