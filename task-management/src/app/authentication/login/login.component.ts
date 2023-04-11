import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'internal-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  Error: boolean = true;
  passwordVisible: boolean = false;
  messageError: string = '';

  formBuilder() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [null, []],
    });
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    // do something here
  }

  // get taskUrl() {
  //   return environment.taskUrl;
  // }

  ngOnInit(): void {
    // do something here
    this.formBuilder();
    console.log('init form login');
  }

  login() {
    // do something here
    console.log(this.loginForm.value);
    const formData: any = this.loginForm.value;
    this.authService.login(formData).pipe(take(1)).subscribe({
      next: (res) => {
        console.log(res)
        if (res && res.accessToken) {
          // console.log(this.taskUrl);
          localStorage.setItem('access_token', res.accessToken);

          setTimeout(() => {
            this.router.navigate(['pages']);

          }, 300);
          // redirect sang task
          // window.location.href = this.taskUrl;
        }
        else {
          this.Error = false;
          this.messageError = 'Tên đăng nhập hoặc mật khẩu không đúng';
        }
      },
      error: (err) => {
        console.log(err);
        this.Error = false;
        this.messageError = 'Tên đăng nhập hoặc mật khẩu không đúng';

      }
    });
  }
}
