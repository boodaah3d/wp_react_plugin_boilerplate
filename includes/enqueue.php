<?php

// Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

function __PHP_PREFIX__enqueue_scripts()
{
    $manifest_path = plugin_dir_path(__FILE__).'../build/manifest.json';
    $js_file_url = plugin_dir_url(__FILE__).'../build/static/js/main.js';
    $css_file_url = plugin_dir_url(__FILE__).'../build/static/css/main.css';
    $version = '1.0.0'; // Default version, can be pulled from plugin header if needed.

    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), true);

        // Vite's manifest.json keys are typically relative to the project root
        // and link to the source file name (e.g., 'src/index.jsx').
        if (isset($manifest['src/index.jsx']) && isset($manifest['src/index.jsx']['file'])) {
            $js_file_url = plugin_dir_url(__FILE__).'../build/'.$manifest['src/index.jsx']['file'];
            // If Vite generates CSS alongside JS for the same entry point, it will be listed here
            if (isset($manifest['src/index.jsx']['css']) && ! empty($manifest['src/index.jsx']['css'][0])) {
                $css_file_url = plugin_dir_url(__FILE__).'../build/'.$manifest['src/index.jsx']['css'][0];
            }
        }
    }

    wp_enqueue_script(
        '__PLUGIN_SLUG__-react-script', // Handle for the script
        $js_file_url,
        ['wp-element'], // wp-element is a dependency for React apps in WordPress
        $version,
        true // Enqueue in footer
    );

    wp_enqueue_style(
        '__PLUGIN_SLUG__-react-style', // Handle for the style
        $css_file_url,
        [],
        $version
    );

    // Localize script to pass data from PHP to React
    wp_localize_script(
        '__PLUGIN_SLUG__-react-script', // Attach data to the React script handle
        '__PHP_PREFIX__data',          // Global JS object name
        [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('__PLUGIN_SLUG__-nonce'), // Nonce action
        ]
    );
}
add_action('wp_enqueue_scripts', '__PHP_PREFIX__enqueue_scripts');
