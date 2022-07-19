import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "@/store/actions";

import * as wasm from "@/wasm/demo.wasm";
import { getIpDetails } from "@/api/test";

import "./style.scss";

function Home() {
  const [val, setVal] = useState(0);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => {
    return state.userReducer.userInfo || {};
  });
  const updateUser = () => {
    dispatch(updateUserInfo({ id: 1, name: "xxx" }));
    console.log(wasm.doSome(1, 4));
    getIpDetails({ x: 1, y: 2 }).then((res) => {
      console.log(res);
    });
  };
  useEffect(() => {
    const time = setInterval(() => {
      setVal(val + 1);
    }, 1000);
    return () => {
      clearInterval(time);
    };
  });

  return (
    <div className='home'>
      <div className=''>Home {userInfo.name}</div>
      <button onClick={updateUser}>User</button>
      <div>{val}</div>
    </div>
  );
}

export default Home;
