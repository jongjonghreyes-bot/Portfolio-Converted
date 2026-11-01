<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_project_management_requires_authentication(): void
    {
        $this->get(route('admin.projects.index'))
            ->assertRedirect(route('login'));
    }

    public function test_admin_can_sign_in_and_sign_out(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@example.com',
            'password' => 'secure-test-password',
        ]);

        $this->post(route('admin.login'), [
            'email' => 'admin@example.com',
            'password' => 'secure-test-password',
        ])->assertRedirect(route('admin.projects.index'));

        $this->assertAuthenticatedAs($user);

        $this->post(route('admin.logout'))
            ->assertRedirect(route('portfolio'));

        $this->assertGuest();
    }

    public function test_invalid_admin_credentials_are_rejected(): void
    {
        User::factory()->create([
            'email' => 'admin@example.com',
            'password' => 'secure-test-password',
        ]);

        $this->from(route('login'))
            ->post(route('admin.login'), [
                'email' => 'admin@example.com',
                'password' => 'incorrect-password',
            ])
            ->assertRedirect(route('login'))
            ->assertSessionHasErrors(['email']);

        $this->assertGuest();
    }
}
