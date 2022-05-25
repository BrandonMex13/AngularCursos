import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes : Routes = [
    {
        path: 'auth',
        loadChildren : () => import('./auth/auth-routing.module').then( m => m.AuthRoutingModule)
    },
    {
        path: '404',
        component : ErrorPageComponent
    },
    {
        path: '**',
        component: ErrorPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports : [
        RouterModule
    ]
})
export class AppRoutingModule { }
