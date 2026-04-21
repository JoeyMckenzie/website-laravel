<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Collection;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

final class HomeTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_returns_ok(): void
    {
        $response = $this->get(route('home'));

        $response->assertOk();
    }

    public function test_home_page_renders_home_component(): void
    {
        $response = $this->get(route('home'));

        $response->assertInertia(static fn (AssertableInertia $page): AssertableInertia => $page->component('home')->has('recentPosts'));
    }

    public function test_home_page_has_recent_posts(): void
    {
        $response = $this->get(route('home'));

        $response->assertInertia(static fn (AssertableInertia $page): AssertableInertia => $page->component('home')->where(
            'recentPosts',
            /** @param Collection<int, mixed> $posts */
            static fn (Collection $posts): bool => $posts->count() <= 3,
        ));
    }
}
