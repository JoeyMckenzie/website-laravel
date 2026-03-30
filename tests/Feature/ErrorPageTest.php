<?php

declare(strict_types=1);

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class ErrorPageTest extends TestCase
{
    public function test_404_page_renders_error_component(): void
    {
        $response = $this->get('/nonexistent-route-that-does-not-exist');

        $response->assertStatus(404)
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('error')
                    ->where('status', 404)
            );
    }
}
