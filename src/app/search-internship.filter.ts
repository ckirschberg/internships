import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterInternships'
})
@Injectable()
export class FilterInternships implements PipeTransform {
    transform(items: any[], args: any[]): any {
        if (args) {
            let itemsFound = items.filter(item => item.student.firstname.includes(args) 
            || item.student.lastname.includes(args)
            || item.company.includes(args)
            || item.initials.includes(args));

            if ( itemsFound && itemsFound.length > 0 ){
                return itemsFound;
            }
            else {
                return [-1]; //to display error message (none found) in view.
            }
        }
        return items;
    }
}