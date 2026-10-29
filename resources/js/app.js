import { createApp } from 'vue';

const pages = import.meta.glob('./pages/*.vue', { eager: true });

const el = document.getElementById('app');
const component = pages[`./pages/${el.dataset.page}.vue`];

if (component) {
    createApp(component.default).mount(el);
} else {
    el.innerHTML = '<h1 class="p-8 text-2xl">404 - Page not found</h1>';
}