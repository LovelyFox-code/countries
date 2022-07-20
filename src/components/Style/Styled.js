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
  align-items: center;
`;

export const ImgLanding = styled.img`
  width: 222px;
  margin-top: 10%;
`;
export const Img = styled.img`
  width: 200px;
`;
export const Flex = styled.div`
  display: flex;
  width: 600px;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  border: 2px solid green;
  padding: 10px 24px;
  border-radius: 18px;
`;
export const CenteredDiv = styled.div`
  width: 80%;
  text-align: center;
  margin: auto;
`;
export const Load = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;
export const Input = styled.input`
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
export const Error = styled.h1`
  color: red;
`;
export const H1 = styled.h1`
  color: green;
  font-weight: 700;
`;
