# **WordPress React Plugin Boilerplate**

A generic boilerplate for creating WordPress plugins with React, Vite, and Tailwind CSS.

This boilerplate sets you up with a modern development environment so you can focus on building your plugin's features.

## **Features**

* **React:** Build your plugin's UI with React.
* **Vite:** A fast, modern build tool for development and production.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Admin & Shortcode:** Includes setups for both a front-end shortcode component and an admin dashboard page.
* **Automated Setup:** A setup script to quickly rename all boilerplate files and placeholders to match your new plugin's name.
* **Clean Start:** The setup script automatically detaches the boilerplate's Git history, allowing you to start fresh with your own repository.

## **How to Use This Boilerplate**

### **Step 1: Clone the Repository**

Clone the repository into a new folder. **Crucially, the folder name must match the "plugin slug"** you intend to use (e.g., my-cool-plugin).

    # Replace 'my-cool-plugin' with your desired plugin slug
    git clone https://github.com/boodaah3d/wp_react_plugin_boilerplate my-cool-plugin

### **Step 2: Navigate to the New Folder**

    cd my-cool-plugin

### **Step 3: Install npm dependencies.**

    npm install

### **Step 4: Run the Setup Script**

This is an important step. The script will ask for your plugin's name and then rename all files and placeholders.

    npm run setup

### **Step 5: Start Your Own Repository**

After the setup script finishes, you can detached from the boilerplate repo and create a new repository on GitHub (or another service) and push your new project to it.

    # Delete current git history
    rm -rf .git

    # Re-initialize as a new git repo, stage all files, make new clean commit
    git init
    git add .
    git commit -m "Initial commit"

    # Create a new repository on GitHub, then run the following:
    # Replace the URL with your new repository's URL
    git remote add origin https://github.com/your-username/my-cool-plugin.git
    git branch -M main
    git push -u origin main

### **Step 6: Build files for your plugin.**

    npm run build
