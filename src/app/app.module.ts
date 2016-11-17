import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routing} from "./app-routing.module";
import {NgReduxModule, DevToolsExtension} from 'ng2-redux';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { InternshipsComponent } from './internships.component';
import { InternshipEntryComponent } from './internship-entry.component';
import { AboutComponent } from './about.component';
import {InternshipsService } from './internships.service';
import { FilterInternships } from './search-internship.filter';

import { InternshipActions } from './actions/internship.actions';
import { CounterActions } from './actions/counter.actions';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InternshipsComponent,
    InternshipEntryComponent,
    AboutComponent,
    FilterInternships
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    NgReduxModule.forRoot(),
  ],
  providers: [InternshipsService, InternshipActions, CounterActions],
  bootstrap: [AppComponent]
})
export class AppModule { }
