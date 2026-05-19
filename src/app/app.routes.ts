import { Routes } from '@angular/router';
import { SetList } from './pages/set-list/set-list';
import { SetCardList } from './pages/set-card-list/set-card-list';
import { AllCards } from './pages/all-cards/all-cards';

export const routes: Routes = [
    { path: '', component: SetList },
    { path: 'set/:id', component: SetCardList },
    { path: 'cards', component: AllCards },
];


