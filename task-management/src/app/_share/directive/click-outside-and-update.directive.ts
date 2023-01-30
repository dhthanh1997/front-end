import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ShareService } from '../share.service';

@Directive({
  selector: '[appClickOutsideAndUpdate]'
})
export class ClickOutsideAndUpdateDirective implements AfterViewInit {

  // @Input() appClickOutsideAndUpdate: any;

  constructor(private shareService: ShareService, private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    // this.setAppClickOutsideAndUpdate(this.appClickOutsideAndUpdate)
  }

  private setAppClickOutsideAndUpdate(data: any) {
    // if(data) {

    // }
  }

  @HostListener('document:click', ['$event'])
  clickOutside() {
    console.log("in directive")
    this.shareService.isOutSide.next(true);
  }



}
