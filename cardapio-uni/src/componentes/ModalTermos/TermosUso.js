import "./TermosUso.css";
import { AiFillCloseCircle } from "react-icons/ai";

export default function ResetSenha({ modal, ativaModal }) {

    return (
        <div className="modal" style={{ display: modal ? "flex" : "none" }}>
            <div className="container">
                <AiFillCloseCircle onClick={ativaModal} size={30} className="icon__x" />
                <h2>Termos de uso e Consentimento para Tratamento de Dados Pessoais</h2>
                
                <div className="scrollable">
                    <p>Este termo estabelece as condições para o tratamento dos seus dados pessoais pelo nosso website, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>

                    <h3>1. Definições</h3>
                    <p><strong>1.1. Dados Pessoais:</strong> Informações relacionadas a uma pessoa natural identificada ou identificável.</p>
                    <p><strong>1.2. Titular dos Dados:</strong> Pessoa natural a quem se referem os dados pessoais que são objeto de tratamento.</p>
                    <p><strong>1.3. Tratamento de Dados:</strong> Toda operação realizada com dados pessoais, como coleta, armazenamento, utilização, acesso, entre outras.</p>

                    <h3>2. Dados Coletados</h3>
                    <p><strong>2.1. Coletamos as seguintes categorias de dados pessoais:</strong></p>
                    <ul>
                        <li>Nome completo</li>
                        <li>Endereço de email</li>
                        <li>Senha de acesso</li>
                    </ul>

                    <h3>3. Finalidade do Tratamento</h3>
                    <p><strong>3.1.</strong> Os dados são coletados para permitir seu acesso e uso dos serviços oferecidos pelo nosso website.</p>

                    <h3>4. Base Legal para o Tratamento de Dados</h3>
                    <p><strong>4.1.</strong> O tratamento dos seus dados é realizado com base no seu consentimento (art. 7º, inciso I, LGPD), que é obtido através do seu aceite expresso a este termo.</p>

                    <h3>5. Armazenamento e Segurança</h3>
                    <p><strong>5.1.</strong> Seus dados serão armazenados em um site de API gratuito, adotando-se medidas de segurança técnicas e administrativas adequadas para proteger seus dados contra acessos não autorizados e situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou qualquer forma de tratamento inadequado ou ilícito.</p>

                    <h3>6. Compartilhamento de Dados</h3>
                    <p><strong>6.1.</strong> Os dados fornecidos serão compartilhados apenas com o provedor do serviço de API necessário para a operação do website. Não compartilharemos seus dados com terceiros, exceto conforme necessário para a adequada prestação do serviço.</p>

                    <h3>7. Retenção dos Dados</h3>
                    <p><strong>7.1.</strong> Seus dados serão armazenados por tempo indeterminado, ou até que você solicite sua exclusão.</p>

                    <h3>8. Direitos do Titular dos Dados</h3>
                    <p><strong>8.1.</strong> Você tem o direito de confirmar a existência de tratamento dos seus dados, acessar seus dados pessoais, corrigir dados incompletos, inexatos ou desatualizados, anonimizar, bloquear ou eliminar dados desnecessários, excessivos ou tratados em desconformidade com o disposto na LGPD, além de portabilidade dos seus dados a outro fornecedor de serviço ou produto, mediante requisição expressa, com base nas hipóteses previstas na LGPD.</p>
                    <p><strong>8.2.</strong> Você tem o direito de revogar seu consentimento a qualquer momento, mediante manifestação expressa, sendo que a revogação do consentimento não prejudica a legalidade do tratamento realizado antes de sua efetivação.</p>

                    <h3>9. Consentimento</h3>
                    <p><strong>9.1.</strong> Ao utilizar nosso website e fornecer seus dados pessoais, você consente com o tratamento dos seus dados conforme descrito neste termo.</p>

                    <h3>10. Alterações no Termo de Consentimento</h3>
                    <p><strong>10.1.</strong> Este termo poderá ser atualizado a qualquer momento, sendo que eventuais alterações serão comunicadas através do nosso website ou por outros meios adequados.</p>

                    <h3>11. Contato</h3>
                    <p><strong>11.1.</strong> Para exercer seus direitos ou esclarecer dúvidas sobre este termo de consentimento, entre em contato conosco através dos canais indicados em nosso website.</p>
                </div>
            </div>
        </div>
    )
}