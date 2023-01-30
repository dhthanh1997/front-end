import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ShareService } from '../shared/share.service';

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
  @ViewChild('popup') popup!: ElementRef;

  constructor(
    private shareService: ShareService,
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    // do something
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.toggleButton.nativeElement &&
        e.target !== this.popup.nativeElement
      ) {
        this.isHidden = false;
      }
    });
  }

  ngOnInit(): void {}

  popUp() {
    this.isHidden = !this.isHidden;
    console.log(this.isHidden);
  }
}
