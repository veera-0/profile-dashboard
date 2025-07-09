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

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isSubmitting = false;

  projectForm: FormGroup = new FormGroup({
    profile_id: new FormControl(1),
    projecttitle: new FormControl(''),
    techused: new FormControl(''),
    projectdescription: new FormControl(''),
    project_link: new FormControl('')
  })

  projectData: Project | undefined ;

  constructor() { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async addProject(formValue: any) {
    if (this.projectForm.invalid) return;
    this.isSubmitting = true;

    let picture_url = '';
    if (this.selectedFile) {
      picture_url = await this.supabaseService.uploadProjectImage(this.selectedFile);
      console.log('Uploaded image URL:', picture_url);
    }

    // Map form fields to Project model fields
    const project: Project = {
      profile_id: formValue.profile_id,
      projecttitle: formValue.projecttitle,
      techused: formValue.techused,
      projectdescription: formValue.projectdescription,
      project_link: formValue.project_link,
      project_id: formValue.project_id,
      created_at: formValue.created_at || new Date().toISOString(),
      project_ImageUrl: picture_url
    };

    this.supabaseService.insertProject(project).then(({ data, error }) => {
      this.isSubmitting = false;
      if (error) {
        console.error('Error inserting project:', error);
        alert('Error inserting project: ' + error.message);
      } else {
        this.projectAdded.emit();
        this.projectForm.reset();
        this.previewUrl = null;
        this.selectedFile = null;
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
