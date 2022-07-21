import styled from "styled-components";

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 10%;
`;
export const DropdownContent = styled.ul`
  min-width: 160px;
  z-index: 1;
  padding: initial;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Edu VIC WA NT Beginner", cursive;
`;

export const ImgLanding = styled.img`
  width: 222px;
  margin-top: 3%;
`;
export const Img = styled.img`
  width: 200px;
  @media (max-width: 768px) {
    width: 100px;
  }
`;
export const Flex = styled.div`
  display: flex;
  max-width: 600px;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  border: 2px solid #1ab0f2;
  padding: 10px 24px;
  border-radius: 18px;
  @media (max-width: 768px) {
    width: 240px;
  }
`;
export const CenteredDiv = styled.div`
  width: 80%;
  text-align: center;
  margin: auto;
`;
export const Load = styled.img`
  margin: auto;
  max-width: 600px;
`;
export const Input = styled.input`
  width: 200px;
  padding: 10px 24px;
  color: #1ab0f2;
  font-weight: 700;
  font-size: 18px;
  border: 2px solid #1ab0f2;
  border-radius: 12px;
  outline: none;
  margin-top: 10%;
`;
export const Error = styled.h1`
  color: red;
  font-family: "Edu VIC WA NT Beginner", cursive;
`;
export const H1 = styled.h1`
  color: #1ab0f2;
  font-weight: 700;
  font-family: "Edu VIC WA NT Beginner";
`;
