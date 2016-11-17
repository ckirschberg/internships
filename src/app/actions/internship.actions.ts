import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Internship } from '../internship.entity';
import { InternshipsService } from '../internships.service';
import { Response } from '@angular/http';

@Injectable()
export class InternshipActions {
  constructor (
    private ngRedux: NgRedux<IAppState>,
    private internshipsService: InternshipsService) {}

  static GET_INTERNSHIPS_FROM_WS: string = 'GET_INTERNSHIPS_FROM_WS';
  static RECEIVED_INTERNSHIPS_FROM_WS: string = 'RECEIVED_INTERNSHIPS_FROM_WS';
  static FAILED_GET_INTERNSHIPS_FROM_WS: string = 'FAILED_GET_INTERNSHIPS_FROM_WS';

  static GET_INTERNSHIP: string = 'GET_INTERNSHIP';
  static SAVE_INTERNSHIP: string = 'SAVE_INTERNSHIP';
  static DELETE_INTERNSHIP: string = 'DELETE_INTERNSHIP';
  

  getInternships(): void {
    this.ngRedux.dispatch({ type: InternshipActions.GET_INTERNSHIPS_FROM_WS }); //sets isFetching flag

    // Call ws through service
    this.internshipsService.getAllInternships().then( 
      (response: Response) => {
        this.ngRedux.dispatch(
        {
          type: InternshipActions.RECEIVED_INTERNSHIPS_FROM_WS,
          payload: response
        })})
        .catch((error) => {
          this.ngRedux.dispatch(
          { 
            type: InternshipActions.FAILED_GET_INTERNSHIPS_FROM_WS,
            payload: error
          })}
        );
      
  }
  getInternship(id: string): void {
    this.ngRedux.dispatch({ type: InternshipActions.GET_INTERNSHIP, payload: id });
  }
  saveInternship(internship: Internship): void {
    this.ngRedux.dispatch({ type: InternshipActions.SAVE_INTERNSHIP, payload: internship });
  }
  deleteInternship(id: number): void {
    this.ngRedux.dispatch({ type: InternshipActions.DELETE_INTERNSHIP, payload: id });
  }
}
