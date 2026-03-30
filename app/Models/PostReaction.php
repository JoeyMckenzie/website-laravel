<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class PostReaction extends Model
{
    /** @var list<string> */
    protected $fillable = [
        'post_slug',
        'reaction',
        'ip_hash',
    ];
}
