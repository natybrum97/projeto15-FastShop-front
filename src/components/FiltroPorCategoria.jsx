import styled from "styled-components";
import { LoginContext } from "../contexts/LoginContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FiltroPorCategoria() {

    const navigate = useNavigate();

    const { isLoged, setListadeProdutosPorCategoria } = useContext(LoginContext);

    useEffect(() => {
        isLoged();
      })

    function categoriaProdutos(categoria){

        const promise = axios.get(`${import.meta.env.VITE_API_URL}/produtos/categoria/${categoria}`);
    
        promise.then((resposta) => {
    
          setListadeProdutosPorCategoria(resposta.data);
          console.log(resposta.data, "listaAtual");
          navigate(`/produtos/categoria/${categoria}`);
    
        })
    
        promise.catch((erro) => {
    
          console.log(erro.response.data);
    
        })
    

    }

    return (

        <PageContainerTopo>

            <ButtonRetornar onClick={() => navigate("/catalogo")}>Retornar Para Todos</ButtonRetornar>
            <ButtonDesktop onClick={() => categoriaProdutos("Notebook")}>Notebooks</ButtonDesktop>
            <ButtonSmartPhone onClick={() => categoriaProdutos("SmartPhone")}>Smartphones</ButtonSmartPhone>
            <ButtonEletrodomestico onClick={() => categoriaProdutos("Eletrodomestico")}>Eletrodomésticos</ButtonEletrodomestico>
            <ButtonSmarthome onClick={() => categoriaProdutos("Smarthome")}>Smarthomes</ButtonSmarthome>

        </PageContainerTopo>

    )
}

const PageContainerTopo = styled.div`
    display: flex;
    justify-content:space-around;
    align-items: center;
    height: 70px;
    background-color: white;
    width:100%;
    box-shadow: 0px 4px 4px 0px #00000026;
    position: fixed;
    top: 120px;
    left:0;
`

const ButtonRetornar = styled.button`
    width:300px;
    height:40px;
    color: #f87b09;
    font-size: 30px;
    background-color:white;
    display:flex;
    justify-content:center;
    align-items:center;
`

const ButtonDesktop = styled.button`
    width:190px;
    height:40px;
    color: #f87b09;
    font-size: 30px;
    background-color:white;
    display:flex;
    justify-content:center;
    align-items:center;
`
const ButtonSmartPhone = styled.button`
    width:205px;
    height:40px;
    color: #f87b09;
    background-color:white;
    font-size: 30px;
    display:flex;
    justify-content:center;
    align-items:center;
    
`
const ButtonEletrodomestico = styled.button`
    width:255px;
    height:40px;
    background-color:white;
    color: #f87b09;
    font-size: 30px;
    display:flex;
    justify-content:center;
    align-items:center;
`
const ButtonSmarthome = styled.button`
    width:190px;
    height:40px;
    color: #f87b09;
    font-size: 30px;
    background-color:white;
    display:flex;
    justify-content:center;
    align-items:center;
`