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

function __PHP_PREFIX__admin_enqueue_scripts($hook)
{
    // Get the screen ID for your admin page.
    $screen_id = '__PLUGIN_SLUG__-settings';

    // Only load scripts on your plugin's admin page.
    if ('toplevel_page_' . $screen_id !== $hook) {
        return;
    }

    // Define file paths and versions.
    $manifest_path = plugin_dir_path(__FILE__).'../build/manifest.json';
    $admin_js_url = plugin_dir_url(__FILE__).'../build/static/js/admin.js'; // Default
    $admin_css_url = plugin_dir_url(__FILE__).'../build/static/css/admin.css'; // Default
    $version = '1.0.0';

    // Check for the manifest file to get hashed filenames.
    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), true);
        if (isset($manifest['src/admin/index.jsx']) && isset($manifest['src/admin/index.jsx']['file'])) {
            $admin_js_url = plugin_dir_url(__FILE__).'../build/'.$manifest['src/admin/index.jsx']['file'];
            if (isset($manifest['src/admin/index.jsx']['css']) && ! empty($manifest['src/admin/index.jsx']['css'][0])) {
                $admin_css_url = plugin_dir_url(__FILE__).'../build/'.$manifest['src/admin/index.jsx']['css'][0];
            }
        }
    }

    // Enqueue the admin script.
    wp_enqueue_script(
        '__PLUGIN_SLUG__-admin-react-script',
        $admin_js_url,
        ['wp-element'],
        $version,
        true
    );

    // Enqueue the admin style.
    wp_enqueue_style(
        '__PLUGIN_SLUG__-admin-react-style',
        $admin_css_url,
        [],
        $version
    );

    // Localize script to pass data to the admin React app.
    wp_localize_script(
        '__PLUGIN_SLUG__-admin-react-script',
        '__PHP_PREFIX__admin_data',
        [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('__PLUGIN_SLUG__-admin-nonce'),
        ]
    );
}
add_action('admin_enqueue_scripts', '__PHP_PREFIX__admin_enqueue_scripts');

/**
 * Add module type attribute to the script tag.
 *
 * @param string $tag    The <script> tag for the enqueued script.
 * @param string $handle The script's handle.
 * @param string $src    The script's source URL.
 * @return string The modified script tag.
 */
function __PHP_PREFIX__add_module_type_attribute($tag, $handle, $src)
{
    // List of script handles to add the module attribute to
    $module_handles = [
        '__PLUGIN_SLUG__-react-script',
        '__PLUGIN_SLUG__-admin-react-script'
    ];

    if (in_array($handle, $module_handles)) {
        // Add the type="module" attribute to the script tag
        $tag = '<script type="module" src="' . esc_url($src) . '" id="' . $handle . '-js"></script>';
    }

    return $tag;
}
add_filter('script_loader_tag', '__PHP_PREFIX__add_module_type_attribute', 10, 3);
