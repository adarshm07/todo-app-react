import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      return navigate("/");
    }
  }, [navigate]);

  return (
    <div className="row">
      <div className="container">
        <div className="user-details p-2">
          <div></div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              return navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
