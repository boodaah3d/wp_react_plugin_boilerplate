import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // If you're using a global CSS file or Tailwind v3

// Find the root element where the React app will be mounted
const rootElement = document.getElementById('__PLUGIN_SLUG__-react-root');

if (rootElement) {
    // Get data passed from PHP (if any)
    // window.__PHP_PREFIX__data is set via wp_localize_script in enqueue.php
    const phpData = window.__PHP_PREFIX__data || {};
    const shortcodeTitle = rootElement.dataset.title; // Get data attribute from shortcode

    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App
                phpData={phpData}
                shortcodeTitle={shortcodeTitle}
            />
        </React.StrictMode>
    );
} else {
    console.warn('__PLUGIN_NAME__: Root element #__PLUGIN_SLUG__-react-root not found. React app will not render.');
}
