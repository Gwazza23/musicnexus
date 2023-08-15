import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../Util/spotify";

function Callback() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  let codeVerifier = localStorage.getItem("code_verifier");

  useEffect(() => {
    getAccessToken(code, codeVerifier).then((response) => {
      if (response === 200) {
        navigate("/home/profile");
      }
    });
  }, [code, codeVerifier, navigate]);

  return <div>Callback</div>;
}

export default Callback;
