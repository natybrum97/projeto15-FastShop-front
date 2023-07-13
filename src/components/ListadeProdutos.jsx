import styled from "styled-components";

export default function ListadeProdutos() {

    const listProductsArray = [
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"1"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"2"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"3"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"4"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"5"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"6"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"7"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"8"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"9"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"10"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"11"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"12"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"13"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"14"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"15"},
        {url: "https://lojamultilaser.vtexassets.com/arquivos/ids/959052-800-auto?v=638246694249000000&width=800&height=auto&aspect=true", nome: "SmartPhone Multilaser", description: "Smartphone Multi H 5G 256GB Full HD 8GB RAM Câmera Tripla 50MP Android 12 Preto - P9180", categoria: "SmartPhone", valor: "1000.00", _id:"16"}
    ];

    return (
        <ListagemdeProdutos>
        {listProductsArray.map((produto) => (

          <ListItemContainer key={produto._id}>
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
  margin-top: 120px;
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