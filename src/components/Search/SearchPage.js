import { useState, useEffect } from "react";
import loadSpin from "../../SDGs.gif";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownContent,
  Error,
  Flex,
  Img,
  Input,
  Load,
} from "../Style/Styled";

const linkStyle = {
  color: "green",
  textDecoration: "none",
  fontWeight: "700",
};
const useCountry = () => {
  const [apiStatus, setApiStatus] = useState({
    data: [],
    lang: "nl",
    error: "",
    isLoading: false,
    langName: "Dutch",
  });
  const [languageOptions, setLanguageOptions] = useState([]);

  useEffect(() => {
    let controller = new AbortController();
    async function getLanguageOptions() {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/all`, {
          signal: controller.signal,
        });
        const countries = await response.json();

        //[{name: "English", code: "eng"}, {name: "Spanish", code: "es"}]
        //{eng: "English", es: "Spanish"}
        let countryOptions = {};
        for (const country of countries) {
          // Object.assign(countryOptions, country.languages);
          countryOptions = { ...countryOptions, ...country.languages };
        }

        setLanguageOptions(countryOptions);
      } catch (error) {
        if (error) {
          console.log("ERROR", error.name);
        }
      }
    }
    getLanguageOptions();
  }, []);

  useEffect(() => {
    let controller = new AbortController();

    async function getCountryData() {
      setApiStatus((prevStatus) => {
        return { ...prevStatus, isLoading: true, error: "" };
      });

      try {
        const response = await fetch(
          `https://deelay.me/2000/https://restcountries.com/v2/lang/${apiStatus.lang}`,
          {
            signal: controller.signal,
          }
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
            return {
              ...prevStatus,
              data: langData,
              error: "",
              isLoading: false,
            };
          });
          return;
        }
      } catch (error) {
        console.log("ERROR", error.name);
        //handle operation errors
        // controller.abort();
      }
    }
    getCountryData();

    return () => {
      controller.abort();
      console.log("CLEAN UP TIME!");
    };
  }, [apiStatus.lang]);

  const debounceHandler = debounce((e) => {
    if (e.target.value === "") {
      return setApiStatus((prevStatus) => {
        return {
          ...prevStatus,
          data: [],
          error: "Please, enter valid language)",
          isLoading: false,
          langName: "",
        };
      });
    }
    const languageCode = Object.entries(languageOptions).find((langOption) => {
      if (langOption[1].includes(e.target.value)) {
        return true;
      } else {
        return false;
      }
    });
    console.log("E.TARGET", e.target.value);
    if (languageCode === undefined) {
      setApiStatus((prevStatus) => {
        return {
          ...prevStatus,
          data: [],
          error: "This language could not be found",
          langName: "",
        };
      });
      return;
    }

    console.log("LANGUAGE CODE", languageCode[0]);
    setApiStatus((prevStatus) => {
      return {
        ...prevStatus,
        lang: languageCode[0],
        langName: languageCode[1],
      };
    });
  }, 500);

  return [apiStatus, debounceHandler, languageOptions];
};

function SearchPage() {
  const [apiStatus, debounceHandler, languageOptions] = useCountry();

  return (
    <div className="main">
      <Dropdown>
        <DropdownContent>
          <label htmlFor="language">Enter what you are looking for</label>
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
      <p>Searching for countries with language {apiStatus.langName}</p>
      <div>
        {apiStatus.isLoading ? (
          <Load src={loadSpin} alt="loadSpin" />
        ) : (
          apiStatus.data.map((el) => {
            return (
              <Flex key={el.id}>
                <Link style={linkStyle} to={el.name}>
                  <p>{el.name}</p>
                </Link>
                <Img src={el.flag} alt="flag" />
              </Flex>
            );
          })
        )}
      </div>
    </div>
  );
}

export default SearchPage;
