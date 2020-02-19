import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';
import { RestaurantsRoutingModule } from './restaurants-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RestaurantsRoutingModule
    ],
    declarations: [
        RestaurantProfileComponent,
        RestaurantsListComponent
    ]
})
export class RestaurantsModule {
}
