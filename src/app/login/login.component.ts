import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { UserLogin } from '../shared/models/user-login.model';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get l() {
    return this.loginForm.value;
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const userLoginInfo = this.l as UserLogin;
      this.userService.login(userLoginInfo).subscribe(
        (resp: boolean) => this.userService.auth(userLoginInfo, resp),
        (error) => this.userService.auth(userLoginInfo, false)
      );
    }
  }
}
