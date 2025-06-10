import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MainService } from '../../../service/main.service';
import { Education } from '../../../model/Education';

@Component({
  selector: 'app-add-education',
  imports: [ReactiveFormsModule],
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.css'
})
export class AddEducationComponent {

  showModal = false;
  supabaseService = inject(MainService);
  @Output() educationAdded = new EventEmitter<void>();

  educationForm: FormGroup = new FormGroup({
    profile_id: new FormControl(1), 
    educationLevel: new FormControl(''),
    year: new FormControl(''),
    educationInfo: new FormControl(''),
  })

  // projectData: Project | undefined ;

  constructor() { }

  addEducation(education: Education){
    education = this.educationForm.value;
    this.supabaseService.addEducation(education).then(({ data, error }) => {
      if (error) {
        console.error('Error inserting education:', error);
        alert('Error inserting education: ' + error.message);
      } else {
        console.log('Education inserted successfully:', data);
        this.educationAdded.emit();
        this.educationForm.reset();
        this.closeModal();
      }
    });
  }

   openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.educationForm.reset();
  }

  submitProject() {
    if (this.educationForm.valid) {
      console.log(this.educationForm.value);
      this.closeModal();
    }
  }

}
