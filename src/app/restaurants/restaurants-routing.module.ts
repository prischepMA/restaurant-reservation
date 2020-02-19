import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';

const restaurantsRoutes: Routes = [
    { path: 'restaurants', component: RestaurantsListComponent },
    { path: 'restaurants/:id', component: RestaurantProfileComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(restaurantsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RestaurantsRoutingModule {
}
