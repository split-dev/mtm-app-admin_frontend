import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public authService: AuthService) {}
  submitted: boolean = false;

  onSubmit(loginForm: NgForm) {
    this.authService.login(loginForm.value.password);
    
    this.authService.isLoggedIn$.subscribe((loginRes) => {
      if (loginRes) this.submitted = true;
    })
  }
}
