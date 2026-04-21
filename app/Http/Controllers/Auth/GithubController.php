<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\AbstractProvider;
use RuntimeException;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirectResponse;

final class GithubController extends Controller
{
    public function redirect(): SymfonyRedirectResponse
    {
        $provider = Socialite::driver('github');

        if (! $provider instanceof AbstractProvider) {
            throw new RuntimeException('Expected AbstractProvider from Socialite driver.');
        }

        return $provider->scopes(['read:user'])->redirect();
    }

    public function callback(): RedirectResponse
    {
        $githubUser = Socialite::driver('github')->user();

        session([
            'github_username' => $githubUser->getNickname(),
            'github_avatar' => $githubUser->getAvatar(),
        ]);

        return redirect()->route('guestbook');
    }
}
