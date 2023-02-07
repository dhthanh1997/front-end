import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateTask'
})
export class StateTaskPipe implements PipeTransform {

  transform(value: unknown, ...args: any[]): any {
    switch (value) {
      case 0:
        return "Chưa thực hiện";
      case 1:
        return "Đang thực hiện";

      case 2:
        return "Đã thực hiện";
      default:
        return "Chưa thực hiện";
    }
  }

}
