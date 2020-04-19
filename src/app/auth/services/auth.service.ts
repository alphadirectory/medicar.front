import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of as ObservedValueOf } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login, Register } from '../ models/main';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subjectUser$: BehaviorSubject<Login> = new BehaviorSubject(null);
  private subjectLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient
  ) { }

  register(payload: Register): Observable<Register> {
    return this.http.post<Register>(`${this.url}register/`, payload);
  }

  login(payload: Login): Observable<Login> {

    return this.http.post<Login>(`${this.url}login/`, payload)
      .pipe(
        tap((access: Login) => {
          localStorage.setItem('@AUTH', JSON.stringify(access));
          this.subjectLoggedIn$.next(true);
          this.subjectUser$.next(access);
        })
      );
  }

  logOut(): Observable<Login> {
    const logOut = this.http.post<Login>(`${this.url}logout/`, {});
    localStorage.clear();
    this.subjectLoggedIn$.next(false);
    this.subjectUser$.next(null);
    return logOut;
  }

  isAuthenticated(): Observable<boolean> {
    if (this.getToken()) { return ObservedValueOf(true); }
    return ObservedValueOf(false);
  }

  getUser(): Observable<Login> {
    return this.subjectUser$.asObservable();
  }

  getToken() {
    try {
      const auth = this.getClientData();
      if (auth.hasOwnProperty('token')) {
        return auth.token;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  getClientData() {
    return JSON.parse(localStorage.getItem('@AUTH'));
  }

  get url(): string {
    return `${environment.urlApi}`;
  }

}
