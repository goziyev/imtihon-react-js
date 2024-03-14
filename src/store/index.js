import { createStore } from "redux";

const defaulState = {
  cart: 0,
};
function cardReducer(state = defaulState, actions) {
  switch (actions.type) {
    case "ADD":
      return { ...state, cart: Number(state.cart) + Number(actions.payload)};
    case "DEC":
      return { ...state, cart: Number(actions.payload)};
    case "REMOVE":
      return { ...state, cart: Number(state.cart) - Number(actions.payload)};
    default:
    return state
      
  }
}

export const store = createStore(cardReducer);
