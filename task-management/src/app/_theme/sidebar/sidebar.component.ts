import { animate, style, transition, trigger } from '@angular/animations';
import {
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
  // animations: [
  //   trigger('panelInOut', [
  //     transition('void => *', [
  //       style({ transform: 'translateY(-15%)' }),
  //       animate(200),
  //     ]),
  //     transition('* => void', [
  //       animate(200, style({ transform: 'translateY(-10%)' })),
  //     ]),
  //   ]),
  // ],
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;

  isActive = false;

  isHidden = false;

  isOpen = false;

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('popupContent') popupContent!: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    // do something
  }

  modalOptions: any = {
    nzDuration: 2000,
  };

  ngOnInit(): void {}

  @HostListener('window:click', ['$event'])
  clickOutsideButton(e: Event) {
    if (e.target !== this.toggleButton!.nativeElement) {
      this.isHidden = false;
    }
  }

  popUp() {
    this.isHidden = !this.isHidden;
    console.log(this.isHidden);
  }

  subMenu() {
    // debugger;
    let subMenu = this.elementRef.nativeElement.querySelector('.sub-menu');
    if (subMenu.classList.contains('d-none')) {
      subMenu.classList.remove('hide');
      subMenu.classList.remove('d-none');
      subMenu.classList.add('show');
      subMenu.classList.add('d-block');
    } else if (subMenu.classList.contains('d-block')) {
      subMenu.classList.remove('show');
      subMenu.classList.remove('d-block');
      subMenu.classList.add('hide');
      setTimeout(() => {
        return subMenu.classList.add('d-none');
      }, 1000);
    }
  }
}
