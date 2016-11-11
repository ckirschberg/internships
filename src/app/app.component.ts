import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <nav class="navbar navbar-dark bg-primary">
      <div class="nav navbar-nav">
        <a class="nav-item nav-link active" routerLink="home">Home <span class="sr-only">(current)</span></a>
        <a class="nav-item nav-link" routerLink="internships">Internships</a>
        <a class="nav-item nav-link" routerLink="about">About</a>
      </div>
    </nav>

    <router-outlet></router-outlet>
  </div>
`
})
export class AppComponent {
  title = 'app works!';
}
