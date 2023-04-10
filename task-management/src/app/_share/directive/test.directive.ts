import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { ShareService } from '../share.service';

@Directive({
  selector: '[appTest]'
})
export class TestDirective implements AfterViewInit {

  constructor(private element: ElementRef, private shareService: ShareService) { }

  ngAfterViewInit(): void {
    // this.shareService.isGetColor.subscribe({
    //   next: (res) => {
    //     if (res) {
    //       this.Color(res);
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
  }

  private Color(value: string) {
    // debugger;
    this.element.nativeElement.style.backgroundColor = value;
  }

}
