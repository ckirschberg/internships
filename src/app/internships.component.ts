import { Component, OnInit } from '@angular/core';
import { InternshipsService } from './internships.service';
import { FilterInternships } from './search-internship.filter';
import * as _ from 'underscore';
import {Internship} from './internship.entity';

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

    {{message}}

    <div class="row">
        <div class="col-sm-6 col-xl-4" *ngFor="let internship of internships | filterInternships: search ">
            <div *ngIf="internship === -1">
                "No matches"
            </div>
            <div *ngIf="internship !== -1" class="card card-block" >
                <h3 class="card-title">{{internship.student.firstname | uppercase }} {{internship.student.lastname | lowercase}}</h3>
                <p class="card-text">{{internship.companyName}}</p>
                <a routerLink="/internship/{{internship._id}}" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>    `
})
export class InternshipsComponent implements OnInit {
    private internships: Internship[];
    private message: string;

    constructor(private internshipsService: InternshipsService) {
    }

    ngOnInit():void {
        this.internships = this.internshipsService.getAllLocalInternships();

        if (!this.internships) {
            this.message = "Retrieving data...";

            this.internshipsService.getAllInternships().subscribe(
            (internships) => {
                this.internships = internships;
                this.message = "";
            },
                error => this.message = error
            );
        }
    }
}
