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
        // console.log('Projects fetched successfully:', data);
        const projects = (data as Project[]).sort((a, b) => a.project_id - b.project_id);
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
    this.supabaseService.deleteProject(project.project_id).then(({ data, error }) => {
      if (error) {
        console.error('Error deleting project:', error);
      } else {
        console.log('Project deleted successfully:', data);
        this.getAllProjects();
      }
    });
  }

  openEditModal(project: Project) {
    // console.log('Editing project:', project);
    this.editingProject = project;
  }

  onProjectUpdated() {
    this.editingProject = undefined;
    this.getAllProjects();
  }

}
