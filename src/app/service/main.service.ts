import { Injectable } from '@angular/core';
import { createClient, SupabaseClient,AuthChangeEvent,
  AuthSession,
  Session,
  User, } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Education } from '../model/Education';
import { Profile } from '../model/Profile';
import { Project } from '../model/Project';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private supabase: SupabaseClient;
   _session: AuthSession | null = null

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  // Optionally, store user info
  user$ = new BehaviorSubject<any>(null);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }: { data: { session: AuthSession | null } }) => {
      this._session = data.session
    })
    return this._session
  }

  getSupabase(){
    return this.supabase;
  }

  insertEducation(data: Education) {
    return this.supabase.from('EducationData').insert([data]);
  }

  getEducation() {
    return this.supabase.from('EducationData').select('*').eq('profile_id',1);
  }

  addEducation(education: Education) {
    return this.supabase.from('EducationData').insert([education]);
  }

  getProfile() {
    return this.supabase.from('profileDB').select('*');
  }

  updateProfile(data: Profile) {
    return this.supabase.from('profileDB').update(data).eq('id', data.id);
  }

  insertProfile(data: Profile) {
    return this.supabase.from('profileDB').insert([data]);
  }

  getProjects() {
    return this.supabase.from('projectData').select('*');
  }

  insertProject(data: Project) {
    return this.supabase.from('projectData').insert([data]);
  }

  updateProject(data: Project) {
    return this.supabase.from('projectData').update(data).eq('project_id', data.project_id);
  }

  deleteProject(id: number) {
    return this.supabase.from('projectData').delete().eq('project_id', id);
  }

  loginUser(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  loginWithPIN(email: string,pin: string) {
    console.log('Logging in with PIN:', pin);
    return this.supabase.from('profileDB')
      .select('*')
      .eq('email', email)
      .eq('password', pin)
      .single();
  }

  logOutUser(){
    return this.supabase.auth.signOut();
  }
}
