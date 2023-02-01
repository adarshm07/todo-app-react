import Router from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../store/user";

export default function Navbar() {
  // dispatch is used to update the state
  const dispatch = useDispatch();

  // selector is used to access the state4
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!Object.keys(user.user).length) {
      Router.push("/login");
    }
  }, [user]);
  return (
    <div>
      <div className="user-details">
        <div>
          <p>{user?.user?.firstName}</p> <p>{user?.user?.lastName}</p>
        </div>
        <button onClick={() => dispatch(isLoggedIn({}))}>Logout</button>
      </div>
    </div>
  );
}
