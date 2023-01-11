import { Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ShareService } from '../shared/share.service';

@Component({
  selector: 'internal-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnChanges {
 
  isCollapsed: boolean;

  constructor(private shareService: ShareService) {
    // do something
    this.isCollapsed = false;
    
  }

  streamCollapsed() {
    this.shareService.isCollapsed.subscribe({
      next: (res) => {
        console.log(res);
        this.isCollapsed = res;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    console.log(this.isCollapsed);
  }

  ngOnInit(): void {
    // do something
    // this.isCollapsed = this.shareService.isCollapsed;
    this.streamCollapsed();
  }

  

}
