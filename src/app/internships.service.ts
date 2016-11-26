import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Internship} from './internship.entity';

@Injectable()
export class InternshipsService {
    private url: string = "http://angular2api2.azurewebsites.net/api/internships";

    constructor(private http: Http) {
    }

    public getAllInternships() {
        console.log("service is calling ws");
        return this.http.get(this.url).toPromise();
        //   .map((res: Response) => {
        //         let data = res.json().filter(item => item.customerId === '1');
        //         //this.internships = data;
        //         return data || {};
        //   })
        //   .catch(this.handleError);
    }

    // Clones the found internship obj.
    public getInternship(id: string): Internship { 
        // let internship = this.internships.find(internship => internship._id === id);
        // if (internship) {
        //     return this.copyInternshipObject(internship);
        // }
        return <Internship>{ student: {}}; // return "empty" internship obj.
    } 

    public saveInternship(internship: Internship) {
        let options = this.getOptionsObj();
        
        if (internship._id) {
            // console.log("From service: updating");
            return this.http.put(this.url + "/" + internship._id, internship, options).toPromise();
        }
        // console.log("From service: creating");
        internship.customerId = '1';
        return this.http.post(this.url, internship, options).toPromise();
    }

    // public updateInternship(internship): Observable<string> {
    //     let options = this.getOptionsObj();
        
    //     return this.http.put(this.url + "/" + internship._id, internship, options)
    //     .map((res: Response) => {
    //         // let index = this.find(internship._id);
    //         //this.internships[index] = internship;
    //     })
    //     .catch(this.handleError);
    // }
    public deleteInternship(id: string) {
        let options = this.getOptionsObj();

        return this.http.delete(this.url + "/" + id, options).toPromise();
        // .map((res: Response) => {
        //     // let index = this.find(id);
        //     //this.internships.splice(index, 1);
        // })
        // .catch(this.handleError);
    }

    // private find(id: string): number {
    //     for(let i=0; i < this.internships.length; i++) {
    //         if (this.internships[i]._id === id) {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

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
