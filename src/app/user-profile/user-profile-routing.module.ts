import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { FavoriteRestaurantsComponent } from './favorite-restaurants/favorite-restaurants.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const childUserProfileRoutes: Routes = [
    { path: 'reservations', component: ReservationsComponent },
    { path: 'favorites', component: FavoriteRestaurantsComponent },
    { path: 'account-settings', component: AccountSettingsComponent}
];

const userProfileRoutes: Routes = [
    { path: 'profile', component: ContainerComponent, children: childUserProfileRoutes },
];

@NgModule({
    imports: [
        RouterModule.forChild(userProfileRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserProfileRoutingModule {
}
