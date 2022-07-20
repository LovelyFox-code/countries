import { React, useEffect, useState } from "react";
import { CenteredDiv, H1 } from "../Style/Styled";
import { useParams } from "react-router-dom";

export default function CountryInfo(props) {
  const params = useParams();
  console.log("params", params.countryName);
  const [country, setCountry] = useState({
    name: "",
    population: "",
    capital: "",
    image: "",
  });

  useEffect(() => {
    async function getCountryName() {
      console.log("NAME", country.name);
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${params.countryName}`
      );
      console.log("response", response);
      const nameData = await response.json();
      console.log("nameData", nameData[0]);

      setCountry((prevState) => {
        return {
          ...prevState,
          name: nameData[0].name.common,
          capital: nameData[0].capital,
          population: nameData[0].population,
          image: nameData[0].flags.png,
        };
      });
    }
    console.log("countryName", country.name);
    getCountryName();
    return () => {};
  }, []);

  return (
    <CenteredDiv>
      <H1>{country.name}</H1>
      <img src={country.image} alt="flag"></img>
      <p>population of {country.population} people</p>
      <p>capital is {country.capital}</p>
    </CenteredDiv>
  );
}
