import { Component, inject, OnInit } from '@angular/core';
import { Project } from '../../model/Project';
import { MainService } from '../../service/main.service';
import { MatTableModule } from '@angular/material/table';
import { AddProjectComponent } from './add-project/add-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-project',
  imports: [MatTableModule,AddProjectComponent,UpdateProjectComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  constructor() { }

  projects: Project[] = [];
  supabaseService = inject(MainService);
  displayedColumns: string[] = ['position', 'Title', 'Technology', 'Description','Link','Actions'];
  dataSource: Project[] = [];
  isLoading = false;
  editingProject: Project | undefined = undefined;

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(){
    this.isLoading = true;
    this.supabaseService.getProjects().then(({ data, error }) => {
      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        console.log('Projects fetched successfully:');
        const projects = (data as Project[]).sort((a, b) =>
          (a.project_id ?? 0) - (b.project_id ?? 0)
        );
        this.projects = projects;
        this.dataSource = projects;
      }
      this.isLoading = false;
    });
  }

  deleteProject(project: Project) {
    const confirmed = confirm(`Are you sure you want to delete the project "${project.projecttitle}"?`);
    if (!confirmed) {
      return;
    }

    if (project.project_ImageUrl) {
      const urlPart = '/object/public/portfoliostorage/';
      const idx = project.project_ImageUrl.indexOf(urlPart);
      if (idx !== -1) {
        const filePath = project.project_ImageUrl.substring(idx + urlPart.length);
        this.supabaseService.deleteProjectImage(filePath).then(() => {
          this.supabaseService.deleteProject(project).then(({ data, error }) => {
            if (error) {
              console.error('Error deleting project:', error);
            } else {
              console.log('Project and image deleted successfully');
              this.getAllProjects();
            }
          });
        });
        return;
      }
    }

    // If no image, just delete the project
    this.supabaseService.deleteProject(project).then(({ data, error }) => {
      if (error) {
        console.error('Error deleting project:', error);
      } else {
        console.log('Project deleted successfully');
        this.getAllProjects();
      }
    });
  }



  async openEditModal(project: Project) {
    this.editingProject = project;
    if (project.profile_id !== undefined) {
      const {data, error} = await this.supabaseService.getProjectById(project);
      if(!error && data){
        this.editingProject = data as Project;
      } else {
        this.editingProject = project;
      }
    } else {
      console.error('Project profile_id is undefined.');
      this.editingProject = project;
    }
  }

  onProjectUpdated() {
    this.getAllProjects();
    this.editingProject = undefined;
  }

  onEditModalCancel() {
    this.editingProject = undefined;
  }

}
