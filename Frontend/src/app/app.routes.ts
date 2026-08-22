import { Routes } from '@angular/router';
import { Menu } from './components/menu/menu';

export const routes: Routes = [
    {
         path: '',
        component: Menu,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/all-avatars/all-avatars').then(c => c.AllAvatars),                
            },
            {
                path: 'all-avatars',
                loadComponent: () => import('./pages/all-avatars/all-avatars').then(c => c.AllAvatars),                
            },
            {
                path: 'edit/:mode/:id',
                loadComponent: () => import('./pages/avatars-create-or-update/avatars-create-or-update').then(c => c.AvatarsCreateOrUpdate)
            },
            {
                path: 'avatar-details/:id',
                loadComponent: () => import('./pages/avatars-details/avatars-details').then(c => c.AvatarsDetails)
            }
        ]
    }
];