import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { ContainerComponent } from './container/container.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { FavoriteRestaurantsComponent } from './favorite-restaurants/favorite-restaurants.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ReservationsComponent } from './reservations/reservations.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        UserProfileRoutingModule,

    ],
    declarations: [
        FavoriteRestaurantsComponent,
        AccountSettingsComponent,
        ReservationsComponent,
        ContainerComponent
    ]
})
export class UserProfileModule {
    constructor(private library: FaIconLibrary) {
        library.addIcons();
    }
}
