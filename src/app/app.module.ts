import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

import { HttpClientModule } from '@angular/common/http';

// Routing Module
import { AppRoutingModule } from './app.routing';
// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { PageNotFoundComponent } from './404.component';
import { ServerErrorComponent } from './500.component';
import { AuthGuard } from './services/auth-guard.service'
import { AuthService } from './services/auth.service'
import { SalesDataService } from './services/salesdata'

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    PageNotFoundComponent,
    ServerErrorComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
    }, AuthGuard, AuthService, SalesDataService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
