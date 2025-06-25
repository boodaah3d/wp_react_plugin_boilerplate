<?php

// Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

/**
 * Add admin menu page.
 */
function __PHP_PREFIX__admin_menu()
{
    add_menu_page(
        '__PLUGIN_NAME__ Settings',
        '__PLUGIN_NAME__',
        'manage_options',
        '__PLUGIN_SLUG__-settings',
        '__PHP_PREFIX__admin_page_template',
        'dashicons-admin-generic',
        100
    );
}
add_action('admin_menu', '__PHP_PREFIX__admin_menu');

/**
 * Admin page template.
 */
function __PHP_PREFIX__admin_page_template()
{
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <div id="__PLUGIN_SLUG__-admin-root"></div>
    </div>
    <?php
}
