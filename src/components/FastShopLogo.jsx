import styled from "styled-components"

export default function FastShopLogo() {
    return (
        
        <PageContainerTopo>

            <LogoFastShop>Fast<span>Shop</span></LogoFastShop>

        </PageContainerTopo>

    )
}

const LogoFastShop = styled.h1`
    font-family: 'Roboto', cursive;
    font-weight: 800;
    font-size: 70px;
    color: white;
    margin-right:150px;

    span{
        color:#f87b09;
    }
`

const PageContainerTopo = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    height: 200px;
    background-color: #212121;
    width:100%;
    box-shadow: 0px 4px 4px 0px #00000026;
    position: fixed;
    top: 0;
    left:0;
`