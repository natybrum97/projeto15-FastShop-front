import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cabeçalho from "../components/Cabeçalho";
import { LoginContext } from "../contexts/LoginContext";

export default function Item() {
  const navigate = useNavigate();
  const { isLoged,carrinho, setCarrinho } = useContext(LoginContext);
  const {id} = useParams();
  const [produto, setProduto] = useState({valor:""});
  let [quantidade, setQuantidade] = useState(0);

  function menosQuant(){
    const novaQuantidade = quantidade - 1
    if(novaQuantidade >= 0)setQuantidade(novaQuantidade) 
  }
  function maisQuant(){
    const novaQuantidade = quantidade + 1
    setQuantidade(novaQuantidade)
  }
  function addCart(){
    const cart = carrinho;
    if(cart.includes(produto)) return
    cart.push(produto);
    setCarrinho(cart);
    console.log(cart)
    navigate("/catalogo")
  }

  useEffect(() => {
    isLoged();
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/produtos/${id}`);
    promise.then((resposta) => {
      setProduto(resposta.data)
      console.log(resposta.data)

    })

    promise.catch((erro) => console.log(erro.response.data))
  
  },[])

  return (
    <SCItemPag>
      <Cabeçalho />
      <SCItemContainer>
        <img src={produto.url}/>
        <SCItemMenu>
          <SCNomeItem>{produto.nome}</SCNomeItem>
          <SCDescItem>{produto.description}</SCDescItem>
          <SCValorQuantContainer>
            <SCValorItem>R$ {produto.valor.replace(".",",")}</SCValorItem>
            <SCQuantidadeContainer>
              Qtd:<SCQuantButton onClick={menosQuant}>-</SCQuantButton> {quantidade} <SCQuantButton onClick={maisQuant}>+</SCQuantButton>
            </SCQuantidadeContainer>
          </SCValorQuantContainer>
          <SCFinalizarContainer>
            <SCFinalizarButton onClick={addCart}>Adicionar ao carrinho</SCFinalizarButton><SCFinalizarButton onClick={()=>navigate("/catalogo")}>Voltar</SCFinalizarButton>
          </SCFinalizarContainer>
        </SCItemMenu>
      </SCItemContainer>
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
  font-size:50px;
  color:black;
`
const SCDescItem = styled.p`
  font-size:30px;
  color:rgb(75, 75, 75);
`
const SCValorItem = styled.p`
  font-size:50px;
  font-weight:700;
  color:rgb(58, 255, 40);
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
  color:rgb(75, 75, 75);
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