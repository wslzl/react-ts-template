import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "@/store/actions";

import * as wasm from "@/wasm/demo.wasm";

function Home() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => {
    return state.userReducer.userInfo || {};
  });
  const updateUser = () => {
    dispatch(updateUserInfo({ id: 1, name: "xxx" }));
    console.log(wasm.doSome(1, 4));
  };

  return (
    <div className='home'>
      <div className=''>Home {userInfo.name}</div>
      <button onClick={updateUser}>User</button>
    </div>
  );
}

export default Home;
