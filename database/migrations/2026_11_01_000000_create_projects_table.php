<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 120)->unique();
            $table->string('category', 60);
            $table->text('description');
            $table->string('tech_stack')->nullable();
            $table->string('project_url')->nullable();
            $table->string('repository_url')->nullable();
            $table->date('completed_at')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
