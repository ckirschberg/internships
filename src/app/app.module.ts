import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routing} from "./app-routing.module";

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { InternshipsComponent } from './internships.component';
import { InternshipEntryComponent } from './internship-entry.component';
import { AboutComponent } from './about.component';
import {InternshipsService } from './internships.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InternshipsComponent,
    InternshipEntryComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [InternshipsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
