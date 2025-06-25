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

// Include shortcode handler
require_once plugin_dir_path(__FILE__).'includes/shortcode.php';

// Include enqueue scripts handler
require_once plugin_dir_path(__FILE__).'includes/enqueue.php';
