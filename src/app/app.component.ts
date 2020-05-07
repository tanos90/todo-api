import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { User } from './shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public user: User;
  constructor(private router: Router, private userService: UserService) {}
  ngOnInit() {
    this.userService.getCurrentUser().subscribe((resp) => {
      this.user = resp;
      if (!this.user.username) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/todos']);
      }
    });
  }

  onLogout() {
    this.userService.logout();
  }
}
