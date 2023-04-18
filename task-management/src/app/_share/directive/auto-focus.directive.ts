import { AfterContentInit, AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { ShareService } from '../share.service';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {

  // @Input() public appAutoFocus: boolean = false;
  constructor(private el: ElementRef, private shareService: ShareService) { }

  ngAfterViewInit(): void {
    this.initService();
  }

  private initService() {
    this.shareService.isAddRow.subscribe({
      next: (res) => {
        // console.log(res);
        if (res) {
          this.setAppAutoFocus(res);
          this.shareService.isAddRow.next(false);
        }
      }
    })
  }

  private setAppAutoFocus(autofocus: boolean) {
    if (autofocus) {
      this.el.nativeElement.focus();
      // scroll nearest element which is focused
      this.el.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }
}
