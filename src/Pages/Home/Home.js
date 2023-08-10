import { useEffect } from "react";
import "./Home.css";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../Slices/userSlice";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return <div>Home</div>;
}

export default Home;
