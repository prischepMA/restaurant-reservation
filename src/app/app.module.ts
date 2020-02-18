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
  NzSelectModule,
  NzMenuModule
} from 'ng-zorro-antd';
import { MainPageComponent } from './main-page/main-page.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { HttpClientModule } from '@angular/common/http';
registerLocaleData(ru);
import { IconDefinition } from '@ant-design/icons-angular';
import { NZ_ICONS } from 'ng-zorro-antd';
import * as AllIcons from '@ant-design/icons-angular/icons';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

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
    NzIconModule,
    NzSelectModule,
    HttpClientModule,
    NzMenuModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'App Devtools',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: ru_RU }, { provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }
