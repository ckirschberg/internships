import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routing} from "./app-routing.module";
import { NgRedux, NgReduxModule, DevToolsExtension} from 'ng2-redux';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { InternshipsComponent } from './internships.component';
import { InternshipEntryComponent } from './internship-entry.component';
import { AboutComponent } from './about.component';
import { InternshipsService } from './internships.service';
import { FilterInternships } from './search-internship.filter';
import { InternshipsContainerComponent } from './internships-container.component';
import { InternshipActions } from './actions/internship.actions';
import { RouterModule } from '@angular/router';
import { NgReduxRouterModule, NgReduxRouter } from 'ng2-redux-router';
import { IAppState, rootReducer, enhancers } from './store/index';
const createLogger = require('redux-logger');
import { Observable } from 'rxjs/Observable';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    NgReduxModule.forRoot(),
    NgReduxRouterModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    InternshipsContainerComponent,
    InternshipsComponent,
    InternshipEntryComponent,
    AboutComponent,
    /*FilterInternships*/
  ],
  providers: [InternshipsService, InternshipActions],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    ngReduxRouter: NgReduxRouter
    ) {

      this.ngRedux.configureStore(
        rootReducer,
        {},
        [ createLogger() ],
        [ ...enhancers, devTool.isEnabled() ? devTool.enhancer() : f => f]);

        ngReduxRouter.initialize();      
    }
 }
