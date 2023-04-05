import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TeamData } from 'src/app/_core/api/team/team-data';
import { ModeModal } from 'src/app/_core/enum/modeModal';
import { teamContent } from 'src/app/_core/model/team';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {

  formValidation!: FormGroup;
  isConfirmLoading = false;
  checked = false;

  @Input() mode!: string;

  @Input() title: string = '';

  @Input() id!: number;

  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private teamData: TeamData,
    private modelRef: NzModalRef<TeamFormComponent>
  ) {}

  get teamName() {
    return this.formValidation.get('teamName');
  }

  get description() {
    return this.formValidation.get('description');
  }

  ngOnInit(): void {
    console.log(this.id);

    this.formValidation = this.fb.group({
      teamName: ['', [Validators.required, Validators.minLength(5)]],
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
    this.teamData.getById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.formValidation.setValue({
          // id: res.data.id,
          teamName: res.data.teamName,
          description: res.data.description
        });
      },
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    const item: teamContent = this.formValidation.value;
    if (this.mode === ModeModal.CREATE) {
      this.teamData.save(item).subscribe({
        next: (res: teamContent) => {
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
      item.id = this.id;
      this.teamData.update(this.id, item).subscribe({
        next: (res: teamContent) => {
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
