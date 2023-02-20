import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { memberContent } from 'src/app/_core/model/member';
import { MemberData } from 'src/app/_core/api/member/member-data';
import { ModeModal } from 'src/app/_core/enum/modeModal';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss'],
})
export class MemberFormComponent implements OnInit {
  formValidation!: FormGroup;
  isConfirmLoading = false;
  checked = false;

  @Input() mode!: string;

  @Input() title: string = '';

  @Input() id!: number;

  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private memberData: MemberData,
    private modelRef: NzModalRef<MemberFormComponent>
  ) {}

  get name() {
    return this.formValidation.get('name');
  }

  get email() {
    return this.formValidation.get('email');
  }

  get phone() {
    return this.formValidation.get('phone');
  }

  get username() {
    return this.formValidation.get('username');
  }

  ngOnInit(): void {
    console.log(this.id);

    this.formValidation = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(9),
        ],
      ],
      username: ['', [Validators.required, Validators.minLength(8)]],
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
    this.memberData.getById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.formValidation.setValue({
          // id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          username: res.data.username,
        });
      },
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    const item: memberContent = this.formValidation.value;
    if (this.mode === ModeModal.CREATE) {
      this.memberData.save(item).subscribe({
        next: (res: memberContent) => {
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
      this.memberData.update(this.id, item).subscribe({
        next: (res: memberContent) => {
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
