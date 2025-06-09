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

  onTabChange(event: any) {
    console.log('Tab changed:', event);
    this.isPinLog = event.index === 1;
    this.loginForm.reset();
  }

  async login(loginData: any) {
    console.log('form data: '+ this.loginForm.value);
    if(this.loginForm.invalid) {
      alert('Please fill in all fields correctly.');
      return;
    }
    const { email, password } = this.loginForm.value;

    if (this.isPinLog) {
      // PIN login
      console.log('', 'Logging in with PIN:', email, password);
      const { data, error } = await this.subaseService.loginWithPIN(email!, password!);
      if (error) {
        alert('PIN login failed: ' + error.message);
      } else {
        alert('PIN login successful!');
        this.router.navigateByUrl('/layout/profile');
      }
    } else {
      // Standard login
      const { data, error } = await this.subaseService.loginUser(email!, password!);
      if (error) {
        alert('Login failed: ' + error.message);
      } else {
        alert('Login successful!');
        this.router.navigateByUrl('/layout/profile');
      }
    }
  }

}
