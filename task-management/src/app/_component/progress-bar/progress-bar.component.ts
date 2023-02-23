import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  public isDialog: boolean = false;
  public progressEvent: Observable<any> = new Observable()

  @Input() percentage: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  //  this.progessEvent.subscribe({
  //   next: (res) => {
  //     if (res.type === HttpEventType.UploadProgress) {
  //       this.uploading = true;
  //       this.progress = Math.round(100 * res.loaded / res.total);
  //     }
  //   },
  //   error: (err) => {
  //     console.log(err);
  //     this.uploading = false
  //   }
  // })

}
