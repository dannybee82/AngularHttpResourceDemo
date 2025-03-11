import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';

export const routes: Routes = [
    {
        path: '',
        component: MenuComponent,
        children: [
            {
                path: 'all-avatars',
                loadComponent: () => import('./pages/all-avatars/all-avatars.component').then(c => c.AllAvatarsComponent)
            },
            {
                path: 'edit/:mode/:id',
                loadComponent: () => import('./pages/avatars-create-or-update/avatars-create-or-update.component').then(c => c.AvatarsCreateOrUpdateComponent)
            },
            {
                path: 'avatar-details/:id',
                loadComponent: () => import('./pages/avatars-details/avatars-details.component').then(c => c.AvatarsDetailsComponent)
            }
        ]
    }
];