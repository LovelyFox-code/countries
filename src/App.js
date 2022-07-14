import "./App.css";
import { useState, useEffect } from "react";
import styled from "styled-components";
import loadSpin from "./SDGs.gif";
import { iso6392 } from "iso-639-2";

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
  height: 220px;
  margin-top: 10%;
`;
const DropdownContent = styled.ul`
  min-width: 160px;
  z-index: 1;
  padding: initial;
`;
const Item = styled.li`
  list-style-type: none;
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
const Btn = styled.button`
  width: 200px;
  padding: 10px 24px;
  color: green;
  font-weight: 700;
  font-size: 18px;
  border: 2px solid green;
  border-radius: 18px;
`;
const Load = styled.img`
  position: absolute;
  top: 10%;
  left: 22%;
`;
function App() {
  console.log(iso6392, "ISO");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [lang, setLang] = useState("es");
  const langsOptions = [
    {
      language: "Dutch",
      code: "nl",
    },
    {
      language: "English",
      code: "eng",
    },
    {
      language: "Espanol",
      code: "es",
    },
  ];

  function toggle() {
    setShow((wasOpened) => !wasOpened);
  }
  useEffect(() => {
    setData([]);
    async function getCountryData() {
      const response = await fetch(
        `https://deelay.me/2000/https://restcountries.com/v2/lang/${lang}`
      );
      const langData = await response.json();
      setData(langData);
      // setLang(langData);
    }
    getCountryData();
    // document.addEventListener("onClick", async () => {
    //   try {
    //   } catch (e) {
    //     console.log("Error");
    //   }
    // });
  }, [lang]);
  console.log("DATA", data);
  return (
    <div className="App">
      <div className="main">
        <Dropdown>
          <Btn onClick={toggle}>Language</Btn>
          {show && (
            <DropdownContent>
              <label for="language">Enter what you are looking for</label>
              <input type="text" name="language" list="languageList" />
              <datalist id="languageList">
                {iso6392.map((langOption) => {
                  return (
                    <option
                      // value={langOption.iso6392B}
                      onClick={() => setLang(langOption.iso6392B)}
                    >
                      {langOption.name}
                    </option>
                  );
                })}
              </datalist>
            </DropdownContent>
          )}
        </Dropdown>
        <div>
          {data.length === 0 ? (
            <Load src={loadSpin} alt="loadSpin" />
          ) : (
            data.map((el) => {
              return (
                <Flex key={el.id}>
                  <p>{el.name}</p>
                  <Img src={el.flag} alt="flag" />
                </Flex>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
