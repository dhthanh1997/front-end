import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { roleAppContent } from 'src/app/_core/model/role-app';
import { RoleAppService } from 'src/app/_core/api/role-application/role-app.service';
import { ModeModal } from 'src/app/_core/enum/modeModal';
import { RoleAppData } from 'src/app/_core/api/role-application/role-app-data';

@Component({
  selector: 'app-role-app-form',
  templateUrl: './role-app-form.component.html',
  styleUrls: ['./role-app-form.component.scss'],
})
export class RoleAppFormComponent implements OnInit {
  formValidation!: FormGroup;
  isConfirmLoading = false;
  checked = false;

  @Input() mode!: string;

  @Input() title: string = '';

  @Input() id!: number;

  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private roleAppData: RoleAppData,
    private modelRef: NzModalRef<RoleAppFormComponent>
  ) {}

  get name() {
    return this.formValidation.get('name');
  }

  get code() {
    return this.formValidation.get('code');
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
    this.roleAppData.getById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.formValidation.setValue({
          id: this.id,
          name: res.data.name,
          code: res.data.code,
          description: res.data.description,
        });
      },
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    const item: roleAppContent = this.formValidation.value;
    if (this.mode === ModeModal.CREATE) {
      this.roleAppData.save(item).subscribe({
        next: (res: roleAppContent) => {
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
      this.roleAppData.update(this.id, item).subscribe({
        next: (res: roleAppContent) => {
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
