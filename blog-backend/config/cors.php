<?php
return [

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'register'],

    'allowed_methods' => ['*'],

    // Explicitly allow ONLY your Vite dev host:
    'allowed_origins' => ['http://localhost:5173'],

    // If you sometimes run with 127.0.0.1:5173 add it too:
    // 'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:5173'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    /* CRUCIAL for xhr.withCredentials = true  */
    'supports_credentials' => true,

    'max_age' => 0,

    'exposed_headers' => [],
];
