import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cabeçalho from "../components/Cabeçalho";
import { LoginContext } from "../contexts/LoginContext";

export default function Item() {

  const navigate = useNavigate();

  const { isLoged,carrinho, setCarrinho,produto, setProduto } = useContext(LoginContext);

  const {id} = useParams();

  console.log(produto, "aqui");
  
  let [quantidade, setQuantidade] = useState(0);

  function menosQuant(){

    const novaQuantidade = quantidade - 1;

    if(novaQuantidade >= 0)setQuantidade(novaQuantidade);

  }
  function maisQuant(){

    const novaQuantidade = quantidade + 1;

    setQuantidade(novaQuantidade);

  }

  function addCart(){

    const obj = {
      categoria: carrinho.categoria,
      description: carrinho.description,
      nome: carrinho.nome,
      url: carrinho.url,
      valor:carrinho.valor,
      quantidade: quantidade
    }

      const promise = axios.post(`${import.meta.env.VITE_API_URL}/carrinho`, obj);
  
      promise.then(resposta => {
  
        alert('Esse produto foi adicionado em seu carrinho com sucesso!')
        console.log(resposta.data);
        navigate("/catalogo");
  
      });
  
      promise.catch(erro => {
      
        console.log(erro.response.data);
        alert(erro.response.data.message || erro.response.data);
  
      });
  }

  useEffect(() => {
    isLoged();
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/produtos/${id}`);
    promise.then((resposta) => {
      setProduto([resposta.data]);
      setCarrinho(resposta.data);

    })

    promise.catch((erro) => console.log(erro.response.data))
  
  },[])

  return (
    <SCItemPag>
      <Cabeçalho />

      {produto?.map((produto) => (
      <SCItemContainer  key={produto._id}>
        <img src={produto.url}/>
        <SCItemMenu>
          <SCNomeItem>{produto.nome}</SCNomeItem>
          <SCDescItem>{produto.description}</SCDescItem>
          <SCValorQuantContainer>
            <SCValorItem>R$ {produto.valor.replace(".",",")}</SCValorItem>
            <SCQuantidadeContainer>
              <SCQuantButton onClick={menosQuant}>-</SCQuantButton> {quantidade} <SCQuantButton onClick={maisQuant}>+</SCQuantButton>
            </SCQuantidadeContainer>
          </SCValorQuantContainer>
          <SCFinalizarContainer>
          <SCFinalizarButton onClick={() => addCart()}>Adicionar ao carrinho</SCFinalizarButton>
            <SCFinalizarButton onClick={()=>{
              navigate("/catalogo")
             }}>Voltar</SCFinalizarButton>
          </SCFinalizarContainer>
        </SCItemMenu>
      </SCItemContainer>
      )
      )}
    </SCItemPag>
  )
}

const SCItemPag = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  padding-top: 145px;
  width: 100%;
  height:100%;
`
const SCItemContainer = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:top;
  width:90%;
  height:90%;
  background-color:rgba(90, 90, 90, 0.103);
  box-sizing:border-box;
  padding:15px;
  border-radius:15px;
  img{
    width:45%;
    border-radius:15px;
  }
`
const SCItemMenu = styled.div`
  width:45%;
  height:100%;
  padding: 10px;
  display:flex;
  flex-direction:column;
  gap:50px;
`
const SCNomeItem = styled.p`
  font-weight:700;
  font-size:40px;
  color:black;
`
const SCDescItem = styled.p`
  font-size:30px;
  color:rgb(75, 75, 75);
`
const SCValorItem = styled.p`
  font-size:35px;
  font-weight:400;
  color:gray;
`
const SCValorQuantContainer = styled.div`
  width:auto;
  height:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding-right:100px;
`
const SCQuantidadeContainer = styled.div`
  width:auto;
  height:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  color: gray;
  font-size:40px;
  gap:5px;
`
const SCQuantButton = styled.button`
  display:flex;
  width:40px;
  height:40px;
  align-items:center;
  justify-content:center;
  background-color:#f87b09;
`
const SCFinalizarContainer = styled.div`
  width:100%;
  height:100%;
  display:flex;
  justify-content:space-around;
  align-items:center;
  padding-right:100px;
`
const SCFinalizarButton = styled.button`
  background-color:#f87b09;
  width:45%;
`