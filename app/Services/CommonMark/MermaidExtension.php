<?php

declare(strict_types=1);

namespace App\Services\CommonMark;

use League\CommonMark\Environment\EnvironmentBuilderInterface;
use League\CommonMark\Exception\AlreadyInitializedException;
use League\CommonMark\Extension\CommonMark\Node\Block\FencedCode;
use League\CommonMark\Extension\ExtensionInterface;

final class MermaidExtension implements ExtensionInterface
{
    /**
     * @throws AlreadyInitializedException
     */
    #[\Override]
    public function register(EnvironmentBuilderInterface $environment): void
    {
        $environment->addRenderer(FencedCode::class, new MermaidRenderer(), priority: 100);
    }
}
