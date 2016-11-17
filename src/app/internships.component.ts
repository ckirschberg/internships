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
    selector: 'internships',
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

    <div *ngIf="message$ | async">
        Retrieving data. Please wait..
    </div>

    <div class="row">
        <div class="col-sm-6 col-xl-4" *ngFor="let internship of (internships$ | async).internships">

            <div *ngIf="internship === -1">
                "No matches"
            </div>
            <div *ngIf="internship !== -1" class="card card-block" >
                <h3 class="card-title">{{internship.student.firstname}} {{internship.student.lastname}}</h3>
                <p class="card-text">{{internship.companyName}}</p>
                <a (click)="gotoDetails(internship._id)" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>    `
})
export class InternshipsComponent implements OnInit {
    // private internships: Observable<InternshipState>;
    private message$: Observable<Boolean>;
    
    @select('internships') internships$: Observable<InternshipState>;


    constructor(private internshipsService: InternshipsService, public actions: InternshipActions,
        private router: Router, private ngRedux: NgRedux<IAppState>) {
    }
    
    ngOnInit():void {
        // console.log("component init");
        this.actions.getInternships();
        this.message$ = this.ngRedux.select(state => state.internships.isFetching); //selecting a specific part of the state

        // this.internships = this.internshipsService.getAllLocalInternships();
        
        // if (!this.internships) {
        //     this.message = "Retrieving data...";
            
        //     this.internshipsService.getAllInternships().subscribe(
        //     (internships) => {
        //         this.internships = internships;
        //         this.message = "";
        //     },
        //         error => this.message = error 
        //     );
        // }
    }

    gotoDetails(id: string) {
        this.router.navigate(['/internship', id]);
    }
} 