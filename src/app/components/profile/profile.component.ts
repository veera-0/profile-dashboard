import { Component, inject, OnInit } from '@angular/core';
import { Profile } from '../../model/Profile';
import { MainService } from '../../service/main.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor() {
  }

  mainService = inject(MainService);
  showAboutMeModal: Boolean = false;
  aboutMeEdit: string = '';

  ngOnInit(): void {
    this.getProfile();
  }

  profile: Profile | undefined;

  async getProfile() {
    const {data,error} = await this.mainService.getProfile();
    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      this.profile = data[0] as Profile;
      console.log('Profile fetched successfully:');
    }
  }

  async updateAboutMe(){
    if (this.profile) {
      const { data, error } = await this.mainService.updateProfile(this.profile);
      if (error) {
        console.error('Error updating profile:', error);
      } else {
        console.log('Profile updated successfully:', data);
      }
    } else {
      console.warn('No profile to update');
    }
  }

  openAboutMeModal() {
  if (this.profile) {
    this.aboutMeEdit = this.profile.about || '';
    this.showAboutMeModal = true;
  }
}

closeAboutMeModal() {
  this.showAboutMeModal = false;
}

saveAboutMe() {
  if (this.profile) {
    this.profile.about = this.aboutMeEdit;
    this.updateAboutMe();
    this.closeAboutMeModal();
  }
}

}
