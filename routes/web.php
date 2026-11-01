<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Portfolio', [
        'projects' => Project::query()->orderBy('id')->get(),
    ]);
})->name('portfolio');

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AuthController::class, 'create'])->name('login');
    Route::post('/admin/login', [AuthController::class, 'store'])
        ->middleware('throttle:5,1')
        ->name('admin.login');
});

Route::post('/admin/logout', [AuthController::class, 'destroy'])
    ->middleware('auth')
    ->name('admin.logout');

Route::middleware('auth')->group(function () {
    Route::resource('admin/projects', ProjectController::class)
        ->except(['show'])
        ->names('admin.projects');
});
