import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Education } from '../../../model/Education';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainService } from '../../../service/main.service';

@Component({
  selector: 'app-edit-education',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-education.component.html',
  styleUrl: './edit-education.component.css'
})
export class EditEducationComponent implements OnChanges {

  @Input() education: Education | undefined;
  @Output() educationUpdated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  showModal = false;
  supabaseService = inject(MainService);
  editedEducation: Education = {} as Education;

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['education']) {
        if (this.education) {
          this.editedEducation = { ...this.education };
        } else {
          this.editedEducation = {} as Education;
        }
      }
    }

  async updateEducation() {
    if (!this.editedEducation || !this.editedEducation.education_id) return;
    this.supabaseService.updateEducationByID(this.editedEducation).then(({ data, error }) => {
      if (error) {
        console.error('Error updating project:', error);
        alert('Error updating project: ' + error.message);
      } else {
        console.log('Project updated successfully:');
        this.resetForm();
        this.editedEducation = {} as Education;
        this.showModal = false;
        this.educationUpdated.emit();
      }
    });
  }

  openModal() {
      if (this.education) {
        this.showModal = true;
        this.editedEducation = { ...this.education };
      }
    }

    closeModal() {
      this.editedEducation = {} as Education;
      this.showModal = false;
      this.educationUpdated.emit();
      this.cancel.emit();
    }

    private resetForm() {
      this.editedEducation = {} as Education;
      this.showModal = false;
    }
}
