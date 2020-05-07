import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../models/user-login.model';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$ = new BehaviorSubject<User>(new User());
  public user: User;

  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.user$.asObservable();
  }

  login(userLogin: UserLogin) {
    return this.http.post('http://localhost:4202/login', { userLogin });
  }

  auth(userLogin: UserLogin, isFromApi: boolean) {
    let role = '';

    if (!isFromApi) {
      if (userLogin.username === 'admin') {
        role = 'admin';
      }
    }

    role = isFromApi ? 'admin' : role;

    const user = new User({ username: userLogin.username, role });

    this.user$.next(user);
    this.user = user;
  }

  isAuthenticated() {
    return this.user.username !== '';
  }

  logout(): void {
    const user = new User();
    this.user$.next(user);
  }
}
