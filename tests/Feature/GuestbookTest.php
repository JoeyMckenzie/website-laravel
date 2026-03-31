<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\GuestbookEntry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class GuestbookTest extends TestCase
{
    use RefreshDatabase;

    public function test_guestbook_page_returns_ok(): void
    {
        $response = $this->get(route('guestbook'));

        $response->assertOk();
    }

    public function test_guestbook_page_renders_guestbook_component(): void
    {
        $response = $this->get(route('guestbook'));

        $response->assertInertia(
            static fn(AssertableInertia $page) => $page->component('guestbook')->has('entries')->where(
                'githubUser',
                null,
            ),
        );
    }

    public function test_guestbook_shows_entries(): void
    {
        GuestbookEntry::create([
            'github_username' => 'testuser',
            'github_avatar' => 'https://example.com/avatar.jpg',
            'body' => 'Hello world!',
        ]);

        $response = $this->get(route('guestbook'));

        $response->assertInertia(
            static fn(AssertableInertia $page) => $page->component('guestbook')->has('entries', 1),
        );
    }

    public function test_authenticated_github_user_can_post(): void
    {
        $response = $this->withSession([
            'github_username' => 'testuser',
            'github_avatar' => 'https://example.com/avatar.jpg',
        ])->post(route('guestbook.store'), [
            'body' => 'Great site!',
        ]);

        $response->assertRedirect(route('guestbook'));

        $this->assertDatabaseHas('guestbook_entries', [
            'github_username' => 'testuser',
            'body' => 'Great site!',
        ]);
    }

    public function test_unauthenticated_user_cannot_post(): void
    {
        $response = $this->post(route('guestbook.store'), [
            'body' => 'Great site!',
        ]);

        $response->assertRedirect(route('guestbook'));
        $this->assertDatabaseCount('guestbook_entries', 0);
    }

    public function test_body_is_required(): void
    {
        $response = $this->withSession([
            'github_username' => 'testuser',
            'github_avatar' => 'https://example.com/avatar.jpg',
        ])->post(route('guestbook.store'), [
            'body' => '',
        ]);

        $response->assertSessionHasErrors('body');
    }

    public function test_body_max_length_is_280(): void
    {
        $response = $this->withSession([
            'github_username' => 'testuser',
            'github_avatar' => 'https://example.com/avatar.jpg',
        ])->post(route('guestbook.store'), [
            'body' => str_repeat('a', 281),
        ]);

        $response->assertSessionHasErrors('body');
    }

    public function test_owner_can_delete_entry(): void
    {
        $entry = GuestbookEntry::create([
            'github_username' => 'testuser',
            'github_avatar' => 'https://example.com/avatar.jpg',
            'body' => 'Hello!',
        ]);

        $response = $this->withSession([
            'github_username' => 'testuser',
        ])->delete(route('guestbook.destroy', $entry));

        $response->assertRedirect(route('guestbook'));
        $this->assertDatabaseCount('guestbook_entries', 0);
    }

    public function test_non_owner_cannot_delete_entry(): void
    {
        $entry = GuestbookEntry::create([
            'github_username' => 'testuser',
            'github_avatar' => 'https://example.com/avatar.jpg',
            'body' => 'Hello!',
        ]);

        $response = $this->withSession([
            'github_username' => 'otheruser',
        ])->delete(route('guestbook.destroy', $entry));

        $response->assertForbidden();
        $this->assertDatabaseCount('guestbook_entries', 1);
    }

    public function test_github_user_is_shared_when_in_session(): void
    {
        $response = $this->withSession([
            'github_username' => 'testuser',
            'github_avatar' => 'https://example.com/avatar.jpg',
        ])->get(route('guestbook'));

        $response->assertInertia(
            static fn(AssertableInertia $page) => $page->component('guestbook')->where(
                'githubUser.username',
                'testuser',
            ),
        );
    }
}
