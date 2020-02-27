import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {
  NzButtonModule,
  NzDatePickerModule,
  NZ_I18N,
  ru_RU,
  NzTimePickerModule,
  NzInputNumberModule,
  NzSelectModule
} from 'ng-zorro-antd';
import { MainPageComponent } from './main-page/main-page.component';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { HttpClientModule } from '@angular/common/http';
registerLocaleData(ru);
import { RestaurantsModule } from './restaurants/restaurants.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faList, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { AuthModule } from './auth/auth.module';
import { UserProfileModule } from './user-profile/user-profile.module';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzInputNumberModule,
    NzSelectModule,
    HttpClientModule,
    AppRoutingModule,
    RestaurantsModule,
    UserProfileModule,
    StoreModule.forRoot({}),
    FontAwesomeModule,
    AuthModule,
    StoreDevtoolsModule.instrument({
      name: 'App Devtools',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: ru_RU }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faList, faNewspaper, faSearch);
  }
}
