<?php
/**
 * Plugin Name: __PLUGIN_NAME__
 * Plugin URI:  https://yourwebsite.com/__PLUGIN_SLUG__
 * Description: A generic boilerplate for creating WordPress plugins with React.
 * Version:     1.0.0
 * Author:      Your Name/Company
 * Author URI:  https://yourwebsite.com
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: __PLUGIN_SLUG__
 * Domain Path: /languages
 */

// Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing hooks.
 */
require plugin_dir_path(__FILE__).'includes/class-__PHP_PREFIX__plugin.php';

/**
 * Begins execution of the plugin.
 *
 * @since    1.0.0
 */
function __PHP_PREFIX__run_plugin()
{
    $plugin = new __PHP_PREFIX__Plugin;
    $plugin->run();
}
__PHP_PREFIX__run_plugin();

// Include shortcode handler
require_once plugin_dir_path(__FILE__).'includes/shortcode.php';

// Include enqueue scripts handler
require_once plugin_dir_path(__FILE__).'includes/enqueue.php';
