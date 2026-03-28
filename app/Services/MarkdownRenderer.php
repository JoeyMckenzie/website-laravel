<?php

declare(strict_types=1);

namespace App\Services;

use App\Services\CommonMark\MermaidExtension;
use Illuminate\Support\Facades\Cache;
use League\CommonMark\Environment\Environment;
use League\CommonMark\Exception\CommonMarkException;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\MarkdownConverter;
use Phiki\Adapters\CommonMark\PhikiExtension;
use Phiki\Theme\Theme;

final class MarkdownRenderer
{
    /**
     * @throws CommonMarkException
     */
    public function render(string $slug, string $content): string
    {
        /** @var string $parsedContent */
        $parsedContent = app()->isProduction()
            ? Cache::rememberForever($slug, fn () => $this->convert($content))
            : $this->convert($content);

        return $parsedContent;
    }

    /**
     * @throws CommonMarkException
     */
    private function convert(string $content): string
    {
        $environment = new Environment;
        $environment->addExtension(new CommonMarkCoreExtension);
        $environment->addExtension(new PhikiExtension(Theme::TokyoNight));
        $environment->addExtension(new MermaidExtension);

        $converter = new MarkdownConverter($environment);

        return $converter->convert($content)->getContent();
    }
}
