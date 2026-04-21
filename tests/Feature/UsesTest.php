<?php

declare(strict_types=1);

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

final class UsesTest extends TestCase
{
    public function test_uses_page_returns_ok(): void
    {
        $response = $this->get(route('uses'));

        $response->assertOk();
    }

    public function test_uses_page_renders_uses_component(): void
    {
        $response = $this->get(route('uses'));

        $response->assertInertia(static fn (AssertableInertia $page): \Inertia\Testing\AssertableInertia => $page->component('uses'));
    }
}
