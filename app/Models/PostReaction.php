<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $post_slug
 * @property string $reaction
 * @property string $ip_hash
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PostReaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PostReaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PostReaction query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PostReaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PostReaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PostReaction whereIpHash($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PostReaction wherePostSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PostReaction whereReaction($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PostReaction whereUpdatedAt($value)
 * @mixin \Eloquent
 */
final class PostReaction extends Model
{
    /** @var array<int, string> */
    protected $fillable = [
        'post_slug',
        'reaction',
        'ip_hash',
    ];
}
