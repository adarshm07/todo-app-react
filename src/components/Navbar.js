// import Router from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { isLoggedIn } from "../store/user";

export default function Navbar() {
  // dispatch is used to update the state
  const dispatch = useDispatch();

  // selector is used to access the state4
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!Object.keys(user.user).length) {
      redirect("/login");
    }
  }, [user]);
  return (
    <div className="row">
      <div className="container">
        <div className="user-details p-2">
          <div>
            {/* <p>{user?.user?.firstName}</p> <p>{user?.user?.lastName}</p> */}
          </div>
          <button onClick={() => dispatch(isLoggedIn({}))}>Logout</button>
        </div>
      </div>
    </div>
  );
}
