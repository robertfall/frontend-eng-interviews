import React from 'react';
import styled from '@emotion/styled';

const HeaderDiv = styled.h1`
  width: 100%;
  text-align: center;
  line-height: 35px;
  box-shadow: #404040 0px 0px 8px;
  font-size: 1.2em;
  margin: 0;
`;

const Header = () => (
  <HeaderDiv>TodoCat</HeaderDiv>
);

export default Header;
