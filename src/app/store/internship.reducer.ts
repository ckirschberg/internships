import { InternshipActions } from '../actions/internship.actions';
import { Internship } from '../internship.entity';
import { InternshipState } from '../store';

const INITIAL_STATE: any = {
      internships: [],
      isFetching: false
    };

function find(id: string, state: Internship[]): number {
    for(let i=0; i < state.length; i++) {
        if (state[i]._id === id) {
            return i;
        }
    }
    return -1;
}

export function internshipReducer(state: InternshipState = INITIAL_STATE, action:any) {
  switch (action.type) {
    case InternshipActions.GET_INTERNSHIPS_FROM_WS: //no action.payload
      // Eg. set a spinner-variable to true. We are retrieving data, please wait...
      return Object.assign({}, state, { isFetching: true })
      
    case InternshipActions.RECEIVED_INTERNSHIPS_FROM_WS:
      // console.log("received");
      // console.log(action.payload.json());
      let myInternships = action.payload.json().filter(item => item.customerId === '1');
      return { isFetching: false, internships: state.internships.concat(myInternships) } as InternshipState;

    case InternshipActions.FAILED_GET_INTERNSHIPS_FROM_WS:
      return { isFetching: false, internships: []};

    case InternshipActions.GET_INTERNSHIP: // action.payload is id
      // let internship = Object.assign({}, state[find(action.payload, state.internships)]); // Find index by id, look up position in array
      //deep copy internship.


    // case InternshipActions.SAVE_INTERNSHIP: // action.payload is Internship
    //   // call a web service here?
    //   return [...state.internships, action.payload];
    // case InternshipActions.DELETE_INTERNSHIP: // action.payload is number (id of internship to delete)
    //   // call a web service here?
    //   let index = find(action.payload, state.internships);
    //   return [...state.internships.slice(0,index),
    //           ...state.internships.slice(index+1)];

    default:
      return state;
  }
}
