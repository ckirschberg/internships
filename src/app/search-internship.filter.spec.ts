/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FilterInternships } from './search-internship.filter';
import { Internship } from './internship.entity';


describe('App: Internships', () => {
  beforeEach(() => {
    this.internships = [
        {_id: '11', initials: 'chrk', date: '2016-01-02', student: { firstname: 'Per', lastname: 'Hansen'}, companyName: 'Vestas', customerId: '1' },
        {_id: '12', initials: 'asbc', date: '2016-01-02', student: { firstname: 'Hans', lastname: 'Petersen'}, companyName: 'Fronter', customerId: '1' },
        {_id: '13', initials: 'clbo', date: '2016-01-02', student: { firstname: 'Helle', lastname: 'Jensen'}, companyName: 'KLM', customerId: '1' },
        {_id: '14', initials: 'cahl', date: '2016-01-02', student: { firstname: 'Berit', lastname: 'Hellesen'}, companyName: 'Bla bla IT', customerId: '1' },
        {_id: '15', initials: 'laco', date: '2016-01-02', student: { firstname: 'Jens', lastname: 'Persen'}, companyName: 'Fakta', customerId: '1' },
        {_id: '16', initials: 'chrk', date: '2016-01-02', student: { firstname: 'Per', lastname: 'Hansen'}, companyName: 'Google', customerId: '1' },
        {_id: '17', initials: 'asbc', date: '2016-01-02', student: { firstname: 'Hans', lastname: 'Petersen'}, companyName: 'Facebook', customerId: '1' },
        {_id: '18', initials: 'clbo', date: '2016-01-02', student: { firstname: 'Helle', lastname: 'Jensen'}, companyName: 'Microsoft', customerId: '1' },
        {_id: '19', initials: 'cahl', date: '2016-01-02', student: { firstname: 'Berit', lastname: 'Hellesen'}, companyName: 'DocIt', customerId: '1' },
        {_id: '20', initials: 'laco', date: '2016-01-02', student: { firstname: 'Jens', lastname: 'Persen'}, companyName: 'McAfee', customerId: '1' },
    ];
    TestBed.configureTestingModule({
      declarations: [
        FilterInternships
      ],
    });
  });

    describe('FilterInternships', () => {
        let pipe = new FilterInternships();
        it('No search string returns input', () => {
            let result = pipe.transform(this.internships, '');
            expect(result.length).toBe(10);
        });

        it('Empty array returns empty array', () => {
            let result = pipe.transform([], 'Hi');
            expect(result.length).toBe(0);
        });

        // Search on company name
        it('Partial match on company name', () => {
            let result = pipe.transform(this.internships, 'Vesta');
            expect(result.length).toBe(1);
        });
        it('Exact match on company name', () => {
            let result = pipe.transform(this.internships, 'Vestas');
            expect(result.length).toBe(1);
        });
        it('Exact match on company name - case insensitive', () => {
            let result = pipe.transform(this.internships, 'vestAs');
            expect(result.length).toBe(1);
            expect(result[0]).not.toBe(-1);
        });
        it('No match on company name', () => {
            let result = pipe.transform(this.internships, 'vestAsqwer');
            expect(result.length).toBe(1);
            expect(result[0]).toBe(-1);
        });

        // Search on student firstname
        it('Partial match on students firstname', () => {
            let result = pipe.transform(this.internships, 'Beri');
            expect(result.length).toBe(2);
        });
        it('Exact match on students firstname', () => {
            let result = pipe.transform(this.internships, 'Berit');
            expect(result.length).toBe(2);
        });
        it('Exact match on students firstname - test case insensitive', () => {
            let result = pipe.transform(this.internships, 'beRit');
            expect(result.length).toBe(2);
        });

        // Search on student lastname
        it('Partial match on students lastname', () => {
            let result = pipe.transform(this.internships, 'Hanse');
            expect(result.length).toBe(2);
        });
        it('Exact match on students lastname', () => {
            let result = pipe.transform(this.internships, 'Hansen');
            expect(result.length).toBe(2);
        });
        it('No match on students lastname', () => {
            let result = pipe.transform(this.internships, 'Hansenasdf');
            expect(result.length).toBe(1);
            expect(result[0]).toBe(-1);
        });

        // Search on initials
        it('Partial match on initials', () => {
            let result = pipe.transform(this.internships, 'ch');
            expect(result.length).toBe(2);
        });
        it('Exact match on initials', () => {
            let result = pipe.transform(this.internships, 'laco');
            expect(result.length).toBe(2);
        });
        it('No match on initials', () => {
            let result = pipe.transform(this.internships, 'cahla');
            expect(result.length).toBe(1);
            expect(result[0]).toBe(-1);
        });
    });
});
