import styled from "styled-components";
import FastShopLogo from "../components/FastShopLogo";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { EndereçoContext } from "../contexts/EndereçoContext";
import Cabeçalho from "../components/Cabeçalho";

export default function Endereço() {

    const { nomeCompleto, setnomeCompleto, telefone, setTelefone, cep, setCep, rua, setRua, numeroCasa, setNumeroCasa, state, setState, cidade, setCidade, bairro, setBairro, cpf, setCPF } = useContext(EndereçoContext);

    const navigate = useNavigate();

    function formatCPF(value) {
        // Remove todos os caracteres não numéricos
        const numericValue = value.replace(/\D/g, "");

        // Aplica a máscara de CPF (###.###.###-##)
        let formattedValue = numericValue.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            "$1.$2.$3-$4"
        );

        return formattedValue;
    }

    function handleCPFChange(e) {
        const value = e.target.value;
        const formattedValue = formatCPF(value);
        setCPF(formattedValue);
    }


    const brazilianStates = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
        "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
        "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
    ];



    function enviarInfos(e) {
        e.preventDefault();

        // Here, you can handle the form submission, API calls, or other actions as needed.
        // For simplicity, we're just logging the form data to the console.
        console.log({
            nomeCompleto,
            telefone,
            cep,
            rua,
            numeroCasa,
            state,
            cidade,
            bairro,
            cpf
        });

        navigate("/checkout");

        /*setnomeCompleto("");
        setTelefone("");
        setCep("");
        setRua("");
        setNumeroCasa("");
        setState("");
        setCidade("");
        setBairro("");
        setCPF("");
        */
    }

    return (

        <SingUpContainer>
            <form onSubmit={enviarInfos}>

                <Cabeçalho/>

                <Input2 placeholder="Nome" type="text" id="nome" value={nomeCompleto} onChange={(e) => setnomeCompleto(e.target.value)} required />
                <input placeholder="Telefone" type="tel" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                <input placeholder="CEP" type="text" id="cep" value={cep} onChange={(e) => setCep(e.target.value)} required />
                <input placeholder="Rua" type="text" id="rua" value={rua} onChange={(e) => setRua(e.target.value)} required />
                <input placeholder="Por favor, insira o número da sua casa" type="text" id="numerocasa" value={numeroCasa} onChange={(e) => setNumeroCasa(e.target.value)} required />

                <ContainerMenor>
                    <Input3 placeholder="Cidade" type="text" id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
                    <Select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    >
                        <option value="" disabled>Selecione um estado</option>
                        {brazilianStates.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </Select>

                </ContainerMenor>

                <input placeholder="Bairro" type="text" id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
                <input type="text" value={cpf} onChange={handleCPFChange} placeholder="000.000.000-00" maxLength="14" required />
                <button type="submit">Ir para Pagamento</button>

            </form>

        </SingUpContainer>
    )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color:#CCCCCC;

  button{
    width: calc(100% - 167px);
    background-color: #f87b09;
  }
`

const Input2 = styled.input`
  margin-top:250px;
`
const Input3 = styled.input`
  width:50%;
`
const ContainerMenor = styled.div`
  width: calc(100% - 167px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Select = styled.select`
  width: 50%;
  padding: 15px;
  border: 1px solid #ccc;
  background-color:white;
  border-radius: 5px;
  color: gray;
  font-size: 20px;

  option {
    background-color: #f7f7f7; /* Cor de fundo das opções */
    color: #CCCCCC; /* Cor do texto das opções */
    font-size: 14px; /* Tamanho da fonte das opções */
  }
`;