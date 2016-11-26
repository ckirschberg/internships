import { combineReducers } from 'redux';
// const persistState = require('redux-localstorage');
// import { counterReducer } from './counter.reducer';
// import { IPathDemoData, pathDemoReducer } from './path-demo.reducer';
// import { ISearchState, searchReducer } from './search.reducer';
import { Internship } from '../internship.entity';
import { internshipReducer } from './internship.reducer';
import { routerReducer } from 'ng2-redux-router';

export class InternshipState {
    internships: Internship[];
    selectedInternship: Internship;
    isFetching: boolean;
    message: string;
};

export class IAppState {
  counter?: number;
  internships?: InternshipState; 
//   pathDemo?: IPathDemoData;
//   search?: ISearchState;
};

export const rootReducer = combineReducers<IAppState>({
   internships: internshipReducer,
//   pathDemo: pathDemoReducer,
//   search: searchReducer

   router: routerReducer
});

export const enhancers = [
//   persistState('counter', { key: 'ng2-redux/examples/counter' })
];

