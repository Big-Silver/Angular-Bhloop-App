import { Routes } from '@angular/router';
// Layouts
import { CorporateLayout } from './@pages/layouts';
// Componentes
import { HomeComponent } from './home/home.component';

export const AppRoutes: Routes = [

  {
    path: '',
    component: CorporateLayout,
    children: [
      {
        path: '',
        component: HomeComponent,
      }
    ],
  }
];
