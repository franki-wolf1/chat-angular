import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        //component: ChatComponent
        loadComponent: () => import('./components/chat/chat.component')
    }
];
