<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\GuestbookEntry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class GuestbookController extends Controller
{
    public function index(Request $request): Response
    {
        $entries = GuestbookEntry::query()->latest()->get();

        return Inertia::render('guestbook', [
            'entries' => $entries,
            'githubUser' => $request->session()->has('github_username')
                ? [
                    'username' => $request->session()->get('github_username'),
                    'avatar' => $request->session()->get('github_avatar'),
                ]
                : null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $username = $request->session()->get('github_username');

        if (! $username) {
            return redirect()->route('guestbook');
        }

        $validated = $request->validate([
            'body' => ['required', 'string', 'max:280'],
        ]);

        GuestbookEntry::create([
            'github_username' => $username,
            'github_avatar' => $request->session()->get('github_avatar', ''),
            ...$validated,
        ]);

        return redirect()->route('guestbook');
    }

    public function destroy(Request $request, GuestbookEntry $entry): RedirectResponse
    {
        $username = $request->session()->get('github_username');

        if ($username !== $entry->github_username) {
            abort(403);
        }

        $entry->delete();

        return redirect()->route('guestbook');
    }
}
