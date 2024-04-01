import { FILTER_STATUS, FILTER_SPECIES, FILTER_GENDER, ORDER } from "../actions/types";

const initialState = {
  allCharacters: [],
  filteredCharacters: [],
};

export const rootReducer = (state = initialState, action) => {
  let sortedCharacters;
  switch (action.type) {
    case FILTER_STATUS:
      return {
        ...state,
        filteredCharacters: state.allCharacters.filter(
          (char) => char.status === action.payload
        ),
      };

    case FILTER_SPECIES:
      return {
        ...state,
        filteredCharacters: state.allCharacters.filter(
          (char) => char.species === action.payload
        ),
      };

    case FILTER_GENDER:
      return {
        ...state,
        filteredCharacters: state.allCharacters.filter(
          (char) => char.gender === action.payload
        ),
      };

    case ORDER:
      if (action.payload === "A") {
        sortedCharacters = state.filteredCharacters.sort((a, b) => a.id - b.id);
      } else if (action.payload === "B") {
        sortedCharacters = state.filteredCharacters.sort((a, b) => b.id - a.id);
      }
      return {
        ...state,
        filteredCharacters: [...sortedCharacters],
      };

    default:
      return state;
  }
};
