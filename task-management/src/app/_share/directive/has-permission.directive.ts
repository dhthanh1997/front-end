import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, RendererStyleFlags2, SimpleChanges } from '@angular/core';
import { firstValueFrom, take } from 'rxjs';
import { StoreDataService } from 'src/app/_base/store-data.service';
import { ShareService } from '../share.service';
import { BinarySearchService } from 'src/app/_base/util';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit, AfterViewInit, OnChanges {

  @Input() appHasPermission: any;

  constructor(private renderer2: Renderer2,
    private elementRef: ElementRef,
    private storeDataService: StoreDataService,
    private binarySearchService: BinarySearchService
  ) {

  }

  ngOnInit(): void {
    console.log("--has permission in it");
    this.setPermission(this.appHasPermission);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHasPermission'] && changes['appHasPermission'].currentValue) {
      console.log(changes);
      this.appHasPermission = changes['appHasPermission'].currentValue;
      this.setPermission(this.appHasPermission);
    }
  }

  ngAfterViewInit(): void {
    console.log("permission checked");
    // this.setPermission(this.appHasPermission);
  }

  private setPermission(permission: any) {
    // debugger;
    let result = permission.action + '_' + permission.menu
    this.binarySearchService.binarySearchTreePermission(this.storeDataService.permissionsData, 'children', result.toUpperCase());
    let item = this.binarySearchService.resultPermission;
    if (!item) {
      const html = this.elementRef.nativeElement;
      // console.log(html);
      this.renderer2.setStyle(html, 'display', 'none', RendererStyleFlags2.Important);
    };
  }

}
