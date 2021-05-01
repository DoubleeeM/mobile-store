import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  isLogin = true;
  isLoading = false;
  error: string = null;
  tokenId: string = null;

  isAuthenticated = false;
  userEmail = '';
  private userSub: Subscription;

  password: FormControl;
  newPassword: FormControl;
  passwordConfirm: FormControl;
  form: FormGroup;

  static validatePassword(control: AbstractControl): ValidationErrors | null {
    if (control && control.get('newPassword') && control.get('passwordConfirm')) {
      const password = control.get('newPassword').value;
      const passwordConfirm = control.get('passwordConfirm').value;
      return (password === passwordConfirm) ? null : { passowrdError: true };
    }
    return null;
  }

  constructor(
    private userService: UserService,
    fb: FormBuilder,
    private snackBar: MatSnackBar) {
      this.password = fb.control('', Validators.required);
      this.newPassword = fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]);
      this.passwordConfirm = fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]);
      this.form = fb.group({
        password: this.password,
        newPassword: this.newPassword,
        passwordConfirm: this.passwordConfirm
      }, { validators: ProfileComponent.validatePassword });
    }

  ngOnInit(): void {
    this.userSub = this.userService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      this.userEmail = user?.email;
    });
    this.userService.autoLogin();
  }

  onChangePassword(): void {
    this.isLoading = true;
    this.userService.user.subscribe(userData => {
      this.tokenId = userData?.token;
      console.log(this.tokenId);
    });
    this.userService.changePassowrd(
      this.tokenId,
      this.newPassword.value
    ).subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.snackBar.open('Šifra je uspiješno promijenjena', 'Zatvori');
      this.userService.logout();
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.snackBar.open(this.error, 'Zatvori');
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
