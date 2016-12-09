import { InternshipActions } from '../actions/internship.actions';
import { Internship } from '../internship.entity';
import { InternshipState } from '../store';

const INITIAL_STATE: any = {
      internships: [],
      isFetching: false,
      message: '',
      selectedInternship: { student: {}}
    };

function find(id: string, state: Internship[]): number {
    for(let i=0; i < state.length; i++) {
        if (state[i]._id === id) {
          // console.log(i);
            return i;
        }
    }
    // console.log(state);
    return -1;
}

export function internshipReducer(state: InternshipState = INITIAL_STATE, action:any) {
  switch (action.type) {
    case InternshipActions.SET_ISFETCHING:
      return Object.assign({}, state, { isFetching: true })
      
    case InternshipActions.RECEIVED_INTERNSHIPS_FROM_WS:
      let myInternships = action.payload.json().filter(item => item.customerId === '1');
      return Object.assign({}, state, { isFetching: false, internships: state.internships.concat(myInternships) })

    case InternshipActions.GET_INTERNSHIP: // action.payload is id
      let index = find(action.payload, state.internships);
      let internship: Internship;
      if (index === -1) {
        internship = { student: {}} as Internship;
      } else {
        internship = Object.assign({}, state.internships[index]); // Find index by id, look up position in array
      }
      return Object.assign({}, state, {selectedInternship: internship});
      //deep copy internship.




    case InternshipActions.HANDLE_CREATED_INTERNSHIP: // action.payload is id but should be Internship
      return Object.assign({}, state, { isFetching: false, internships: [...state.internships, action.payload.json()] }) 
      
    case InternshipActions.HANDLE_DELETED_INTERNSHIP:  //action.payload has index?
      let internships = state.internships.filter(internship => internship._id !== action.payload.id);
      return Object.assign({}, state, { isFetching: false, internships: internships });

    case InternshipActions.HANDLE_UPDATED_INTERNSHIP:
      let updateIndex = find(action.payload._id, state.internships);
      let updatedInternships = [...state.internships.slice(0, updateIndex),
                                action.payload,
                                ...state.internships.slice(updateIndex + 1)]; 
      return Object.assign({}, state, { isFetching: false, internships: updatedInternships }); 
      





    case InternshipActions.FAILED_GET_INTERNSHIPS_FROM_WS:
      return Object.assign({}, state, { isFetching: false, 
        message: "There was an error retrieving data from the server. Try re-loading your browser." })

    case InternshipActions.FAILED_CREATED_INTERNSHIP:
      return Object.assign({}, state, { isFetching: false, 
        message: "There was an error saving the internship to the server. Please try again." })

    case InternshipActions.FAILED_DELETED_INTERNSHIP:
      return Object.assign({}, state, { isFetching: false, 
        message: "There was an error deleting the internship from the server. Please try again." })

    case InternshipActions.FAILED_UPDATED_INTERNSHIP:
      return Object.assign({}, state, { isFetching: false, 
        message: "There was an error saving the internship to the server. Please try again." })

    default:
      return state;
  }
}
