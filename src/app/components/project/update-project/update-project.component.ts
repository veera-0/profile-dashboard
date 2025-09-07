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
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectData']) {
      if (this.projectData) {
        this.editProject = { ...this.projectData };
        this.previewUrl = this.editProject.project_ImageUrl || null;
      } else {
        this.editProject = {} as Project;
        this.previewUrl = null;
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async updateProject() {
    if (!this.editProject || !this.editProject.project_id) return;

    let picture_url = this.editProject.project_ImageUrl;
    if (this.selectedFile) {
      picture_url = await this.supabaseService.uploadProjectImage(this.selectedFile, this.editProject.projecttitle);
    }

    const updatedProject: Project = {
      ...this.editProject,
      project_ImageUrl: picture_url
    };

    this.supabaseService.updateProject(updatedProject).then(({ data, error }) => {
      if (error) {
        console.error('Error updating project:', error.message);
      } else {
        console.log('Project updated successfully:');
        this.resetForm();
        this.editProject = {} as Project;
        this.selectedFile = null;
        this.previewUrl = null;
        this.showModal = false;
        this.projectUpdated.emit();
      }
    });
  }

  openModal() {
    if (this.projectData) {
      this.showModal = true;
      this.editProject = { ...this.projectData };
      this.previewUrl = this.editProject.project_ImageUrl || null;
      this.selectedFile = null;
    }
  }

  closeModal() {
    this.editProject = {} as Project;
    this.selectedFile = null;
    this.previewUrl = null;
    this.showModal = false;
    this.projectUpdated.emit();
    this.cancel.emit();
  }

  private resetForm() {
    this.editProject = {} as Project;
    this.selectedFile = null;
    this.previewUrl = null;
    this.showModal = false;
  }
}
