# Jong Reyes Portfolio

The original portfolio is now a Laravel 12 application using Inertia.js and React. The public page keeps the existing portfolio sections and loads the Projects section from SQLite. Projects can be created, edited, and deleted from the project manager.

## Requirements

- PHP 8.2 or newer with SQLite and fileinfo extensions enabled
- PHP ZIP extension enabled (or 7-Zip available to Composer)
- Composer
- Node.js 20.19 or newer and npm

## Run locally

From the project directory in PowerShell:

```powershell
Copy-Item .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
$env:PORTFOLIO_ADMIN_EMAIL = Read-Host "Admin email"
$securePassword = Read-Host "Admin password" -AsSecureString
$env:PORTFOLIO_ADMIN_PASSWORD = [System.Net.NetworkCredential]::new("", $securePassword).Password
php artisan tinker --execute="App\Models\User::create(['name' => 'Portfolio Admin', 'email' => getenv('PORTFOLIO_ADMIN_EMAIL'), 'password' => getenv('PORTFOLIO_ADMIN_PASSWORD')])->id;"
Remove-Item Env:PORTFOLIO_ADMIN_EMAIL, Env:PORTFOLIO_ADMIN_PASSWORD
Remove-Variable securePassword
npm install
npm run build
php artisan serve
```

Enter your preferred email and a strong password when prompted. The password prompt is hidden. Open `http://127.0.0.1:8000`. The first migration creates the project table and the seeder adds the four existing portfolio projects.

For frontend development with hot reload, use `npm run dev` in a second terminal instead of `npm run build`.

## Manage projects

Visit `/admin/projects` and sign in at `/admin/login` to manage the portfolio's dynamic projects section. Management routes require an authenticated account, and sign-in is rate limited. The form validates unique titles, required text, URL formats, completion dates, and image type and size. Successful changes are shown on the public portfolio at `/`.

Each project stores a title, category, description, technology list, optional project and repository URLs, optional completion date, and optional uploaded image. Existing image files are served from `public/images`; newly uploaded files are stored on Laravel's public disk.

## Main implementation files

- `app/Models/Project.php` and `database/migrations/` define project data.
- `app/Http/Controllers/ProjectController.php` implements validated CRUD actions.
- `routes/web.php` defines the public page and project management routes.
- `resources/js/Pages/Portfolio.jsx` renders the public portfolio.
- `resources/js/Pages/Projects/` contains the project manager pages.
- `resources/js/Components/ProjectForm.jsx` is shared by create and edit.
- `resources/css/app.css` retains the portfolio's original visual style.

Run the backend tests with `php artisan test`.
