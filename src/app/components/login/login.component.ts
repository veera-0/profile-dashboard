import { Component, inject } from '@angular/core';
import { MainService } from '../../service/main.service';
import { Login } from '../../model/Login';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTabGroup,MatTab } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule,MatTabGroup,MatTab],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  subaseService = inject(MainService);
  isPinLog: boolean = false;
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true })
  });

  alertMessage: string | null = null;
  alertType: 'success' | 'danger' | null = null;

  onTabChange(event: any) {
    console.log('Tab changed:', event);
    this.isPinLog = event.index === 1;
    this.loginForm.reset();
    this.alertMessage = null;
    this.alertType = null;
  }

  async login(loginData: any) {
    if(this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;

    if (this.isPinLog) {
      // PIN login
      const { data, error } = await this.subaseService.loginWithPIN(email!, password!);
      if (error) {
        this.alertMessage = 'PIN login failed: ' + error.message;
        this.alertType = 'danger';
      } else {
        this.alertMessage = 'PIN login successful!';
        this.alertType = 'success';
        this.subaseService.isLoggedIn$.next(true);
        setTimeout(() => {
          this.router.navigateByUrl('/layout/profile');
        }, 1500);
      }
    } else {
      // Standard login
      const { data, error } = await this.subaseService.loginUser(email!, password!);
      if (error) {
        this.alertMessage = 'Login failed: ' + error.message;
        this.alertType = 'danger';
      } else {
        this.alertMessage = 'Login successful!';
        this.alertType = 'success';
        this.subaseService.isLoggedIn$.next(true);
        setTimeout(() => {
          this.router.navigateByUrl('/layout/profile');
        }, 1500);
      }
    }
  }

}
