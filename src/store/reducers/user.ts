import { USER_INFO } from "../actionTypes";

const initState = {
  userInfo: {},
};

const userReducer = (state: object = initState, action: any) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        userInfo: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
