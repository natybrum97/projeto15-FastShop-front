import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Cadastro from "./pages/Cadastro";
import Carrinho from "./pages/Carrinho";
import Catalogo from "./pages/Catalogo";
import Login from "./pages/Login"
import Checkout from "./pages/Checkout";
import { LoginProvider } from "./contexts/LoginContext.jsx";

export default function App() {

  return (

    <PagesContainer>
      <BrowserRouter>
        <LoginProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/carrinho" element={<Carrinho />} />
  <Route path="/checkpoint" element={<Checkout />} /> */}
          </Routes>
        </LoginProvider>
      </BrowserRouter>
    </PagesContainer>
  )
}


const PagesContainer = styled.main`
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
