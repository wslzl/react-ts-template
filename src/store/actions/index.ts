import { USER_INFO } from "../actionTypes";

export function updateUserInfo(data: object) {
  return {
    type: USER_INFO,
    data,
  };
}
