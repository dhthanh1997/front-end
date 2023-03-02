import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../_share/share.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  public isLoading: boolean = true;


  constructor(
    private shareService: ShareService
  ) {}

  ngOnInit(): void {
    // this.shareService.isLoading.subscribe({
    //   next:(res) => {
    //     this.isLoading = res;
    //   },
    //   error:(err) => {
    //     console.log(err);
    //   }
    // })
  }





}
