import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take, firstValueFrom } from 'rxjs';
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

  async login() {
    // do something here
    // console.log(this.loginForm.value);
    try {
      const formData: any = this.loginForm.value;
      let res: any = await firstValueFrom(this.authService.login(formData));
      if (res && res.accessToken) {
        localStorage.setItem('access_token', res.accessToken);

        setTimeout(() => {
          this.router.navigate(['pages']);

        }, 300);

      }
      else {
        this.Error = false;
        this.messageError = 'Tên đăng nhập hoặc mật khẩu không đúng';
      }

    }
    catch (error) {
      console.log(error);
      this.Error = false;
      this.messageError = 'Tên đăng nhập hoặc mật khẩu không đúng';

    }

    // this.authService.login(formData).pipe(take(1)).subscribe({
    //   next: (res) => {
    //     console.log(res)
    //     if (res && res.accessToken) {
    //       // console.log(this.taskUrl);
    //       localStorage.setItem('access_token', res.accessToken);

    //       setTimeout(() => {
    //         this.router.navigate(['pages']);

    //       }, 300);
    //       // redirect sang task
    //       // window.location.href = this.taskUrl;
    //     }
    //     else {
    //       this.Error = false;
    //       this.messageError = 'Tên đăng nhập hoặc mật khẩu không đúng';
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     this.Error = false;
    //     this.messageError = 'Tên đăng nhập hoặc mật khẩu không đúng';

    //   }
    // });
  }
}
