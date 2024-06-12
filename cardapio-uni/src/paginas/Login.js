import Rodape from "../componentes/Rodape/Rodape";
import CampoTexto from '../componentes/CampoTexto/CampoTexto';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    return (
        <>
            <main>
                <form>
                    <h1>Login</h1>
                    <CampoTexto
                        obrigatorio={true}
                        label="Email"
                        placeholder="Digite o email cadastrado"
                        valor={email}
                        atualizaValor={email => setEmail(email)}
                    />
                </form>
            </main>
            <Rodape />
        </>
    )
}