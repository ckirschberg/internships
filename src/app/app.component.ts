import { Component } from '@angular/core';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { IAppState, rootReducer, enhancers } from './store/index';
const createLogger = require('redux-logger');


@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <nav class="navbar navbar-dark bg-primary" style="margin-bottom: 20px;">
      <div class="nav navbar-nav">
        <a class="nav-item nav-link active" routerLinkActive="active" routerLink="home">Home <span class="sr-only">(current)</span></a>
        <a class="nav-item nav-link" routerLinkActive="active" routerLink="internships">Internships</a>
        <a class="nav-item nav-link" routerLinkActive="active" routerLink="about">About</a>
      </div>
    </nav>

    <router-outlet></router-outlet>
  </div>
`
})
export class AppComponent {
  
  // Initialize redux in root component
  constructor(
    private ngRedux: NgRedux<IAppState>,
      private devTool: DevToolsExtension) {

      this.ngRedux.configureStore(
        rootReducer,
        {},
        [ createLogger() ],
        [ ...enhancers, devTool.isEnabled() ? devTool.enhancer() : f => f]);
  }
}
