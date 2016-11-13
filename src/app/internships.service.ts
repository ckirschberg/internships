import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Internship} from './internship.entity';

//I want to be able to inject this service into other components.
@Injectable()
export class InternshipsService {
    private internships: any[];
    private url: string = "http://angular2api2.azurewebsites.net/api/internships";

    constructor(private http: Http) {
    }

    public getAllLocalInternships(): Internship[] {
        return this.internships;
    }
    
    public getAllInternships(): Observable<Internship[]> {
        return this.http.get(this.url)
          .map((res: Response) => {
                let data = res.json().filter(item => item.customerId === '1');
                this.internships = data;
                return data || {};
          })
          .catch(this.handleError);
    }

    //clones the found internship obj.
    public getInternship(id: string): Internship { 
        let internship = this.internships.find(internship => internship._id === id);
        if (internship) {
            return this.copyInternshipObject(internship);
        }
        return <Internship>{ student: {}}; //return "empty" internship obj.
    } 

    public createInternship(internship): Observable<Internship>  {
        let options = this.getOptionsObj();
        
        return this.http.post(this.url, internship, options)
        .map((res: Response) => {
            let createdInternship = res.json();
            this.internships.push(createdInternship);
        })
        .catch(this.handleError);
    }
    public updateInternship(internship): Observable<string> {
        let options = this.getOptionsObj();
        
        return this.http.put(this.url + "/" + internship._id, internship, options)
        .map((res: Response) => {
            let index = this.find(internship._id);
            this.internships[index] = internship;
        })
        .catch(this.handleError);
    }
    public deleteInternships(id: string): Observable<string> {
        let options = this.getOptionsObj();

        return this.http.delete(this.url + "/" + id, options)
        .map((res: Response) => {
            let index = this.find(id);
            this.internships.splice(index, 1);
        })
        .catch(this.handleError);
    }

    private find(id: string): number {
        for(let i=0; i < this.internships.length; i++) {
            if (this.internships[i]._id === id) {
                return i;
            }
        }
        return -1;
    }

    private handleError(error: Response | any) {
      return Observable.throw("some error message");
    }

    private getOptionsObj(): RequestOptions {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: headers });
    }
    private copyInternshipObject(internshipToCopy: Internship): Internship {
        let student = Object.assign({}, internshipToCopy.student);
        let internship = Object.assign({}, internshipToCopy);
        internship.student = student;
        return internship;
    }
}
