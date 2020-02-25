import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { NzButtonModule, NzProgressModule } from 'ng-zorro-antd';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
    faBookmark, faListAlt, faImages, faNewspaper, faCommentDots, faCreditCard, faStar,
    faThumbsUp, faClock, faChartBar, faEye, faHeart, faShareSquare
} from '@fortawesome/free-regular-svg-icons';
import {
    faShare, faHome, faBookOpen, faTags, faParking, faMusic, faBusinessTime,
    faStar as fasStar, faCoins, faDollarSign, faInfo, faPhoneAlt, faMapMarkerAlt, faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RestaurantsRoutingModule,
        NzButtonModule,
        FontAwesomeModule,
        NzProgressModule
    ],
    declarations: [
        RestaurantProfileComponent,
        RestaurantsListComponent
    ]
})
export class RestaurantsModule {
    constructor(private library: FaIconLibrary) {
        library.addIcons(faBookmark,
            faShare,
            faHome,
            faListAlt,
            faImages,
            faBookOpen,
            faNewspaper,
            faCommentDots,
            faTags,
            faCreditCard,
            faParking,
            faMusic,
            faBusinessTime,
            faStar,
            fasStar,
            faThumbsUp,
            faClock,
            faCoins,
            faDollarSign,
            faInfo,
            faPhoneAlt,
            faMapMarkerAlt,
            faChartBar,
            faEye,
            faHeart,
            faShareSquare,
            faMapMarkedAlt);
    }
}
