import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useState } from "react";
import axios from "axios";
import FastShopLogo from "../components/FastShopLogo";

export default function SignUpPage() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');

  function enviarInfos(e) {
    e.preventDefault();

    const obj = {
      name: name,
      email: email,
      password: senha
    }

    if (senha === confirmar) {

      const promise = axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, obj);

      promise.then(resposta => {

        alert('Você foi cadastrado com sucesso!')
        console.log(resposta.data);
        navigate("/");

      });

      promise.catch(erro => {

        console.log(erro.response.data);
        alert(erro.response.data.message || erro.response.data);

      });
    } else {
      alert("As senhas disponibilizadas não são iguais!")
    }


  }

  return (
    <SingUpContainer>
      <form onSubmit={enviarInfos}>

        <FastShopLogo />

        <Input2 placeholder="Nome" type="text" id="nome" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="E-mail" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder="Senha" type="password" autoComplete="new-password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" id="confirmar" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} required />
        <button type="submit">Cadastrar</button>

      </form>

      <Link to='/'>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color:#CCCCCC;

  button{
    width: calc(100% - 167px);
    background-color: #f87b09;
  }
`

const Input2 = styled.input`
  margin-top:250px;
`
