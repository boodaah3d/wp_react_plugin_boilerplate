import type { Config } from 'tailwindcss'

export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./__PLUGIN_SLUG__.php",
        "./includes/**/*.php",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
} satisfies Config
