import { Injectable } from '@angular/core';
import { createClient, SupabaseClient,AuthChangeEvent,
  AuthSession,
  Session,
  User, } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Education } from '../model/Education';
import { Profile } from '../model/Profile';
import { Project } from '../model/Project';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private supabase: SupabaseClient;
   _session: AuthSession | null = null



  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  insertEducation(data: Education) {
    return this.supabase.from('EducationData').insert([data]);
  }

  getEducation() {
    return this.supabase.from('EducationData').select('*');
  }

  getProfile() {
    return this.supabase.from('ProfileData').select('*');
  }

  updateProfile(data: Profile) {
    return this.supabase.from('ProfileData').update(data).eq('id', data.id);
  }

  insertProfile(data: Profile) {
    return this.supabase.from('ProfileData').insert([data]);
  }

  getProjects() {
    return this.supabase.from('ProjectsData').select('*');
  }

  insertProject(data: Project) {
    return this.supabase.from('ProjectsData').insert([data]);
  }

  updateProject(data: Project) {
    return this.supabase.from('ProjectsData').update(data).eq('id', data.project_id);
  }

  deleteProject(id: number) {
    return this.supabase.from('ProjectsData').delete().eq('id', id);
  }
}
