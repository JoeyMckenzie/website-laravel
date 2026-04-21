<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\PostReaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class PostReactionTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_reactions_for_post(): void
    {
        PostReaction::create([
            'post_slug' => 'test-post',
            'reaction' => 'fire',
            'ip_hash' => 'abc123',
        ]);

        $response = $this->getJson(route('api.posts.reactions.index', 'test-post'));

        $response->assertOk()->assertJsonPath('counts.fire', 1);
    }

    public function test_can_add_reaction(): void
    {
        $response = $this->postJson(route('api.posts.reactions.store', 'test-post'), [
            'reaction' => 'fire',
        ]);

        $response->assertOk()->assertJsonPath('toggled', 'added');

        $this->assertDatabaseHas('post_reactions', [
            'post_slug' => 'test-post',
            'reaction' => 'fire',
        ]);
    }

    public function test_can_toggle_reaction_off(): void
    {
        $ipHash = hash('xxh128', '127.0.0.1');

        PostReaction::create([
            'post_slug' => 'test-post',
            'reaction' => 'fire',
            'ip_hash' => $ipHash,
        ]);

        $response = $this->postJson(route('api.posts.reactions.store', 'test-post'), [
            'reaction' => 'fire',
        ]);

        $response->assertOk()->assertJsonPath('toggled', 'removed');

        $this->assertDatabaseMissing('post_reactions', [
            'post_slug' => 'test-post',
            'reaction' => 'fire',
            'ip_hash' => $ipHash,
        ]);
    }

    public function test_rejects_invalid_reaction_type(): void
    {
        $response = $this->postJson(route('api.posts.reactions.store', 'test-post'), [
            'reaction' => 'invalid',
        ]);

        $response->assertUnprocessable();
    }

    public function test_returns_user_reactions(): void
    {
        $ipHash = hash('xxh128', '127.0.0.1');

        PostReaction::create([
            'post_slug' => 'test-post',
            'reaction' => 'heart',
            'ip_hash' => $ipHash,
        ]);

        $response = $this->getJson(route('api.posts.reactions.index', 'test-post'));

        $response->assertOk()->assertJsonPath('userReactions.0', 'heart');
    }
}
