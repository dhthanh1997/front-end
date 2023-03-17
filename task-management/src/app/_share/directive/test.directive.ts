import { Directive, ElementRef, Input, AfterViewChecked } from '@angular/core';
import { ShareService } from '../share.service';

@Directive({
  selector: '[appTest]'
})
export class TestDirective implements AfterViewChecked {

  constructor(private element: ElementRef, private shareService: ShareService) { }

  ngAfterViewChecked(): void {
    this.shareService.isTest.subscribe({
      next: (res) => {
        if (res) {
          this.Color(res);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  private Color(value: string) {
    this.element.nativeElement.style.background = value;
  }

}
