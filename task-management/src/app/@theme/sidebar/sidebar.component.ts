import { Component, ElementRef, OnInit } from '@angular/core';
import { ShareService } from '../shared/share.service';

@Component({
  selector: 'internal-app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;

  isActive = false;

  isHidden = true;

  constructor(private shareService: ShareService, private element: ElementRef) {
    // do something
  }

  ngOnInit(): void {
    this.hide();
  }

  popUp() {
    this.isHidden = !this.isHidden;
  }

  hide() {
    let a = this.element.nativeElement.querySelector('.popup');
    this.isHidden;
    window.addEventListener('click', function (e) {
      if (a.contains(e.target)) {
      } else {
        a.classList.add('hidden');
      }
    });
  }
}
