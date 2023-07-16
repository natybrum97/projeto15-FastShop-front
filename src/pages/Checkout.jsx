import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cabeçalho from "../components/Cabeçalho";
import { LoginContext } from "../contexts/LoginContext";

export default function Checkout() {
  const navigate = useNavigate()
  const {total,setTotal,getCarrinho,setGetCarrinho,isLoged,setValorCarrinho} = useContext(LoginContext)
  const [payMethod, setPayMethod] = useState("Boleto")
  const [parcelas, setParcelas] = useState("1")
  const [totalNumerico, setTotalNumerico] = useState(0)
  const [numeroCartao, setNumeroCartao] = useState("")

  useEffect(() => {
    isLoged();
    axios.get(`${import.meta.env.VITE_API_URL}/carrinho`)
      .then((response) => {
        setGetCarrinho(response.data)
        let totalCompra = 0;

        response.data.forEach(produto => {
          totalCompra += parseFloat(produto.valor*produto.quantidade);
        });
        setTotalNumerico(totalCompra)
        const saldoFinal = Math.abs(totalCompra).toFixed(2).replace(".", ",");
        setTotal(saldoFinal);
      })
      .catch((error) => {
        console.error(error);
      });

    
  }, []);

  function handleInput(e){
    const newValue = e.target.value
    const parsedValue = parseInt(newValue)
    console.log(newValue,parsedValue,parcelas)
    if(newValue === "") return setParcelas("")
    if(isNaN(parsedValue)) return 
    if(newValue > 12) return setParcelas(12)
    setParcelas(parsedValue)
  }

  function setBoleto(){
    setPayMethod("Boleto");
    setParcelas("1");
  }

  function finalizarCompra(){
    const confirmacao = window.confirm("Tem certeza de que deseja finalizar a compra?");
    if(!confirmacao) return
    const userid = localStorage.getItem("userid");
    let postObj = {
      carrinho: getCarrinho,
      userid,
      valor: totalNumerico,
      parcelas,
      tipo: payMethod
    }
    if(payMethod !== "Boleto") postObj = {...postObj, ccnumber: numeroCartao}
    console.log(postObj) 
    
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/compra`, postObj);
    promise.then(resposta => {
      axios.delete(`${import.meta.env.VITE_API_URL}/carrinho`)
        .then((response) => {
          setValorCarrinho(0);
        })
        .catch((error) => {
          console.error(error);
        });
      alert(resposta.data)
      navigate("/catalogo")
    });

    promise.catch(erro => {
      console.log(erro);
    });
  }
  return (
    <SCcheckoutPage>
      <Cabeçalho />
      <SCPagamentoContainer>
        <SCPagamentoInnerBox>
          <SCHeaderSpan> Valor </SCHeaderSpan>
          <SCValorSpan>R$ {total}</SCValorSpan>
        </SCPagamentoInnerBox>
        <SCPagamentoInnerBox>
          <SCHeaderSpan> Forma de pagamento</SCHeaderSpan>
          <SCButtonContainer>
            <SCPgmntButon disabled={payMethod === "Boleto"} selected={payMethod === "Boleto"} onClick={setBoleto}>Boleto</SCPgmntButon>
            <SCPgmntButon disabled={payMethod === "Cartão de Crédito"} selected={payMethod === "Cartão de Crédito"} onClick={()=>setPayMethod("Cartão de Crédito")}>Cartão de Crédito</SCPgmntButon>
          </SCButtonContainer>
        </SCPagamentoInnerBox>
      </SCPagamentoContainer>
      {payMethod === "Boleto" ?
       <SCBaixarBoletoSpan onClick={()=> alert("Iniciando o download, em caso de problemas clique novamente no link")}>Clique aqui para baixar seu Boleto</SCBaixarBoletoSpan>      
       :
       <SCPagamentoContainer>
        <SCPagamentoInnerBox>
          <SCHeaderSpan> Valor das parcelas </SCHeaderSpan>
          <SCValorSpan>R$ {parcelas === "" ? "Parcelas inválidas": (totalNumerico/parcelas).toFixed(2).replace(".",",")}</SCValorSpan>
        </SCPagamentoInnerBox>
        <SCPagamentoInnerBox>
          <SCHeaderSpan> Parcele em até 12x sem júros</SCHeaderSpan>
          <input placeholder="Número do cartão" value={numeroCartao} onChange={(e)=>setNumeroCartao(e.target.value)}></input>
          <input placeholder="Número de parcelas" value={parcelas} onChange={(e)=>handleInput(e)}></input>
        </SCPagamentoInnerBox>
      </SCPagamentoContainer>
       }
        <SCFinalizarButon onClick={finalizarCompra} disabled={parcelas==="" || (numeroCartao==="" && payMethod!=="Boleto")}>Finalizar compra</SCFinalizarButon>

    </SCcheckoutPage>
  )
}

const SCcheckoutPage = styled.div`
  padding-top:135px;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  height:100%;
  width:100%;
`
const SCPagamentoContainer = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  height:100%;
  width:85%;
  padding-bottom:100px;
`
const SCPagamentoInnerBox = styled.div`
  width:50%;
  height: 100%;;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;
`
const SCHeaderSpan = styled.span`
  font-size:40px;
  font-weight:700;
  color:rgb(61, 61, 61);
  margin-bottom:25px;
`
const SCValorSpan = styled.span`
font-size:40px;
font-weight:700;
color:rgb(40, 255, 76);
`
const SCButtonContainer = styled.div`
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  width:100%;
`
const SCPgmntButon = styled.button`
  display:flex;
  align-items:center;
  justify-content:center;
  width:250px;
  height:auto;
  font-size:25px;
  background-color:orange;
  opacity:${(props)=> props.selected? "0.6" : "1"};
`

const SCBaixarBoletoSpan = styled.span`
  font-size:50px;
  font-weight:700;
  color:lightgray;
`
const SCFinalizarButon = styled.button`
  display:flex;
  align-items:center;
  justify-content:center;
  width:250px;
  height:auto;
  font-size:25px;
  background-color:orange;
  opacity:${(props)=> props.disabled?  "0.6" : "1"};
  cursor:${(props)=> props.disabled ? "not-allowed":"pointer"};
  margin-top:100px;
  `