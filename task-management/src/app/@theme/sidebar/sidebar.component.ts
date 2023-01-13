import { Component, ElementRef, OnInit } from '@angular/core';
import { debug } from 'console';
import { ShareService } from '../shared/share.service';

@Component({
  selector: 'internal-app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;

  isActive = false;

  constructor(private shareService: ShareService, private element: ElementRef) {
    // do something
  }

  ngOnInit(): void {
    // do something
  }

  linkActive(e: any) {
    if (
      this.element.nativeElement.querySelector('#navList a.active') !== null
    ) {
      this.element.nativeElement
        .querySelector('#navList a.active')
        .classList.remove('active');
    }
    e.target.className = 'nav-link active';
  }
}
