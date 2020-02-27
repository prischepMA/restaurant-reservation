import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './container/container.component';

const childAuthRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegisterComponent }
];

const authRoutes: Routes = [
    { path: 'auth', component: ContainerComponent, children: childAuthRoutes },
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {
}
