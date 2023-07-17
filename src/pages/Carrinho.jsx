import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";
import Cabeçalho from "../components/Cabeçalho";
import { LoginContext } from "../contexts/LoginContext";

export default function Carrinho() {

  const navigate = useNavigate();

  const { isLoged, getCarrinho, setGetCarrinho, setValorCarrinho, total, setTotal } = useContext(LoginContext);

  useEffect(() => {
    isLoged();

    let totalCompra = 0;

    getCarrinho.forEach(produto => {
      totalCompra += parseFloat(produto.valor*produto.quantidade);
    });

    const saldoFinal = Math.abs(totalCompra).toFixed(2).replace(".", ",");
    setTotal(saldoFinal);
  }, [getCarrinho]);

  function atualizaValordoCarrinho() {

    axios.get(`${import.meta.env.VITE_API_URL}/carrinho`)

      .then((response) => {

        const carrinhodecompras = response.data;
        setValorCarrinho(carrinhodecompras.length);
        setGetCarrinho(response.data)

      })

      .catch((error) => {

        console.error(error);

      });

  }

  function deleteItem(produtoId) {

    const confirmacao = window.confirm("Tem certeza de que deseja excluir?");

    if (confirmacao) {

      axios.delete(`${import.meta.env.VITE_API_URL}/carrinho/${produtoId}`)

        .then((response) => {

          atualizaValordoCarrinho();

        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  function deleteTudo() {

    const confirmacao = window.confirm("Tem certeza de que deseja excluir?");

    if (confirmacao) {

      axios.delete(`${import.meta.env.VITE_API_URL}/carrinho`)

        .then((response) => {

          atualizaValordoCarrinho();

        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <Cabeçalho />

      <ContainerGrande>

        <Titulo>Meu Carrinho</Titulo>

        <TopoTitulos>

          <IconeProduto>Ícone</IconeProduto>
          <NomeProduto>Nome do Produto</NomeProduto>
          <PreçoProduto>Preço Unitário</PreçoProduto>
          <QuantidadeProduto>Quantidade</QuantidadeProduto>
          <ValorProduto>Preço</ValorProduto>
          <ExcluirProduto>Excluir</ExcluirProduto>


        </TopoTitulos>

        <ContainerMenor>

          <Lista>

            {getCarrinho.map((produto) => (

              <ListItemContainer key={produto._id}>

                <ImageProduct src={produto.url} alt="url" />
                <TextName>{produto.nome}</TextName>
                <TextValor>{produto.valor.replace(".", ",")}</TextValor>
                <TextQuantidade>{produto.quantidade}</TextQuantidade>
                <TextValorTotal>R$ {(produto.quantidade * parseFloat(produto.valor)).toFixed(2).replace(".", ",")}</TextValorTotal>
                <ButtonExcluir onClick={() => deleteItem(produto._id)}>Excluir</ButtonExcluir>

              </ListItemContainer>

            )
            )}
          </Lista>


        </ContainerMenor>

        <FinalizaCompra>
          <Total>Total: R$ {total}</Total>
          <ButtonEsvaziar onClick={() => deleteTudo()}>Esvaziar Carrinho</ButtonEsvaziar>
          <ButtonContinuarComprando onClick={() => navigate("/catalogo")}>Retorne ao Menu de Produtos</ButtonContinuarComprando>
          <ButtonConfirmar disabled={getCarrinho.length === 0} onClick={()=>navigate("/endereço")}>Ir para Cadastro de Endereço</ButtonConfirmar>
        </FinalizaCompra>

      </ContainerGrande>
    </>
  )
}

const ContainerGrande = styled.div`
  height:auto;
  width:100%;
  height:auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 145px;
`
const Titulo = styled.h1`
  font-weight:700;
  font-size:40px;
  color:black;
`
const Total = styled.h1`
  color:black;
`
const ContainerMenor = styled.div`
  height:auto;
  width: calc(100% - 250px);
  height:auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-bottom:25px;
`

const Lista = styled.div`
  overflow-y: auto;
  height:auto;
  width: 100%;
`

const ListItemContainer = styled.li`
  height:140px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  box-shadow: 0px 4px 4px 0px #00000026;
  margin-right: 10px;
`

const ImageProduct = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const TextName = styled.h1`
  width:375px;
  display:flex;
  justify-content:center;
  align-items:center;
`;
const TextValor = styled.h1`
  width: 170px;
  display:flex;
  justify-content:center;
  align-items:center;
 
`;

const TextQuantidade = styled.h1`
  width: 150px;
  display:flex;
  justify-content:center;
  align-items:center;
 
`;
const TextValorTotal = styled.h1`
  width:150px;
  display:flex;
  justify-content:center;
  align-items:center;
 
`;

const ButtonExcluir = styled.button`
  width:100px;
  background-color:#f87b09;
  display:flex;
  justify-content:center;
  align-items:center;
 
`;
const ButtonConfirmar = styled.button`
  width:200px;
  background-color:#f87b09;
  cursor:${(props)=> props.disabled? "not-allowed":"pointer"};
  opacity:${(props) => props.disabled? "0.6": "1"};
`;

const FinalizaCompra = styled.div`
  height:auto;
  width: calc(100% - 250px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom:25px;
`
const TopoTitulos = styled.div`
  height:auto;
  width: calc(100% - 250px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom:25px;
  box-shadow: 0px 4px 4px 0px #00000026;
  margin-top:25px;
`

const IconeProduto = styled.h1`
  width:100px;
  display:flex;
  justify-content:center;
  align-items:center;
 
`;
const NomeProduto = styled.h1`
  width:375px;
  display:flex;
  justify-content:center;
  align-items:center;
 
 
`;
const PreçoProduto = styled.h1`
  width: 170px;
  display:flex;
  justify-content:center;
  align-items:center;
 
 
`;
const QuantidadeProduto = styled.h1`
  width: 150px;
  display:flex;
  justify-content:center;
  align-items:center;
 
 
`;
const ValorProduto = styled.h1`
  width:150px;
  display:flex;
  justify-content:center;
  align-items:center;
 
 
`;
const ExcluirProduto = styled.h1`
  width:100px;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const ButtonEsvaziar = styled.button`
  width: 200px;
  background-color:#f87b09;
`;
const ButtonContinuarComprando = styled.button`
  width: 300px;
  background-color:#f87b09;
`;