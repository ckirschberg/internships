export class Internship {
    _id: string;
    student: Student;
    companyName: string;
    date: string; //TODO date and datepicker in UI
    initials: string;
    customerId: string; //data in webservice is shared. This is used to only show "my" internships. (filtered on client side).
}

export class Student {
    firstname: string;
    lastname: string;

}