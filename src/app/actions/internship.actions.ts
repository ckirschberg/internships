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

  static SET_ISFETCHING: string = 'SET_ISFETCHING';

  static RECEIVED_INTERNSHIPS_FROM_WS: string = 'RECEIVED_INTERNSHIPS_FROM_WS';
  static FAILED_GET_INTERNSHIPS_FROM_WS: string = 'FAILED_GET_INTERNSHIPS_FROM_WS';

  static HANDLE_CREATED_INTERNSHIP: string = 'HANDLE_CREATED_INTERNSHIP';
  static FAILED_CREATED_INTERNSHIP: string = 'FAILED_CREATED_INTERNSHIP';

  static HANDLE_UPDATED_INTERNSHIP: string = 'HANDLE_UPDATED_INTERNSHIP';
  static FAILED_UPDATED_INTERNSHIP: string = 'FAILED_UPDATED_INTERNSHIP';

  static GET_INTERNSHIP: string = 'GET_INTERNSHIP';  

  static HANDLE_DELETED_INTERNSHIP: string = 'HANDLE_DELETED_INTERNSHIP';
  static FAILED_DELETED_INTERNSHIP: string = 'FAILED_DELETED_INTERNSHIP';
  

  getInternship(id: string): void {
    this.ngRedux.dispatch({ type: InternshipActions.GET_INTERNSHIP, payload: id });
  }
  getInternships(): void {
    this.ngRedux.dispatch({ type: InternshipActions.SET_ISFETCHING }); //sets isFetching flag

    // Call ws through service
    this.internshipsService.getAllInternships().then( 
      (response: Response) => {
        this.ngRedux.dispatch({
          type: InternshipActions.RECEIVED_INTERNSHIPS_FROM_WS,
          payload: response
        })})
        .catch((error) => {
          this.ngRedux.dispatch({ 
            type: InternshipActions.FAILED_GET_INTERNSHIPS_FROM_WS,
            payload: error
          })}
        );   
  }
  


  createInternship(internship: Internship): void {
    this.ngRedux.dispatch({ type: InternshipActions.SET_ISFETCHING, payload: internship });
    
    this.internshipsService.saveInternship(internship).then((response: Response) => {
        this.ngRedux.dispatch({
          type: InternshipActions.HANDLE_CREATED_INTERNSHIP,
          payload: response
        })})
        .catch((error) => {
          this.ngRedux.dispatch({ 
            type: InternshipActions.FAILED_CREATED_INTERNSHIP,
            payload: error
          })}
        );
  }

  updateInternship(internship: Internship): void {
    this.ngRedux.dispatch({ type: InternshipActions.SET_ISFETCHING, payload: internship });
    
    this.internshipsService.saveInternship(internship).then((response: Response) => {
        this.ngRedux.dispatch({
          type: InternshipActions.HANDLE_UPDATED_INTERNSHIP,
          payload: internship
        })})
        .catch((error) => {
          this.ngRedux.dispatch({ 
            type: InternshipActions.FAILED_UPDATED_INTERNSHIP,
            payload: error
          })}
        );
  }

  
  deleteInternship(id: string): void {
    this.ngRedux.dispatch({ type: InternshipActions.SET_ISFETCHING });

    this.internshipsService.deleteInternship(id).then((response: Response) => {
      this.ngRedux.dispatch({
          type: InternshipActions.HANDLE_DELETED_INTERNSHIP,
          payload: { id, response }
        })})
        .catch((error) => {
          this.ngRedux.dispatch({ 
            type: InternshipActions.FAILED_DELETED_INTERNSHIP,
            payload: error
          })}
        );
  }
}
