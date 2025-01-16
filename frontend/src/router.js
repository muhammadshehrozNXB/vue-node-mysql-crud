// frontend/src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import FileUploadPage from './views/FileUploadPage.vue';

const routes = [
    {
        path: '/',
        name: 'FileUpload',
        component: FileUploadPage
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
