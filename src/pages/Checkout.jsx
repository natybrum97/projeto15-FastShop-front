import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Logo from "../components/FastShopLogo";
import { LoginContext } from "../contexts/LoginContext";
import { EndereçoContext } from "../contexts/EndereçoContext";

export default function Checkout() {
  const navigate = useNavigate()
  const { total, setTotal, getCarrinho, setGetCarrinho, isLoged, setValorCarrinho } = useContext(LoginContext)
  const { setnomeCompleto, setTelefone, setCep, setRua, setNumeroCasa, setState, setCidade, setBairro, setCPF } = useContext(EndereçoContext);
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
          totalCompra += parseFloat(produto.valor * produto.quantidade);
        });
        setTotalNumerico(totalCompra)
        const saldoFinal = Math.abs(totalCompra).toFixed(2).replace(".", ",");
        setTotal(saldoFinal);
      })
      .catch((error) => {
        console.error(error);
      });


  }, []);

  function handleInput(e) {
    const newValue = e.target.value
    const parsedValue = parseInt(newValue)
    console.log(newValue, parsedValue, parcelas)
    if (newValue === "") return setParcelas("")
    if (isNaN(parsedValue)) return
    if (newValue > 12) return setParcelas(12)
    setParcelas(parsedValue)
  }

  function setBoleto() {
    setPayMethod("Boleto");
    setParcelas("1");
  }

  function finalizarCompra() {
    const confirmacao = window.confirm("Tem certeza de que deseja finalizar a compra?");
    if (!confirmacao) return
    const userid = localStorage.getItem("userid");
    let postObj = {
      carrinho: getCarrinho,
      userid,
      valor: totalNumerico,
      parcelas,
      tipo: payMethod
    }
    if (payMethod !== "Boleto") postObj = { ...postObj, ccnumber: numeroCartao }
    console.log(postObj)

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/compra`, postObj);
    promise.then(resposta => {
      axios.delete(`${import.meta.env.VITE_API_URL}/carrinho`)
        .then((response) => {
          setValorCarrinho(0);
          navigate("/confirmacao");
        })
        .catch((error) => {
          console.error(error);
          alert("Houve um problema com seu pagamento, tente novamente!");
        });

      setnomeCompleto("");
      setTelefone("");
      setCep("");
      setRua("");
      setNumeroCasa("");
      setState("");
      setCidade("");
      setBairro("");
      setCPF("");

    });

    promise.catch(erro => {
      console.log(erro);
      alert(erro.response.data)
    });
  }
  return (
    <SCcheckoutPage>

      <Logo />

      <SCPagamentoInnerBox2>
        <SCHeaderSpan2> Total R${total} </SCHeaderSpan2>
      </SCPagamentoInnerBox2>

      <SCPagamentoInnerBox3>
        <SCHeaderSpan> Forma de pagamento</SCHeaderSpan>
        <SCButtonContainer>
          <SCPgmntButon disabled={payMethod === "Boleto"} selected={payMethod === "Boleto"} onClick={setBoleto}>Boleto</SCPgmntButon>
          <SCPgmntButon disabled={payMethod === "Cartão de Crédito"} selected={payMethod === "Cartão de Crédito"} onClick={() => setPayMethod("Cartão de Crédito")}>Cartão de Crédito</SCPgmntButon>
        </SCButtonContainer>
      </SCPagamentoInnerBox3>

      {payMethod === "Boleto" ?
        <SCBaixarBoletoSpan onClick={() => alert("Iniciando o download, em caso de problemas clique novamente no link")}>Clique aqui para baixar seu Boleto</SCBaixarBoletoSpan>
        :
        <SCPagamentoContainer>

          <SCPagamentoInnerBox4>
            <SCHeaderSpan3> Parcele em até 12x sem juros!</SCHeaderSpan3>
            <input placeholder="Número do cartão" value={numeroCartao} onChange={(e) => setNumeroCartao(e.target.value)}></input>
            <input placeholder="Número de parcelas" value={parcelas} onChange={(e) => handleInput(e)}></input>
          </SCPagamentoInnerBox4>

          <SCPagamentoInnerBox4>
            <SCHeaderSpan> Valor das parcelas: </SCHeaderSpan>
            <SCValorSpan>R$ {parcelas === "" ? "Parcelas inválidas" : (totalNumerico / parcelas).toFixed(2).replace(".", ",")}</SCValorSpan>
          </SCPagamentoInnerBox4>

        </SCPagamentoContainer>
      }
      <SCFinalizarButon onClick={finalizarCompra} disabled={parcelas === "" || (numeroCartao === "" && payMethod !== "Boleto")}>Finalizar compra</SCFinalizarButon>

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
`
const SCPagamentoInnerBox4 = styled.div`
  width:100%;
  height: 100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;
`
const SCPagamentoInnerBox3 = styled.div`
  margin-top: 50px;
  width:100%;
  height: 100%;;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;
  box-shadow: 0px 4px 4px 0px #00000026;
`
const SCPagamentoInnerBox2 = styled.div`
  margin-top: 80px;
  box-shadow: 0px 4px 4px 0px #00000026;
  width:100%;
  height: 100%;
  display:flex;
  flex-direction:column;
  align-items:flex-end;
  justify-content:flex-start;
`
const SCHeaderSpan2 = styled.span`
  font-size:26px;
  font-weight:600;
  color:rgb(61, 61, 61);
  margin-bottom:25px;
  margin-right:50px;
`
const SCHeaderSpan = styled.span`
  font-size:40px;
  font-weight:700;
  color:rgb(61, 61, 61);
  margin-bottom:25px;
`
const SCHeaderSpan3 = styled.span`
  font-size:40px;
  font-weight:700;
  color:rgb(61, 61, 61);
  margin-bottom:25px;
  margin-top:70px;
`
const SCValorSpan = styled.span`
font-size:40px;
font-weight:700;
color:#f87b09;
`
const SCButtonContainer = styled.div`
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  width:100%;
  margin-bottom:50px;
`
const SCPgmntButon = styled.button`
  display:flex;
  align-items:center;
  justify-content:center;
  width:250px;
  height:auto;
  font-size:25px;
  background-color:orange;
  opacity:${(props) => props.selected ? "0.6" : "1"};
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
  opacity:${(props) => props.disabled ? "0.6" : "1"};
  cursor:${(props) => props.disabled ? "not-allowed" : "pointer"};
  margin-top:50px;
  `