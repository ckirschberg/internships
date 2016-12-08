import { Component, OnInit } from '@angular/core';
import { InternshipsService } from './internships.service';
import { FilterInternships } from './search-internship.filter';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { InternshipActions } from './actions/internship.actions';
import { Internship } from './internship.entity';
import { InternshipState, IAppState } from './store';

@Component({
    selector: 'internships-container',
    styles: [`
    .page-link {
        cursor: pointer;
    }
    `],
    template: `
    <div class="row" style="margin-bottom: 20px;">
        <div class="col-xs-6">
            <button routerLink="/internship" class="btn btn-primary">Create new internship</button>
        </div>
        <div class="float-xs-right col-xs-6 col-sm-5 col-md-4 col-lg-3 col-xl-2">
          <input class="form-control" type="text" placeholder="Search" [(ngModel)]="search">
        </div>
    </div>

    <div *ngIf="fetching$ | async">
        Retrieving data. Please wait..
    </div>
    <div *ngIf="message$ | async">
        {{ message$ | async }}
    </div>

    <div class="row">
        <internships [internships]="internships$ | async"
            (gotoDetails)="gotoDetails($event)">
        </internships>
    </div>    
    `
})
export class InternshipsContainerComponent {
    private internships$: Observable<Internship[]>;
    private fetching$: Observable<Boolean>;
    private message$: Observable<string>;
    
    // @select('internships') internships$: Observable<InternshipState>;

    constructor(private ngRedux: NgRedux<IAppState>,
      public actions: InternshipActions, private router: Router) {
    }
    
    ngOnInit():void {
        this.internships$ = this.ngRedux.select(state => state.internships.internships);
        this.fetching$ = this.ngRedux.select(state => state.internships.isFetching); //selecting a specific part of the state
        this.message$ = this.ngRedux.select(state => state.internships.message); //selecting a specific part of the state

        // this.actions.getInternships();
    }

    gotoDetails(id) {
        console.log(id);
        this.router.navigate(['/internship', id]);
    }
}