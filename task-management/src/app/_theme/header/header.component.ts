import { Component, OnInit } from '@angular/core';
import { ShareService } from '../shared/share.service';

@Component({
  selector: 'internal-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isCollapsed: boolean;
  public menu: any[] = [];

  constructor(private shareService: ShareService) {
    this.isCollapsed = true;
    // do something
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.shareService.isCollapsed.next(this.isCollapsed);
    // console.log(this.isCollapsed);
  }

  ngOnInit(): void {
    // do something
  }

  public logOut() {
    this.shareService.logOut();
  }
}
