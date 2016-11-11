import { Component, OnInit } from '@angular/core';
import { InternshipsService } from './internships.service';

@Component({
    selector: 'internships',
    template: `
    <div class="row">
        <div class="col-sm-6" *ngFor="let internship of internships">
            <div class="card card-block" >
                <h3 class="card-title">{{internship.student.firstname}} {{internship.student.lastname}}</h3>
                <p class="card-text">{{internship.company}}.</p>
                <a routerLink="/internship/{{internship._id}}" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>
    `
})
export class InternshipsComponent implements OnInit {
    private internships: any;

    constructor(private internshipsService: InternshipsService) {
        this.internships = this.internshipsService.getAllInternships();
     }

    ngOnInit() { }
} 