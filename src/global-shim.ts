// src/global-shim.ts
declare global {
    interface Window {
        global: Window;
    }
}

if (typeof global === 'undefined') {
    window.global = window;
}

export { };