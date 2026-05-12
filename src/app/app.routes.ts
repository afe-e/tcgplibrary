import { Routes } from '@angular/router';
import { SetList } from './pages/set-list/set-list';
import { SetCardList } from './pages/set-card-list/set-card-list';

export const routes: Routes = [
    { path: '', component: SetList },
    { path: 'set/:id', component: SetCardList }
];


