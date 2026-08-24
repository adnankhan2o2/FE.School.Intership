import { Routes } from '@angular/router';

import { LoginSignup } from './Pages/login-signup/login-signup';
import { Layout } from './Pages/layout/layout';
import { Dashboard } from './Pages/dashboard/dashboard';
import { UserDetails } from './Pages/user_details/user_details';

export const routes: Routes = [

  {
    path: 'loginsignup',
    component: LoginSignup
  },

  {
    path: '',
    component: Layout,

    children: [

      {
        path: 'dashboard',
        component: Dashboard
      },

      {
        path: 'user_details',
        component: UserDetails
      }

    ]
  }

];
