import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  
`;

const Title = styled.h2`
color: white;
`;

function App() {
  const [livros, setLivros] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getLivros = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setLivros(res.data.sort((a, b) => (a.titulo > b.titulo ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getLivros();
  }, [setLivros]);

  return (
    <>
      <Container>
        <Title>LIVROS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getLivros={getLivros} />
        <Grid setOnEdit={setOnEdit} livros={livros} setLivros={setLivros} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;