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
export class UpdateProjectComponent implements OnChanges{

  @Input() projectData: Project | undefined;
  @Output() projectUpdated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  showModal = false;
  supabaseService = inject(MainService);
  editProject: Project = {} as Project;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectData']) {
      if (this.projectData) {
        this.editProject = { ...this.projectData };
      } else {
        this.editProject = {} as Project;
      }
    }
  }

  async updateProject() {
    if (!this.editProject || !this.editProject.project_id) return;
    this.supabaseService.updateProject(this.editProject).then(({ data, error }) => {
      if (error) {
        console.error('Error updating project:', error.message);
      } else {
        console.log('Project updated successfully:');
        this.resetForm();
        this.editProject = {} as Project;
        this.showModal = false;
        this.projectUpdated.emit();
      }
    });
  }

  openModal() {
    if (this.projectData) {
      this.showModal = true;
      this.editProject = { ...this.projectData };
    }
  }

  closeModal() {
    this.editProject = {} as Project;
    this.showModal = false;
    this.projectUpdated.emit();
    this.cancel.emit();
  }

  private resetForm() {
    this.editProject = {} as Project;
    this.showModal = false;
  }
}
