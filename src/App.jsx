import React from 'react';
import BoilerplateComponent from './components/BoilerplateComponent';

// You can accept props passed from the index.jsx (which get data from PHP/shortcode)
function App({ phpData, shortcodeTitle }) {
    return (
        <div className="__PLUGIN_SLUG__-container">
            <h2 className="__PLUGIN_SLUG__-title text-2xl font-bold mb-4">
                {shortcodeTitle || "Default App Title"}
            </h2>
            <p>This is the main React App component for the __PLUGIN_NAME__.</p>
            <p>Data from PHP (nonce): {phpData.nonce}</p>
            <BoilerplateComponent />
        </div>
    );
}

export default App;
