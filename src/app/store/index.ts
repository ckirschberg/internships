import { combineReducers } from 'redux';
// const persistState = require('redux-localstorage');
// import { counterReducer } from './counter.reducer';
// import { IPathDemoData, pathDemoReducer } from './path-demo.reducer';
// import { ISearchState, searchReducer } from './search.reducer';
import { Internship } from '../internship.entity';
import { counterReducer } from './counter.reducer';
import { internshipReducer } from './internship.reducer';

export class InternshipState {
    internships: Internship[];
    isFetching: boolean;
};

export class IAppState {
  counter?: number;
  internships?: InternshipState; 
//   pathDemo?: IPathDemoData;
//   search?: ISearchState;
};

export const rootReducer = combineReducers<IAppState>({
   counter: counterReducer,
   internships: internshipReducer
//   pathDemo: pathDemoReducer,
//   search: searchReducer
});

export const enhancers = [
//   persistState('counter', { key: 'ng2-redux/examples/counter' })
];

