import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { permissionContent } from 'src/app/_core/api/permission/permission';
import { PermissionService } from 'src/app/_core/api/permission/permission.service';
import { ModeModal } from 'src/app/_core/enum/modeModal';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss'],
})
export class PermissionFormComponent implements OnInit {
  formValidation!: FormGroup;
  isConfirmLoading = false;
  checked = false;

  @Input() mode!: string;

  @Input() title: string = '';

  @Input() id!: number;

  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private service: PermissionService,
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

  get description() {
    return this.formValidation.get('description');
  }

  ngOnInit(): void {
    console.log(this.id);

    this.formValidation = this.fb.group({
      id: ['', []],
      name: ['', [Validators.required, Validators.minLength(5)]],
      code: ['', [Validators.required]],
      parentCode: [''],
      description: ['', []],
    });

    if (this.mode != ModeModal.CREATE) {
      if (this.id) {
        this.getById(this.id);
      }
    }
  }

  changeChecked() {
    this.checked = !this.checked;
  }

  getById(id: number) {
    this.service.getPermissionById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.formValidation.setValue({
          id: this.id,
          name: res.data.name,
          code: res.data.code,
          parentCode: res.data.parentCode,
          description: res.data.description,
        });
      },
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    const item: permissionContent = this.formValidation.value;
    if (this.mode === ModeModal.CREATE) {
      this.service.addPermission(item).subscribe({
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
      this.service.updatePermission(this.id, item).subscribe({
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
