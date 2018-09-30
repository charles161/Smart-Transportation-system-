export default function createReducer(INITIAL_STATE, query) {
  return function (state={...INITIAL_STATE}, action) {
    if (query === action.type)
      return { response: action.payload };
      else 
      return {...state}
  };
}
