import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";
import Cabeçalho from "../components/Cabeçalho";
import { LoginContext } from "../contexts/LoginContext";
import FiltroPorCategoria from "../components/FiltroPorCategoria";
import ProdutosPorCategoria from "../components/ProdutosPorCategoria";

export default function CatalogoPorCategoria() {

  const { isLoged } = useContext(LoginContext);

  useEffect(() => {
    isLoged();
  })

  return (
    <ContainerGrandeProdutos>

      <Cabeçalho />

      <FiltroPorCategoria />

      <ProdutosPorCategoria />

    </ContainerGrandeProdutos>
  )
}


const ContainerGrandeProdutos = styled.div`
  height:auto;
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #CCCCCC;
`