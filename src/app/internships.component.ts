import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    <div class="col-sm-6 col-xl-4" *ngFor="let internship of internships">
        <div *ngIf="internship === -1">
            "No matches"
        </div>
        <div *ngIf="internship !== -1" class="card card-block" >
            <h3 class="card-title">{{internship.student?.firstname}} {{internship.student?.lastname}}</h3>
            <p class="card-text">{{internship.companyName}}</p>
            
            <a (click)="gotoDetails.emit(internship._id)" class="btn btn-primary">Details</a>
        </div>
    </div>
    `
})
export class InternshipsComponent {
    @Input() internships: Internship[];    
    @Output() gotoDetails: EventEmitter<any> = new EventEmitter();

    constructor() {
    }
} 