<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class GuestbookEntry extends Model
{
    /** @var array<int, string> */
    protected $fillable = [
        'github_username',
        'github_avatar',
        'body',
    ];
}
