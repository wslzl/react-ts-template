import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "@/store/actions";

import * as wasm from "@/wasm/demo.wasm";

import "./style.scss";

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
      <video
        src='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
        autoPlay={true}
        controls
      ></video>
      <p spellCheck={true} hidden>
        I have a applee
      </p>
      <input type='text' name='name' id='name' autoFocus={true} />
      <div className="resize">xxx</div>
    </div>
  );
}

export default Home;
