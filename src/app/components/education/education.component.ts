import { Component, inject, OnInit } from '@angular/core';
import { MainService } from '../../service/main.service';
import { Education } from '../../model/Education';
import { AddEducationComponent } from './add-education/add-education.component';
import { MatTableModule } from '@angular/material/table';
import { EditEducationComponent } from './edit-education/edit-education.component';

@Component({
  selector: 'app-education',
  imports: [AddEducationComponent,MatTableModule,EditEducationComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit{

  supabaseService  = inject(MainService);
  education!: Education[];
  displayedColumns: string[] = ['position', 'educationLevel', 'year', 'educationInfo','actions'];
  dataSource: Education[] = [];
  editingEducation: Education | undefined = undefined;
  isLoading = false;

  ngOnInit(): void {
    this.getEducationDetails();
  }

  getEducationDetails() {
    this.isLoading = true;
    this.supabaseService.getEducation().then(({ data, error }) => {
      if (error) {
        console.error('Error fetching education:', error);
      } else {
        this.education = (data as Education[]).sort((a, b) => a.education_id - b.education_id);
        this.dataSource = this.education;
        console.log('Education fetched successfully:');
      }
      this.isLoading = false;
    });
  }

  openEditModal(education: Education) {
    this.editingEducation = education;
  }

  onEducationUpdated() {
    this.editingEducation = undefined;
    this.getEducationDetails();
  }

  onEditModalCancel() {
    this.editingEducation = undefined;
  }

}
