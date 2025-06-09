import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule, MatSidenavContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,MatSidenavModule,MatSidenavContainer,RouterLink,RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isMobile =  window.innerWidth < 768; // Check if the initial window width is less than 768px
  window = window;

  @HostListener('window:resize', ['$event'])
  onResize(){
    this.isMobile = window.innerWidth < 768;
  }

}
