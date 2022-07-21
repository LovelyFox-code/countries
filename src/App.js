import { Link } from "react-router-dom";
import "./App.css";
import { H1, ImgLanding } from "./components/Style/Styled";
import globe from "./world_flags_globe_2.gif";
import map from "./map-what.gif";
const btn = {
  backgroundColor: "#1ab0f2",
  color: "white",
  padding: "12px 24px",
  textDecoration: "none",
  fontWeight: "700",
  fontSize: "18px",
  borderRadius: "12px",
  margin: "10%",
  fontFamily: "Edu VIC WA NT Beginner",
};

function App() {
  return (
    <div className="App">
      <H1>countries by spoken languages</H1>
      <p>
        {" "}
        Here you can find countries by the languages which are spoken there.
      </p>
      <ImgLanding src={map} />
      <Link style={btn} to="/search">
        Start exploring!
      </Link>
    </div>
  );
}

export default App;
