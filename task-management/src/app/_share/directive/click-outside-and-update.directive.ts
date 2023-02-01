import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ShareService } from '../share.service';

@Directive({
  selector: '[appClickOutsideAndUpdate]'
})
export class ClickOutsideAndUpdateDirective implements AfterViewInit {

  @Output() newOutputEvent = new EventEmitter();

  private item: any;

  constructor(private shareService: ShareService, private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.setAppClickOutsideAndUpdate();
  }


  private setAppClickOutsideAndUpdate() {
    this.shareService.isInside.subscribe({
      next: (res) => {
        if (res.item && res.item.get('isInside')) {
          // console.log(res);
          this.item = res
        }
      }
    })
  }

  @HostListener('document:click', ['$event'])
  clickOutside() {
    // console.log(this.item);
    if (this.item) {
      this.newOutputEvent.emit(this.item);
    }
  }



}
