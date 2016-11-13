import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators, FormControl
} from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {InternshipsService} from "./internships.service";
import {Internship} from './internship.entity';

@Component({
  selector: 'internship-entry',
  template: `
  
  <h2>Internship</h2>
  <form class="" (ngSubmit)="onSubmit()" #internshipForm="ngForm">

    <div class="row">
      <div class="col-sm-12 ">
    
        <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                    <label for="initials">Initials</label>
                    <input type="text"
                            name="initials"
                            id="initials"
                            required minlength="4" maxlength="6"
                            #initials="ngModel"
                            [(ngModel)]="selectedInternship.initials"
                            placeholder="Initials"
                            class="form-control">

                    <div *ngIf="initials.errors && (initials.dirty || initials.touched)"
                        class="alert alert-danger">
                        <div [hidden]="!initials.errors.required">
                            Initials is required
                        </div>
                        <div [hidden]="!initials.errors.minlength">
                            initials must be at least 4 characters long.
                        </div>
                        <div [hidden]="!initials.errors.maxlength">
                            initials cannot be more than 6 characters long.
                        </div>
                    </div>
                </div>        
                

                <div class="col-sm-6">
                    <label for="date">Date</label>
                    <input type="text"
                            id="date"
                            name="date"
                            placeholder="Date"
                            [(ngModel)]="selectedInternship.date"
                            required
                            #date="ngModel"
                            class="form-control">

                    <div *ngIf="date.errors && (date.dirty || date.touched)"
                        class="alert alert-danger">
                        <div [hidden]="!date.errors.required">
                            Date is required
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
        <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                    <label for="student-firstname">Student's firstname</label>
                    <input type="text"
                            name="student-firstname"
                            id="student-firstname"
                            [(ngModel)]="selectedInternship.student.firstname"
                            placeholder="Student's firstname"
                            class="form-control"
                            required
                            #studentFirstname="ngModel">

                    <div *ngIf="studentFirstname.errors && (studentFirstname.dirty || studentFirstname.touched)"
                        class="alert alert-danger">
                        <div [hidden]="!studentFirstname.errors.required">
                            Student's firstname is required
                        </div>
                    </div>
                </div>        
                <div class="col-sm-6">
                    <label for="student-lastname">Student's lastname</label>
                    <input type="text"
                            id="student-lastname"
                            name="student-lastname"
                            placeholder="Student's lastname"
                            [(ngModel)]="selectedInternship.student.lastname"
                            class="form-control"
                            required
                            #studentLastname="ngModel">

                    <div *ngIf="studentLastname.errors && (studentLastname.dirty || studentLastname.touched)"
                        class="alert alert-danger">
                        <div [hidden]="!studentLastname.errors.required">
                            Student's lastname is required
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                    <label for="companyname">Company name</label>
                    <input type="text"
                            name="companyname"
                            id="companyname"
                            [(ngModel)]="selectedInternship.companyName"
                            placeholder="Company name"
                            class="form-control"
                            required
                            #companyName="ngModel">

                    <div *ngIf="companyName.errors && (companyName.dirty || companyName.touched)"
                        class="alert alert-danger">
                        <div [hidden]="!companyName.errors.required">
                            Company's name' is required
                        </div>
                    </div>
                </div>
            </div>
        </div>
          
        <button type="button" routerLink="/internships" class="btn btn-secondary">Back</button>  
        <button type="submit" class="btn btn-primary" [disabled]="!internshipForm.form.valid">Save internship</button>
        <button type="button" class="btn btn-danger" (click)="deleteInternship()">Delete internship</button>
      </div>
    </div>
  </form>
  `
})
export class InternshipEntryComponent implements OnInit {
    private selectedInternship: Internship;
    private errorMessage: string;

    ngOnInit():void {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.selectedInternship = Object.assign({}, this.internshipsService.getInternship(id));
        });
    }

    deleteInternship(): void {
        this.internshipsService.deleteInternships(this.selectedInternship._id).subscribe(
            (internship)  => this.router.navigate(['/internships']),
            error =>  this.errorMessage = <any>error);
            
    }

  constructor(private route: ActivatedRoute, private internshipsService: InternshipsService,
    private router: Router) {
  }

  public onSubmit():void {
    if (this.selectedInternship._id) { //edit 
        this.internshipsService.updateInternship(this.selectedInternship).subscribe(
            ()  => this.router.navigate(['/internships']),
            error =>  this.errorMessage = <any>error);
    }
    else {
        this.selectedInternship.customerId = '1';
        this.internshipsService.createInternship(this.selectedInternship).subscribe(
            ()  => this.router.navigate(['/internships']),
            error =>  this.errorMessage = <any>error);
    }
  }
}
