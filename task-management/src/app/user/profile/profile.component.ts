import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formValidation!: FormGroup;

  constructor(private fb: FormBuilder,) { }

  get username() {
    return this.formValidation.get('username');
  }

  get name() {
    return this.formValidation.get('name');
  }

  get email() {
    return this.formValidation.get('email');
  }

  get phone() {
    return this.formValidation.get('phone');
  }

  get role() {
    return this.formValidation.get('role');
  }

  ngOnInit(): void {
    this.formValidation = this.fb.group({
      id: ['', []],
      username: ['', []],
      name: ['', []],
      email: ['', []],
      phone: ['', []],
      role: ['', []],
    });
  }

}
