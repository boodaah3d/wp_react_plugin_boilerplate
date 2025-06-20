## How to Use This Boilerplate (with updated search/replace):

1. Clone the Repo:

    ```git clone https://github.com/boodaah3d/wp_react_plugin_boilerplate my-new-plugin-slug```

    (Remember to manually rename the cloned folder from __PLUGIN_SLUG__ to my-new-plugin-slug)


2. Navigate to the New Folder:

    ```cd my-new-plugin-slug```


3. Rename the main plugin file:

    ```Rename __PLUGIN_SLUG__.php to my-new-plugin-slug.php.```


4. Perform Search and Replace:

    ```
    Use your IDE's global search and replace.

	- Find: __PLUGIN_SLUG__

	- Replace With: my-new-plugin-slug (e.g., ga-dashboard)

	- This covers folder names, text domains, CSS class prefixes, React root IDs, JS handles.

    - Find: __PHP_PREFIX__

	- Replace With: my_new_prefix_ (e.g., ga_dashboard_)

	- This covers PHP function prefixes, class names, JS global object for wp_localize_script. Remember to include the trailing underscore if you want your prefixes to end with one.

    - Find: __PLUGIN_NAME__

	- Replace With: My New Plugin Name (e.g., Google Analytics Dashboard)

	- Find: __SHORTCODE_TAG__

	- Replace With: my_plugin_shortcode (e.g., ga_dashboard)

	- Update Author/URI: Search for "Your Name/Company" and "yourwebsite.com".

5. Install Dependencies:

    ```npm install```

6. Develop & Build:

    ```npm run dev / npm run build```
