import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../Util/spotify";

function Callback() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  let codeVerifier = localStorage.getItem("code_verifier");

  const accessToken = localStorage.getItem('accessToken')
  const expiresAt = localStorage.getItem('expiresAt')

  useEffect(() => {
    if( accessToken && expiresAt && Date.now() < expiresAt ){
      navigate('/home')
    }
  }, [accessToken,expiresAt,navigate])


  useEffect(() => {
    getAccessToken(code, codeVerifier).then((response) => {
      if (response === 200) {
        navigate("/home");
      }
    });
  }, [code, codeVerifier, navigate]);

  return <div></div>;
}

export default Callback;
