import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MainService } from '../../../service/main.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Project } from '../../../model/Project';

@Component({
  selector: 'app-add-project',
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {

  showModal = false;
  supabaseService = inject(MainService);
  @Output() projectAdded = new EventEmitter<void>();

  projectForm: FormGroup = new FormGroup({
    profile_id: new FormControl(1), 
    projecttitle: new FormControl(''),
    techused: new FormControl(''),
    projectdescription: new FormControl(''),
    project_link: new FormControl('')
  })

  projectData: Project | undefined ;

  constructor() { }

  addProject(project: Project){
    console.log('Project Form Value:', project);
    project = this.projectForm.value;
    this.supabaseService.insertProject(project).then(({ data, error }) => {
      if (error) {
        console.error('Error inserting project:', error);
        alert('Error inserting project: ' + error.message);
      } else {
        console.log('Project inserted successfully:', data);
        this.projectAdded.emit();
        this.projectForm.reset();
        this.closeModal();
      }
    });
  }

   openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.projectForm.reset();
  }

  submitProject() {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
      this.closeModal();
    }
  }

}
