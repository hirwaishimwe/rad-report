/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontSize: {
                lg: "22px",
                base: "20px",
                "2xl": "24px",
                "3xl": "30px",
                "4xl": "36px",
                "5xl": "48px",
                xl: "64px",
                "7xl": "96px",
            },
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px",
                custom: "1000px",
            },
        },
        content: ["node_modules/flowbite-react/lib/esm/**/*.js"],
    },
    plugins: ["flowbite/plugin"],
});
