import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Cadastro from "./pages/Cadastro";
import Carrinho from "./pages/Carrinho";
import Catalogo from "./pages/Catalogo";
import Login from "./pages/Login"
import Checkout from "./pages/Checkout";
import { LoginProvider } from "./contexts/LoginContext.jsx";
import { EndereçoProvider } from "./contexts/EndereçoContext.jsx";
import CatalogoPorCategoria from "./pages/CatalogoPorCategoria";
import Item from "./pages/Item";
import Endereço from "./pages/Endereço";

export default function App() {

  return (

    <PagesContainer>
      <BrowserRouter>
      <EndereçoProvider>
        <LoginProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/produtos/categoria/:categoria" element={<CatalogoPorCategoria />} />
            <Route path="/item/:id" element={<Item />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/endereço" element={<Endereço />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </LoginProvider>
        </EndereçoProvider>
      </BrowserRouter>
    </PagesContainer>
  )
}


const PagesContainer = styled.main`
  width: 100%;
  max-height: 100vh;
`
