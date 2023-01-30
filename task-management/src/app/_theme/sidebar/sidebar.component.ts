import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

enum ModeModal {
  CREATE = 'create',
  UPDATE = 'update',
  VIEW = 'view',
}

@Component({
  selector: 'internal-app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;

  isActive = false;

  isHidden = false;

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('popupContent') popupContent!: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    // do something
  }

  modalOptions: any = {
    nzDuration: 2000,
  };

  ngOnInit(): void { }

  @HostListener('window:click', ['$event'])
  clickOutsideButton(e: Event) {
    if (
      e.target !== this.toggleButton!.nativeElement
    ) {
      this.isHidden = false;
    }
  }



  popUp() {
    this.isHidden = !this.isHidden;
    console.log(this.isHidden);
  }
}
