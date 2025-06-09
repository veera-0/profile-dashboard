import { Component, inject } from '@angular/core';
import { MainService } from '../../service/main.service';
import { Education } from '../../model/Education';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {

  supabaseService  = inject(MainService);
  education!: Education[];

  async getEducation(){
    const {data, error} = await this.supabaseService.getEducation();
    if(data){
      this.education = data; // Assuming you want the first education record
      console.log('Education fetched:', this.education);
    }

  }

}
