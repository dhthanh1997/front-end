import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { permissionContent } from 'src/app/_core/model/permission';
// import { PermissionService } from 'src/app/_core/api/permission/permission.service';
import { ModeModal } from 'src/app/_core/enum/modeModal';
import { PermissionData } from 'src/app/_core/api/permission/permission-data';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss'],
})
export class PermissionFormComponent implements OnInit {
  formValidation!: FormGroup;
  isConfirmLoading = false;
  checked = false;

  public listData: any;
  public listParent: any = [];

  @Input() mode!: string;

  @Input() title: string = '';

  @Input() id!: number;

  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private permissionData: PermissionData,
    private modelRef: NzModalRef<PermissionFormComponent>
  ) {}

  get name() {
    return this.formValidation.get('name');
  }

  get code() {
    return this.formValidation.get('code');
  }

  get parentCode() {
    return this.formValidation.get('parentCode');
  }

  get type() {
    return this.formValidation.get('type');
  }

  get description() {
    return this.formValidation.get('description');
  }

  ngOnInit(): void {
    console.log(this.id);

    this.formValidation = this.fb.group({
      id: ['', []],
      name: ['', [Validators.required, Validators.minLength(4)]],
      code: ['', [Validators.required]],
      parentCode: ['', []],
      type: ['', [Validators.required]],
      description: ['', []],
    });

    if (this.mode != ModeModal.CREATE) {
      if (this.id) {
        this.getById(this.id);
      }
    }

    this.getPermission();
  }

  changeChecked() {
    this.checked = !this.checked;
  }

  getPermission() {
    this.permissionData.search(1, 999, '').subscribe({
      next: (res) => {
        console.log(res);
        this.listData = res.pagingData.content;
        // console.log(this.listData);
        this.getParentCode();
        // this.totalElements = res.pagingData.totalElements;
        // this.totalPages = res.pagingData.totalPages;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getParentCode() {
    debugger;
    for (let i = 0; i < this.listData.length; i++) {
      if (this.listData[i].parentCode == null || this.listData[i].parentCode == "")
        this.listParent.push(this.listData[i]);
      console.log(this.listParent);
    }
  }

  getById(id: number) {
    this.permissionData.getById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.formValidation.setValue({
          id: this.id,
          name: res.data.name,
          code: res.data.code,
          type: res.data.type,
          parentCode: res.data.parentCode,
          description: res.data.description,
        });
      },
    });
  }

  handleOk(): void {
    // debugger;
    this.isConfirmLoading = true;
    const item: permissionContent = this.formValidation.value;
    if (this.mode === ModeModal.CREATE) {
      this.permissionData.save(item).subscribe({
        next: (res: permissionContent) => {
          console.log(res);
          if (res) {
            this.isVisible = false;
            this.isConfirmLoading = false;
            this.modelRef.close(res);
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('done');
        },
      });
    } else if (this.mode === ModeModal.UPDATE) {
      this.permissionData.update(this.id, item).subscribe({
        next: (res: permissionContent) => {
          console.log(res);
          if (res) {
            this.isVisible = false;
            this.isConfirmLoading = false;
            this.modelRef.close(res);
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('done');
        },
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.modelRef.close();
  }
}
