import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

export default function ListadeProdutos() {
  const navigate = useNavigate()
  const {listadeProdutos, setListadeProdutos, isLoged, setProduto } = useContext(LoginContext);

  useEffect(() => {
    isLoged();
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/catalogo`);

    promise.then((resposta) => {

      setListadeProdutos(resposta.data);
      console.log(resposta.data, "lista");
      setProduto([])

    })

    promise.catch((erro) => {

      console.log(erro.response.data);

    })

  }, []);

    return (
        <ListagemdeProdutos>
        {listadeProdutos.map((produto) => (

          <ListItemContainer key={produto._id} onClick={() => navigate(`/item/${produto._id}`)}>
            <ProductImage src={produto.url} alt="SmartPhone" />
            <ProductName>{produto.nome}</ProductName>
            <ProductValor>R${produto.valor.replace(/\./g, ',')}</ProductValor>
            
          </ListItemContainer>

        )
        )}
      </ListagemdeProdutos>

    )
}

const ListagemdeProdutos = styled.div`
  height:auto;
  width:calc(100% - 250px);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  color: #000000;
  background-color: #CCCCCC;
  margin-top: 190px;
`

const ListItemContainer = styled.li`
  height:350px;
  width:347px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:space-around;
  color: #000000;
  background-color: white;
  box-shadow: 0px 4px 4px 0px #00000026;
  margin: 15px;
  padding: 10px;
`

const ProductImage = styled.img`
  width: 300px;
  height: 230px;
  margin-top:5px;
  margin-bottom:5px;
`;

const ProductName = styled.h1`
    font-family: 'Roboto', cursive;
    font-weight: 600;
    font-size: 20px;
    color: black;
    margin-bottom:5px;
    width: 300px;
    text-align: left;

`
const ProductValor = styled.h1`
    font-family: 'Roboto', cursive;
    font-weight: 400;
    font-size: 20px;
    color: black;
    width: 300px;
    text-align: left;
`