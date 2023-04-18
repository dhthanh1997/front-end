import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { memberContent } from 'src/app/_core/model/member';
import { MemberData } from 'src/app/_core/api/member/member-data';
import { ModeModal } from 'src/app/_core/enum/modeModal';
import { TeamData } from 'src/app/_core/api/team/team-data';
import { RoleAppData } from 'src/app/_core/api/role-application/role-app-data';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss'],
})
export class MemberFormComponent implements OnInit {
  formValidation!: FormGroup;
  isConfirmLoading = false;
  checked = false;

  teamList: any[] = [];
  roleAppList: any[] = [];
  roleAppValue: number = 0;

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  byId(item1: any, item2: any) {
    return item2 == item1;
  }

  selectedItem: any;

  @Input() mode!: string;

  @Input() title: string = '';

  @Input() id!: number;

  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private memberData: MemberData,
    private modelRef: NzModalRef<MemberFormComponent>,
    private teamData: TeamData,
    private roleAppData: RoleAppData,
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

  get teams() {
    return this.formValidation.get('teams');
  }

  get roleId() {
    return this.formValidation.get('roleId');
  }

  ngOnInit(): void {
    // console.log(this.id);

    this.formValidation = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', []],
      phone: [
        '',
        [
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(9),
          Validators.maxLength(11),
        ],
      ],
      username: ['', [Validators.required]],
      teams: [[], []],
      roleId: [0, []],
    });

    if (this.mode != ModeModal.CREATE) {
      if (this.id) {
        this.getById(this.id);
      }
    }

    this.getTeam();
    this.getParentRole();
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
          teams: res.data.teams,
          roleId: res.data.roleId,
        });
        console.log(this.formValidation.value.roleId);
      },
    });
  }

  getTeam() {
    this.teamData.search(1, 999).subscribe({
      next: (res) => {
        if(res) {
          console.log(res);
          this.teamList = res.pagingData.content;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getParentRole() {
    this.roleAppData.search(1, 999).subscribe({
      next: (res) => {
        if(res) {
          console.log(res);
          this.roleAppList = res.pagingData.content;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // findNameById() {
  //   let index = this.roleAppList.findIndex(item => item.id === this.roleId?.value);
  //   if (index !== -1)
  //     return this.roleAppValue = this.roleAppList[index].id;
  // }

  handleOk(): void {
    // debugger;
    this.isConfirmLoading = true;
    const item: memberContent = this.formValidation.value;
    if (this.mode === ModeModal.CREATE) {
      item.id = 0;
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
