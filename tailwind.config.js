/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#F69348',
                primaryText: '#474042',
                shadeColor:"#F9F0EC"
            },
        },
    },
    plugins: [],
};
