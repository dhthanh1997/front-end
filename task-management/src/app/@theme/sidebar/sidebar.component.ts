import { Component, OnInit } from '@angular/core';
import { ShareService } from '../shared/share.service';

@Component({
  selector: 'internal-app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  isCollapsed = false;
  
  constructor(private shareService: ShareService) {
    // do something
  }

  ngOnInit(): void {
    // do something
    
    
  }
}
