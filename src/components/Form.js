import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";


const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  background-color: #5C6561;
  color: #D6DEDA;
`;
 
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  
  
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  color: #5C6561;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #030404;
  color: white;
  height: 42px;
`;

const Form = ({ getLivros, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const livro = ref.current;

      livro.idlivro.value = onEdit.idlivro;
      livro.titulo.value = onEdit.titulo;
      livro.subtitulo.value = onEdit.subtitulo;
      livro.data_publicacao.value = onEdit.data_publicacao;
      
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const livro = ref.current;

    if (
      !livro.idlivro.value||
      !livro.titulo.value ||
      !livro.subtitulo.value ||
      !livro.data_publicacao.value
      
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.idlivro, {
          idlivro: livro.idlivro.value,
          titulo: livro.titulo.value,
          subtitulo: livro.subtitulo.value,
          data_publicacao: livro.data_publicacao.value,
          
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          idlivro: livro.idlivro.value,
          titulo: livro.titulo.value,
          subtitulo: livro.subtitulo.value,
          data_publicacao: livro.data_publicacao.value,
          
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    livro.idlivro.value = "";
    livro.titulo.value = "";
    livro.subtitulo.value = "";
    livro.data_publicacao.value = "";

    setOnEdit(null);
    getLivros();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
       <InputArea>
        <Label>Identificador</Label>
        <Input name="idlivro" />
      </InputArea>
      <InputArea>
        <Label>Título</Label>
        <Input name="titulo" />
      </InputArea>
      <InputArea>
        <Label>Subtítulo</Label>
        <Input name="subtitulo" type="text" />
      </InputArea>
      <InputArea>
        <Label>Data de publicação</Label>
        <Input name="data_publicacao"  type="date"/>
      </InputArea>

      <Button type="submit">REGISTRAR</Button>
    </FormContainer>
  );
};

export default Form;