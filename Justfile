install:
    npm install
    composer install --no-interaction
    php artisan package:discover --ansi

check:
    composer fmt:check
    composer refactor:check
    composer lint
    npm run fmt:check
    npm run types:check
    npm run lint
