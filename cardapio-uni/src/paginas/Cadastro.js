import Banner from "../componentes/Banner/Banner";
import CadastroForm from "../componentes/CadastroForm/CadastroForm";
import Conversa from "../componentes/Conversa/Conversa";
import Rodape from "../componentes/Rodape/Rodape";

export default function Cadastro() {
    return (
        <>
            <Conversa />
            <Banner />
            <CadastroForm />
            <Rodape />
        </>
    )
}