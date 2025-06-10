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

  constructor() {
  }

  mainService = inject(MainService);

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


}
