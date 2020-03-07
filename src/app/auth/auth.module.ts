import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule, NzInputModule } from 'ng-zorro-antd';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './container/container.component';
import { AuthRoutingModule } from './auth-routing.module';
import { faEye } from '@fortawesome/free-regular-svg-icons';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NzButtonModule,
        FontAwesomeModule,
        AuthRoutingModule,
        NzInputModule,
        NzButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        RegisterComponent,
        LoginComponent,
        ContainerComponent
    ]
})
export class AuthModule {
    constructor(private library: FaIconLibrary) {
        library.addIcons(faEye);
    }
}
