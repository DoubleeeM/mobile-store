import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  isLogin = true;
  isLoading = false;
  error: string = null;

  loginEmail: FormControl;
  loginPassword: FormControl;
  loginForm: FormGroup;
  signUpEmail: FormControl;
  signUpPassword: FormControl;
  signUpPasswordConfirm: FormControl;
  signUpForm: FormGroup;

  static validatePassword(control: AbstractControl): ValidationErrors | null {
    if (control && control.get('signUpPassword') && control.get('signUpPasswordConfirm')) {
      const password = control.get('signUpPassword').value;
      const passwordConfirm = control.get('signUpPasswordConfirm').value;
      return (password === passwordConfirm) ? null : { passowrdError: true };
    }
    return null;
  }

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.loginEmail = fb.control('', Validators.required);
    this.loginPassword = fb.control('', Validators.required);
    this.loginForm = fb.group({
      loginEmail: this.loginEmail,
      loginPassword: this.loginPassword
    });
    this.signUpEmail = fb.control('', [Validators.required, Validators.email]);
    this.signUpPassword = fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]);
    this.signUpPasswordConfirm = fb.control('');
    this.signUpForm = fb.group({
      signUpEmail: this.signUpEmail,
      signUpPassword: this.signUpPassword,
      signUpPasswordConfirm: this.signUpPasswordConfirm,
    }, { validators: LoginSignupComponent.validatePassword });
  }

  ngOnInit(): void {
  }

  signUp(): void {
    this.isLoading = true;
    this.userService.signUpUser(
      this.signUpEmail.value,
      this.signUpPassword.value
    ).subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.goHome();
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.snackBar.open(this.error, 'Zatvori');
      this.isLoading = false;
    });
  }

  login(): void {
    this.isLoading = true;
    this.userService.loginUser(
      this.loginEmail.value,
      this.loginPassword.value
    ).subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.goHome();
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.snackBar.open(this.error, 'Zatvori');
      this.isLoading = false;
    });
  }

  goHome(): void {
    this.router.navigate(['']);
  }

  switchForm(): void {
    this.isLogin = !this.isLogin;
  }

}
