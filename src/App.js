import "./App.css";
import { useState, useEffect } from "react";
import styled from "styled-components";
import loadSpin from "./SDGs.gif";
import debounce from "lodash.debounce";

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
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
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
const useCountry = () => {
  const [apiStatus, setApiStatus] = useState({
    data: [],
    lang: "nl",
    error: "",
    isLoading: false,
  });
  const [languageOptions, setLanguageOptions] = useState([]);

  useEffect(() => {
    async function getLanguageOptions() {
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const countries = await response.json();
      //[{name: "English", code: "eng"}, {name: "Spanish", code: "es"}]
      //{eng: "English", es: "Spanish"}
      let countryOptions = {};
      for (const country of countries) {
        // Object.assign(countryOptions, country.languages);
        countryOptions = { ...countryOptions, ...country.languages };
      }
      setLanguageOptions(countryOptions);
    }
    getLanguageOptions();
  }, []);

  useEffect(() => {
    async function getCountryData() {
      setApiStatus((prevStatus) => {
        return { ...prevStatus, isLoading: true };
      });
      const response = await fetch(
        `https://deelay.me/2000/https://restcountries.com/v2/lang/${apiStatus.lang}`
      );
      const langData = await response.json();
      if (response.status === 404) {
        setApiStatus((prevStatus) => {
          return {
            ...prevStatus,
            data: [],
            error: "Not found",
            isLoading: false,
          };
        });
        //no results. we can stop!
        return;
      }
      if (response.status === 200) {
        setApiStatus((prevStatus) => {
          return { ...prevStatus, data: langData, error: "", isLoading: false };
        });
        return;
      }
    }
    getCountryData();
  }, [apiStatus.lang]);

  const debounceHandler = debounce((e) => {
    console.log("ELEMENT", e.target.value);
    console.log("languageOptions", languageOptions);
    const languageCode = Object.entries(languageOptions).find((langOption) => {
      if (langOption[1].includes(e.target.value)) {
        return true;
      } else {
        return false;
      }
    });
    if (languageCode === undefined) {
      setApiStatus((prevStatus) => {
        return {
          ...prevStatus,
          data: [],
          error: "This language could not be found",
        };
      });
      return;
    }

    console.log("LANGUAGE CODE", languageCode[0]);
    setApiStatus((prevStatus) => {
      return { ...prevStatus, lang: languageCode[0] };
    });
  }, 500);

  return [apiStatus, debounceHandler, languageOptions];
};

function App() {
  const [apiStatus, debounceHandler, languageOptions] = useCountry();

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
              onChange={debounceHandler}
            />
            <datalist id="languageList">
              {Object.entries(languageOptions).map((langOption) => {
                return <option>{langOption[1]}</option>;
              })}
            </datalist>
          </DropdownContent>
        </Dropdown>
        <Error>{apiStatus.error}</Error>
        <div>
          {apiStatus.isLoading ? (
            <Load src={loadSpin} alt="loadSpin" />
          ) : (
            apiStatus.data.map((el) => {
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
