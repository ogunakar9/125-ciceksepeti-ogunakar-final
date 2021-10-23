import React, { useEffect, useState } from "react";
import "./styles.scss";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../store/actions";
import { timeout_delay } from "../../../utilities/Config";

const Notification = ({ text, icon, type }) => {
  const dispatch = useDispatch();
  const { notificationOpen } = useSelector((state) => state.main);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    const delay = setTimeout(() => {
      dispatch(setNotification(false));
    }, timeout_delay);
    setTimer(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, notificationOpen]);

  if (!notificationOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={`toaster-wrapper toaster-${type}`}>
      <img src={icon} alt="icon" />
      <span>{text}</span>
    </div>,
    document.getElementById("root")
  );
};

export default Notification;
