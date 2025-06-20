<?php

// Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

function __PHP_PREFIX__shortcode($atts)
{
    // Define default attributes and merge with user-provided ones
    $atts = shortcode_atts(
        [
            'title' => '__PLUGIN_NAME__ Component', // Example attribute
        ],
        $atts,
        '__SHORTCODE_TAG__' // This is the shortcode tag, e.g., [__SHORTCODE_TAG__]
    );

    // This is the HTML element where your React app will be mounted.
    // The ID should match the ID used in src/index.jsx
    return '<div id="__PLUGIN_SLUG__-react-root" data-title="'.esc_attr($atts['title']).'"></div>';
}
add_shortcode('__SHORTCODE_TAG__', '__PHP_PREFIX__shortcode');
