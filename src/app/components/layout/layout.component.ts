import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule, MatSidenavContainer } from '@angular/material/sidenav';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,MatSidenavModule,MatSidenavContainer,RouterLink,RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isMobile =  window.innerWidth < 768; // Check if the initial window width is less than 768px
  window = window;
  supabaseService = inject(MainService);

  @HostListener('window:resize', ['$event'])
  onResize(){
    this.isMobile = window.innerWidth < 768;
  }

  logout() {
    this.supabaseService.logOutUser().then(() => {
      sessionStorage.removeItem('isLoggedIn');
      window.location.href = '/'; 
    }).catch(error => {
      console.error('Logout failed:', error);
    });
  }

}
