import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { initFormArray } from 'src/app/_base/util';

@Component({
  selector: 'app-sub-project',
  templateUrl: './sub-project.component.html',
  styleUrls: ['./sub-project.component.scss']
})
export class SubProjectComponent implements OnInit {

  formValidation!: FormGroup;

  @Input() public projectId: number = 0;

  constructor(
    private modelRef: NzModalRef<SubProjectComponent>
  ) {
    this.formValidation = initFormArray("subProject");
  }

  get subProject() {
    return this.formValidation.get("subProject") as FormArray;
  }

  ngOnInit(): void {
  }

  handleCancel(): void {
    this.modelRef.close();
  }

}
