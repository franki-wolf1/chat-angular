import { Routes } from '@angular/router'; 
import ChatComponent from './components/chat/chat.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat/',
    pathMatch: 'full'
  },
  {
    path: 'chat/:userId',
    component: ChatComponent
  },
  {
    path: '**',
    redirectTo: 'chat/'
  }
];
