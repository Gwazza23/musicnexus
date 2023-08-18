import { useEffect } from "react";
import "./Recent.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRecentTracks, selectTracks } from "../../Slices/tracksSlice";

function Recent() {
  const dispatch = useDispatch();

  const recent = useSelector(selectTracks).data.items;
  console.log(recent);

  useEffect(() => {
    dispatch(fetchUserRecentTracks());
  }, [dispatch]);
  return <div>Recent</div>;
}

export default Recent;
