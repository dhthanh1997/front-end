import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProjectFormComponent } from 'src/app/pages/project/project-form/project-form.component';

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

  isOpen = false;

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('popupContent') popupContent!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private modalService: NzModalService,
    private notifyService: NzNotificationService,
    private router: Router,
  ) {
    // do something
  }

  modalOptions: any = {
    nzDuration: 2000,
  };

  ngOnInit(): void {}

  // @HostListener('window:click', ['$event'])
  // clickOutsideButton(e: Event) {
  //   if (e.target !== this.toggleButton!.nativeElement) {
  //     this.isHidden = false;
  //   }
  // }

  // popUp() {
  //   this.isHidden = !this.isHidden;
  //   console.log(this.isHidden);
  // }

  subMenu() {
    // debugger;
    let subMenu = this.elementRef.nativeElement.querySelector('.sub-menu');
    if (subMenu.classList.contains('d-none')) {
      subMenu.classList.remove('hide');
      subMenu.classList.remove('d-none');
      subMenu.classList.add('show');
      subMenu.classList.add('d-block');
      this.isOpen = !this.isOpen;
    } else if (subMenu.classList.contains('d-block')) {
      subMenu.classList.remove('show');
      subMenu.classList.remove('d-block');
      subMenu.classList.add('hide');
      this.isOpen = !this.isOpen;
      setTimeout(() => {
        return subMenu.classList.add('d-none');
      }, 700);
    }
  }

  onCreate(): void {
    this.modalService
      .create({
        nzTitle: 'Thêm mới dự án',
        nzClassName: 'modal-custom',
        nzContent: ProjectFormComponent,
        nzWidth: 'modal-custom',
        nzCentered: true,
        nzMaskClosable: false,
        nzComponentParams: {
          mode: ModeModal.CREATE,
          title: 'Thêm yêu cầu',
        },
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.notifyService.success(
              'Thành công',
              'Thêm mới dự án',
              this.modalOptions
            );
            this.router.navigate(['pages/project']);
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
  }
}
