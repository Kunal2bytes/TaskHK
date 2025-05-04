const initialState = {
  products: [],
  AddCard: [],
  AddWishlist: [],
  UserList:[],
};

const cardreducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CARD":
      return { ...state, products: action.payload };
    case "GET_CARD_COUNT":
      return { ...state, AddCard: action.payload };
    case "GET_WISHLIST_COUNT":
      return { ...state, AddWishlist: action.payload };
//  case "ALL_USER_LIST":
//   return {...state, UserList:action.payload}
  case "ALL_USER_LIST":
    return { ...state, UserList: [...state.UserList, action.payload] };//apend new user 
  
    default:
      return { ...state };
  }
};

export const selectTaxdata = (state) => state.cardreducer.products;
export const selectCartData = (state) => state.cardreducer.AddCard;
export const selectWishlist=(state)=>state.cardreducer.AddWishlist;
export const getUserList=(state)=>state.cardreducer.UserList;

export default cardreducer;
