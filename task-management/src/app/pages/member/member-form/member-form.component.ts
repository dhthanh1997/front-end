import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { memberContent } from 'src/app/_core/model/member';
import { MemberData } from 'src/app/_core/api/member/member-data';
import { ModeModal } from 'src/app/_core/enum/modeModal';
import { TeamData } from 'src/app/_core/api/team/team-data';

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
  listOfSelectedValue: any[] = [];


  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  @Input() mode!: string;

  @Input() title: string = '';

  @Input() id!: number;

  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private memberData: MemberData,
    private modelRef: NzModalRef<MemberFormComponent>,
    private teamData: TeamData,
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
          Validators.maxLength(11),
        ],
      ],
      username: ['', [Validators.required, Validators.minLength(8)]],
      teams: [[], []],
    });

    if (this.mode != ModeModal.CREATE) {
      if (this.id) {
        this.getById(this.id);
      }
    }

    this.getTeam();
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
          teams: res.data.teams
        });
        console.log(this.formValidation);
      },
    });
  }

  public getTeam() {
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
