<?php

declare(strict_types=1);

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $github_username
 * @property string $github_avatar
 * @property string $body
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GuestbookEntry newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GuestbookEntry newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GuestbookEntry query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GuestbookEntry whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GuestbookEntry whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GuestbookEntry whereGithubAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GuestbookEntry whereGithubUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GuestbookEntry whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GuestbookEntry whereUpdatedAt($value)
 *
 * @mixin Eloquent
 */
final class GuestbookEntry extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'github_username',
        'github_avatar',
        'body',
    ];
}
