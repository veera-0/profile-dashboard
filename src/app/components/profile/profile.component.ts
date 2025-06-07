import { Component, inject, OnInit } from '@angular/core';
import { Profile } from '../../model/Profile';
import { MainService } from '../../service/main.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor() { }

  mainService = inject(MainService);

  // profileData: Profile = {
  //   id: 1,
  //   name: 'John Doe',
  //   password: 'password123',
  //   email: 'john@example.com',
  //   Profile: function (id: number, name: string, password: string, email: string): void {
  //     // throw new Error('Function not implemented.');
  //   }
  // };

  profileData: Profile = new Profile(1,"veera","password123","jd");


  ngOnInit(): void {
    // Initialization logic can go here
    console.log(this.mainService.getProfile()); // Log the profile data to console
  }

  profilereturn: Profile = new Profile(0, '', '', '');


  // async addProfile() {
  //   console.log('Adding profile:', this.mainService);
  //   const { data, error } = await this.mainService.getProfile();
  //   if(data){
  //     this.profilereturn = data[0];
  //     console.log('Profile fetched:', this.profilereturn);
  //   }

  //   if (error) {
  //     console.error('Error inserting profile:', this.profileData);
  //     alert('Error inserting profile: ' + this.profileData);
  //   } else {
  //     console.log('Profile inserted successfully:', data);
  //     alert('Profile inserted successfully!');
  //   }
  // }

  async getProfile() {
    const { data, error } = await this.mainService.getProfile();
    console.log('Fetched profile data:', data);
    if(data) {
      this.profilereturn = data[0];
      console.log('Profile fetched:', this.profilereturn);
    }

    if (error) {
      console.error('Error fetching profile:', error);
      alert('Error fetching profile: ' + error.message);
    } else if (!data) {
      alert('No profile found with the given ID.');
    } else {
      if (Array.isArray(data) && data.length > 0) {
        this.profilereturn = data[0];
        console.log('Profile fetched successfully:', this.profilereturn);
        alert('Profile fetched successfully!');
      } else {
        alert('No profile found with the given ID.');
      }
    }
  }


}
