import "./Artist.css";
import { useParams } from "react-router-dom";

function Artist() {
  const { id } = useParams();
  return <div className="artist-page-container" >{id}</div>;
}

export default Artist;
