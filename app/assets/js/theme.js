'use stict'
const themes = {
    'dark' : {
        'text-primary': 'red',
        'primary-bg':'green'
        
    },
    'light': {
        'text-primary': ''
    }
}   

export const setTheme = (theme) => {
    if (!themes[theme]) {
        console.error(`Theme '${theme}' not found.`);
        return;
    }

    const root = document.documentElement;
    const variables = themes[theme] || {};

    for (const [key, value] of Object.entries(variables)) {
        root.style.setProperty(`--${key}`, value);
    }
};


