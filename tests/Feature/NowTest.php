<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

final class NowTest extends TestCase
{
    use RefreshDatabase;

    public function test_now_page_returns_ok(): void
    {
        $response = $this->get(route('now'));

        $response->assertOk();
    }

    public function test_now_page_renders_now_component(): void
    {
        $response = $this->get(route('now'));

        $response->assertInertia(static fn (AssertableInertia $page): \Inertia\Testing\AssertableInertia => $page->component('now'));
    }
}
