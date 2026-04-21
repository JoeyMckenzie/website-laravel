<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('post_reactions', function (Blueprint $table) {
            $table->id();
            $table->string('post_slug')->index();
            $table->string('reaction');
            $table->string('ip_hash');
            $table->timestamps();

            $table->unique(['post_slug', 'reaction', 'ip_hash']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('post_reactions');
    }
};
