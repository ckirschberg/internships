import {InternshipsService} from './internships.service';
import {
  Headers, BaseRequestOptions, ResponseOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod } from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { TestBed, inject, async, getTestBed } from '@angular/core/testing';

import { Internship } from './internship.entity';

describe('InternshipsService', () => {
    let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        InternshipsService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
       }
      ],
      imports: [
        HttpModule
      ]
    });
    mockBackend = getTestBed().get(MockBackend);
  }));



  it('should get internships and set services this.internships array', done => {
    let internshipsService: InternshipsService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [
                  {
                    _id: '11', 
                    initials: 'chrk', 
                    date: '2016-01-02', 
                    student: { 
                        firstname: 'Per', 
                        lastname: 'Hansen'
                    }, 
                    companyName: 'Vestas', 
                    customerId: '1' 
                  } 
                ]
              }
            )));
        });

        internshipsService = getTestBed().get(InternshipsService);
        expect(internshipsService).toBeDefined();

        internshipsService.getAllInternships().subscribe(
            (internships: Internship[]) => {
            expect(internships.length).toBeDefined();
            expect(internships.length).toEqual(1);
            expect(internships[0]._id).toEqual('11');
            expect(internshipsService.getAllLocalInternships().length).toEqual(1);
            expect(internshipsService.getAllLocalInternships()[0]._id).toEqual('11');
            done();
        });
    });

    
    });
});