import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Internship} from './internship.entity';
@Pipe({
  name: 'filterInternships'
})
@Injectable()
export class FilterInternships implements PipeTransform {
  transform(items: Internship[], args: string): any {
    if (args && items.length > 0) {
      let itemsFound = items.filter(
        item => item.student.firstname.toLowerCase().includes(args.toLowerCase())
        || item.student.lastname.toLowerCase().includes(args.toLowerCase())
        || item.companyName.toLowerCase().includes(args.toLowerCase())
        || item.initials.toLowerCase().includes(args.toLowerCase()));

      if (itemsFound && itemsFound.length > 0 ){
        return itemsFound;
      }
      return [-1]; // to display error message (none found) in view.
    }
    return items;
  }
}
