import "./App.css";
import { useState, useEffect } from "react";
import styled from "styled-components";
import loadSpin from "./SDGs.gif";
import { iso6392 } from "iso-639-2";

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 10%;
`;
const DropdownContent = styled.ul`
  min-width: 160px;
  z-index: 1;
  padding: initial;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 200px;
`;
const Flex = styled.div`
  display: flex;
  width: 600px;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  border: 2px solid green;
  padding: 10px 24px;
  border-radius: 18px;
`;
const Load = styled.img`
  position: absolute;
  top: 10%;
  left: 22%;
`;
const Input = styled.input`
  width: 200px;
  padding: 10px 24px;
  color: green;
  font-weight: 700;
  font-size: 18px;
  border: 2px solid green;
  border-radius: 12px;
  outline: none;
  margin-left: 30px;
`;
const Error = styled.h1`
  color: red;
`;
function App() {
  // const [data, setData] = useState([]);
  // const [lang, setLang] = useState("nl");
  // const [error, setError] = useState("");
  const [apiStatus, setApiStatus] = useState({
    data: [],
    lang: "nl",
    error: "",
  });
  useEffect(() => {
    async function getCountryData() {
      const response = await fetch(
        `https://deelay.me/2000/https://restcountries.com/v2/lang/${apiStatus.lang}`
      );
      const langData = await response.json();
      if (response.status === 404) {
        setApiStatus((prevStatus) => {
          return { ...prevStatus, data: [], error: "Not found" };
        });
        return;
      }
      if (response.status === 200) {
        setApiStatus((prevStatus) => {
          return { ...prevStatus, data: [langData] };
        });
      }
      setApiStatus((prevStatus) => {
        return { ...prevStatus, error: "" };
      });
      console.log("RESPONSE", response);
    }
    getCountryData();
  }, [apiStatus.lang]);

  return (
    <div className="App">
      <div className="main">
        <Dropdown>
          <DropdownContent>
            <label for="language">Enter what you are looking for</label>
            <Input
              type="text"
              name="language"
              list="languageList"
              onChange={(e) => {
                const languageCode = iso6392.find(
                  (langOption) => langOption.name === e.target.value
                );
                setApiStatus((prevStatus) => {
                  return { ...prevStatus, lang: [languageCode.iso6392B] };
                });
              }}
            />
            <datalist id="languageList">
              {iso6392.map((langOption) => {
                return <option>{langOption.name}</option>;
              })}
            </datalist>
          </DropdownContent>
        </Dropdown>
        <Error>{apiStatus.error}</Error>
        <div>
          {apiStatus.data.length === 0 && apiStatus.error === "" ? (
            <Load src={loadSpin} alt="loadSpin" />
          ) : (
            apiStatus.data.map((el) => {
              console.log("apiStatus.data", apiStatus.data);
              return el.map((item) => {
                return (
                  <Flex key={item.id}>
                    <p>{item.name}</p>
                    <Img src={item.flag} alt="flag" />
                  </Flex>
                );
              });
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
