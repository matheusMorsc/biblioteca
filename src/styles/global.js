import { createGlobalStyle } from "styled-components";


const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
  }
  
  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #f2f2f2;
    background-image: url("https://archglassbrasil.com.br/wp-content/uploads/2020/03/Biblioteca-3-1.png");
  }
`;

export default Global;