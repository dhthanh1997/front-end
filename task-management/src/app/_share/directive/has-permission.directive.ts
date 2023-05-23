import { AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { take } from 'rxjs';
import { StoreDataService } from 'src/app/_base/store-data.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit, AfterViewInit {

  @Input() appHasPermission: any;

  constructor(private renderer2: Renderer2, private elementRef: ElementRef, private storeDataService: StoreDataService) {

  }
  
  ngOnInit(): void {
    this.setPermission(this.appHasPermission);
  }

  ngAfterViewInit(): void {
    console.log("permission checked");
    // this.setPermission(this.permissions);
  }

  private setPermission(permission: any) {
    this.storeDataService.permissions.pipe(take(1)).subscribe({
      next: (res) => {
        let result = permission.menu + '_' + permission.action;
        if (res.includes(result)) {
          const html = this.elementRef.nativeElement;
          this.renderer2.setAttribute(html, 'disabled', '');
        };

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
