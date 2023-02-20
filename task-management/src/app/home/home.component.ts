import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ProjectService } from '../_core/api/project/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public now = new Date();

  public listData: any;

  public pageNumber = 1;
  public pageSize = 7;
  public txtSearch: string | undefined;

  isHidden = false;

  constructor(private service: ProjectService, private element: ElementRef) {}

  ngOnInit(): void {
    this.getProject();
  }

  public getProject() {
    this.service
      .getProject(this.pageNumber, this.pageSize, this.txtSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listData = res.pagingData.content;
          // console.log(this.listData);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  showAllProject() {
    this.pageSize = 99999;
    this.getProject();
    this.isHidden = true;
  }

  showLessProject() {
    this.pageSize = 7;
    this.getProject();
    this.isHidden = false;
  }
}
