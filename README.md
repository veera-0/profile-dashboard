# Profile Dashboard

A modern, responsive Angular dashboard for managing user profiles, projects, and education data, with image upload support via Supabase Storage.

---

## Features

- **User Authentication** (email/password and PIN)
- **Profile Management**: View and update user profile and "About Me"
- **Project Management**:
  - Add, edit, and delete projects
  - Upload and preview project images (stored in Supabase Storage)
  - Auto-removal of project images on project deletion
- **Education Management**: Add, edit, and list education records
- **Responsive UI**: Built with Angular Material and Bootstrap
- **Supabase Integration**: Uses Supabase for database and storage

---

## Tech Stack

- [Angular 17+](https://angular.io/)
- [Supabase](https://supabase.com/) (Database, Auth, Storage)
- [Bootstrap 5](https://getbootstrap.com/)
- [Angular Material](https://material.angular.io/)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Angular CLI (`npm install -g @angular/cli`)
- Supabase account and project

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd profile-dashboard
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure Supabase:**
   - Copy your Supabase project URL and anon key.
   - Edit `src/environments/environment.ts` and `src/environments/environment.prod.ts`:
     ```ts
     export const environment = {
       production: false,
       supabaseUrl: 'https://your-project.supabase.co',
       supabaseKey: 'your-anon-key'
     };
     ```

4. **Run the app:**
   ```sh
   ng serve
   ```
   Visit [http://localhost:4200](http://localhost:4200).

---

## Project Structure

```
src/
  app/
    components/
      profile/         # Profile view and edit
      project/         # Project CRUD and image upload
      education/       # Education CRUD
    model/             # TypeScript interfaces
    service/           # Supabase integration
  environments/        # Environment configs
  styles.css           # Global styles (Bootstrap imported)
  index.html           # App entry point
```

---

## Supabase Setup

- **Tables:**  
  - `profileDB` (user profiles)
  - `projectData` (projects, with `project_id` as PK, auto-increment)
  - `EducationData` (education records)

- **Storage:**  
  - Bucket: `portfoliostorage`
    - Folder: `projectimages/` (for project images)

- **RLS Policies:**  
  - Enable Row Level Security on all tables.
  - Add policies to allow authenticated users to `SELECT`, `INSERT`, `UPDATE`, and `DELETE` as needed.

---

## Usage

- **Login:**  
  Use email/password or PIN (if configured).
- **Profile:**  
  View and update your profile and "About Me".
- **Projects:**  
  Add new projects, upload images, edit or delete projects. Images are previewed before upload and deleted from storage when the project is removed.
- **Education:**  
  Add, edit, and view education records.

---

## Customization

- **Styling:**  
  Modify `styles.css` or component CSS files for custom themes.
- **Logo/Favicon:**  
  Replace `src/v-logo-bg.png` and update `<link rel="icon" ...>` in `index.html`.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [Angular](https://angular.io/)
- [Supabase](https://supabase.com/)