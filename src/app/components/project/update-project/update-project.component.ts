import { Component, EventEmitter, inject, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainService } from '../../../service/main.service';
import { Project } from '../../../model/Project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css'
})
export class UpdateProjectComponent implements OnInit{

  @Input() projectData: Project | undefined;
  @Output() projectUpdated = new EventEmitter<void>();

  showModal = false;
  supabaseService = inject(MainService);
  editProject: Project = {} as Project;

  // projectForm: FormGroup = new FormGroup({
  //   profile_id: new FormControl(1),
  //   projecttitle: new FormControl(''),
  //   techused: new FormControl(''),
  //   projectdescription: new FormControl(''),
  //   project_link: new FormControl('')
  // });

  constructor() { }
  ngOnInit(): void {
    console.log("input data: "+this.projectData);
  }

  updateProject() {
    if (!this.editProject || !this.editProject.project_id) return;
    this.supabaseService.updateProject(this.editProject).then(({ data, error }) => {
      if (error) {
        console.error('Error updating project:', error);
        alert('Error updating project: ' + error.message);
      } else {
        console.log('Project updated successfully:', data);
        this.resetForm();
        this.editProject = {} as Project;
        this.showModal = false;
        this.projectUpdated.emit();
      }
    });
  }

  openModal() {
    if (this.projectData) {
      this.editProject = { ...this.projectData };
      this.showModal = true;
    }
  }

  closeModal() {
    this.editProject = {} as Project;
    this.showModal = false;
    this.projectUpdated.emit();
  }

  private resetForm() {
  this.editProject = {} as Project;
  this.showModal = false;
}
}
