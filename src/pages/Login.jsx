import { useState } from "react";
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import FastShopLogo from "../components/FastShopLogo";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function enviarInfos(e) {
    e.preventDefault();

    const obj = {
      email: email,
      password: senha
    }

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/`, obj);

    promise.then(resposta => {
      localStorage.setItem("token", resposta.data.token);
      console.log(localStorage.getItem("token"))
      localStorage.setItem("user", resposta.data.nome);

      console.log(resposta.data, "lista");
      navigate("/catalogo");

    });

    promise.catch(erro => {

      alert('Usuário e/ou senha inválidos!');
      console.log(erro.response.data);
    });

  }

  return (
    <SingInContainer>

      <form onSubmit={enviarInfos}>

        <FastShopLogo />

        <Input1 data-test="email" placeholder="E-mail" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input data-test="password" placeholder="Senha" type="password" autoComplete="new-password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button data-test="sign-in-submit" type="submit">Entrar</button>

      </form>

      <Link to='/cadastro'>
        Primeira vez? Cadastre-se!
      </Link>

    </SingInContainer>
  )
}

const SingInContainer = styled.section`
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

const Input1 = styled.input`
  margin-top:250px;
`
