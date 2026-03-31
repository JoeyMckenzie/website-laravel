install:
    npm install
    composer install --no-interaction
    php artisan package:discover --ansi

check:
    composer fmt:check
    composer lint
    composer analyze
    npm run lint
    composer run fmt:check
