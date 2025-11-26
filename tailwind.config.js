/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0056b3',
                    dark: '#004494',
                    light: '#e3f2fd',
                },
                accent: '#00a8e8',
                success: '#28a745',
                warning: '#ffc107',
                danger: '#dc3545',
                info: '#17a2b8',
                bg: {
                    body: '#f4f7fa',
                    card: '#ffffff',
                },
                text: {
                    primary: '#333333',
                    secondary: '#6c757d',
                },
                border: '#dee2e6',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            spacing: {
                'xs': '0.25rem',
                'sm': '0.5rem',
                'md': '1rem',
                'lg': '1.5rem',
                'xl': '2rem',
            }
        },
    },
    plugins: [],
}
