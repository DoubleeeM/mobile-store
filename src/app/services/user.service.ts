import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  passwordHash?: string;
  providerUserInfo?: JSON;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  signUpUser(signUpEmail: string, signUpPassword: string): any {
    const signUpData = {
      email: signUpEmail,
      password: signUpPassword,
      returnSecureToken: true
    };
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEWs1z3aIPvBFO5sOoBk59-4lqI3Xzmhs',
      signUpData)
      .pipe(
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn);
        }),
        catchError(this.handleError),
        );
  }

  loginUser(loginEmail: string, loginPassword: string): any {
    const loginData = {
      email: loginEmail,
      password: loginPassword,
      returnSecureToken: true
    };
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEWs1z3aIPvBFO5sOoBk59-4lqI3Xzmhs',
      loginData)
      .pipe(
        tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn);
      }),
        catchError(this.handleError),
      );
  }

  changePassowrd(userIdToken: string, newPassword: string): any {
    const changeData = {
      idToken: userIdToken,
      password: newPassword,
      returnSecureToken: true
    };
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBEWs1z3aIPvBFO5sOoBk59-4lqI3Xzmhs',
      changeData)
      .pipe(
      catchError(this.handleError)
    );
  }

  autoLogin(): void {
    const userData: {
      email: string;
      id: string;
      userToken: string;
      userTokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData.userToken, new Date(userData.userTokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData.userTokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuraton: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuraton);
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number): any {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse): any {
    let errorMessage = 'Desila se greška!';
    if (!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'E-mail adresa već postoji!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'E-mail adresa ne postoji!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Netačna šifra!';
    }
    return throwError(errorMessage);
  }

}
