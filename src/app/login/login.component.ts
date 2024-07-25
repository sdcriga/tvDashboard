import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../_service/login.service';
import { Router } from '@angular/router';
import { User } from '../_interface/user';
import { map, catchError, of, tap } from 'rxjs';
import { Key } from 'src/enum/key.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  showPassword: boolean = false;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.isAuthenticated()
      ? this.router.navigate(['/'])
      : this.router.navigate(['/login']);
  }


  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });


  onLogin(): void {
    const loginInfo = this.loginForm.value;
    const { username, password } = loginInfo;
  this.loginService
    .login$(username, password)
    .pipe(
      tap((response) => {
        localStorage.setItem(Key.TOKEN, response.data.access_token);
        localStorage.setItem(Key.REFRESH_TOKEN, response.data.refresh_token);
        this.router.navigate(['/dashboard']);
      })
    )
    .subscribe({
      error: (error) => {
        console.error('Failed to login:', error);
      }
    });
  }

  togglePasswordVisibility():void {
    this.showPassword = !this.showPassword;
  }

}
