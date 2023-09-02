import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../Slices/tokenSlice";
import { useNavigate } from "react-router-dom";
import "./Callback.css";

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
    <div className="callback-container">
      <div className="privacy-policy">
        <p>
          Music nexus collects your spotify account data to provide an analysis
          of your account.
        </p>
        <br />
        <ul>
          <li>
            The information from your spotify account is solely used to provide
            analyisis for your account.
          </li>
          <li>
            The information from your spotify account is not shared with any
            third-party.
          </li>
          <li>
            The information from your spotify account is not stored on any
            database or file pertaining to music nexus.
          </li>
        </ul>
      </div>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Music Nexus
      </button>
    </div>
  );
}

export default Callback;
