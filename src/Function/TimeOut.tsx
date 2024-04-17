import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import Cookies from "js-cookie";

export const TimeOut = (): void => {
  const navigate = useNavigate();
  const [, setState] = useState<string>("Active");
  const [count, setCount] = useState<number>(0);
  const [, setRemaining] = useState<number>(0);

  const onIdle = async () => {
    const receiveLogoutBody = {
      rcc: Cookies.get("RCC"),
    };
    const receiveLogout = await fetch(
      `${import.meta.env.VITE_SERVER}/receive/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(receiveLogoutBody),
      }
    );
    if (receiveLogout.ok) {
      setState("Idle");
      Cookies.remove("RCC");
      Cookies.remove("RCCNow");
      Cookies.remove("USERID");
      Cookies.remove("Page");
      Cookies.remove("LevelNow");
      navigate("/");
    }
  };

  const onActive = () => {
    setState("Active");
  };

  const onAction = () => {
    setCount(count + 1);
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 5 * 60 * 1000,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  // return (
  //   <>
  //     <h1>React Idle Timer</h1>
  //     <h2>useIdleTimer</h2>
  //     <br />
  //     <p>Current State: {state}</p>
  //     <p>Action Events: {count}</p>
  //     <p>{remaining} seconds remaining</p>
  //   </>
  // );
};
