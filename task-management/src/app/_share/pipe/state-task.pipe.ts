import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateTask'
})
export class StateTaskPipe implements PipeTransform {

  transform(value: unknown, ...args: any[]): any {
    switch (value) {
      case 0:
        return "Chưa hoàn thành";
      case 1:
        return "Đã hoàn thành";

      // case 2:
      //   return "Đã thực hiện";
      default:
        return "UNKOWNS";
    }
  }

}
