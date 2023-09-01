import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import { setAccessToken } from "../../Slices/tokenSlice";
import { useNavigate } from "react-router-dom";

function Callback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const urlFragment = window.location.hash;
  const params = new URLSearchParams(urlFragment.substring(1));
  const accessToken = params.get("access_token");

  useEffect(() => {
    if (accessToken) {
      dispatch(setAccessToken(accessToken));
    }
  }, [dispatch, accessToken]);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Go To Home
      </button>
    </div>
  );
}

export default Callback;
