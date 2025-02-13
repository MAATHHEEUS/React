import React, { useState, useEffect } from 'react';
import "../styles/ChatBot.css";
import { FaGreaterThan, FaHeart, FaCommentsDollar } from "react-icons/fa";

export default function ChatBot() {

    useEffect(() => {
        function Start() {
            // Collapsible
            var coll = document.getElementsByClassName("collapsible");

            for (let i = 0; i < coll.length; i++) {
                coll[i].addEventListener("click", function () {
                    this.classList.toggle("active");

                    var content = this.nextElementSibling;

                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }

                });
            }
            FirstBotMessage()
        }
        Start();
    }, []);

    // Collapsible
    var coll = document.getElementsByClassName("collapsible");

    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");

            var content = this.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }

        });
    }

    function GetBotResponse(input) {
        const inputUpper = String(input).toUpperCase();
        if (inputUpper.includes('AJUDA')) {
            return "Para pedir ajuda entre na aba do menu superior 'Ajuda' e entre em contato conosco!";
        } else if (inputUpper.includes('OLÁ') || inputUpper.includes('OI') || inputUpper.includes('EAI')) {
            return "Olá, como posso ajudar?";
        } else if (inputUpper.includes('EU SOU O REI DA VÁRZEA')) {
            return "Parabéns! Continue Arrebentando.";
        } else {
            // Salva a pergunta para colocar nos perguntas frequentes
            SalvaPergunta(inputUpper);
            return `Em São Paulo, por exemplo, o preço de um pacote de 500 g pode variar entre R$ 20,99 e R$ 21,99. 
NOTICIAS.R7.COM

No Pão de Açúcar, o "Café Torrado e Moído Tradicional Café Brasileiro" de 500 g está disponível por R$ 20,99. 
PAODEACUCAR.COM

No Atacadão, o "Café Brasileiro Tradicional Stand Pack" de 500 g é oferecido a partir de R$ 24,98 para compras de duas unidades ou mais.`
        }
    }

    function SalvaPergunta(pergunta) {
        // Monta os dados que serão enviados na requisição
        let dados = new FormData()
        dados.append('pergunta', pergunta)
        // Ajax(Requisição)
        // $.ajax({
        //     url: 'http://localhost/Proj_RDV/chatBot/chat.php',
        //     method: 'post',
        //     data: dados,
        //     processData: false,
        //     contentType: false,
        //     dataType: 'json'
        // }).done(function (resposta) {// Trata o retorno da requisição
        //     if (resposta.tipo === 'E') {
        //         caixaAviso.aviso(resposta.msg)
        //     }
        //     if (resposta.tipo === 'OK') {
        //         return
        //     }
        // })
        return;
    }

    function GetTime() {
        let today = new Date();
        let hours = today.getHours();
        let minutes = today.getMinutes();

        if (hours < 10) {
            hours = "0" + hours;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        let time = hours + ":" + minutes;
        return time;
    }

    // Gets the first message
    function FirstBotMessage() {
        let firstMessage = "Olá, seja Bem-Vindo! Qual produto deseja consultar os preços?";
        document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

        let time = GetTime();

        document.getElementById("chat-timestamp").value = "";
        document.getElementById("chat-timestamp").append(time);
        document.getElementById("userInput").scrollIntoView(false);
    }

    // Retrieves the response
    function GetHardResponse(userText) {
        let botResponse = GetBotResponse(userText);
        const p = document.createElement("p");
        p.classList.add("botText");

        const span = document.createElement("span");
        const text = document.createTextNode(botResponse);
        span.appendChild(text)
       
        p.appendChild(span);
        document.getElementById("chatbox").appendChild(p);

        document.getElementById("chat-bar-bottom").scrollIntoView(true);
    }

    //Gets the text text from the input box and processes it
    function GetResponse() {
        let userText = document.getElementById("textInput").value;

        if (userText == "") {
            userText = "Por favor digite um nome válido";
        }
        const p = document.createElement("p");
        p.classList.add("userText");

        const span = document.createElement("span");
        const text = document.createTextNode(userText);
        span.appendChild(text)
       
        p.appendChild(span);
        
        document.getElementById("chatbox").appendChild(p);
        document.getElementById("chat-bar-bottom").scrollIntoView(true);

        setTimeout(() => {
            GetHardResponse(userText);
        }, 1000)
        document.getElementById("textInput").value = "";
    }

    // Handles sending text via button clicks
    function ButtonSendText(sampleText) {
        const p = document.createElement("p");
        p.classList.add("userText");

        const span = document.createElement("span");
        const text = document.createTextNode(sampleText);
        span.appendChild(text)
       
        p.appendChild(span);
        document.getElementById("textInput").value = "";
        document.getElementById("chatbox").appendChild(p);
        document.getElementById("chat-bar-bottom").scrollIntoView(true);
    }

    function SendButton() {
        GetResponse();
    }

    function HeartButton() {
        ButtonSendText("&#9829;")
    }

    return (
        <>
            {/* <!-- CHAT BAR BLOCK --> */}
            <div class="chat-bar-collapsible">
                <button id="chat-button" type="button" class="collapsible">Consute os preços!
                    <FaCommentsDollar  id="chat-icon" style={{ color: '#fff' }} />
                </button>

                <div class="content_chat">
                    <div class="full-chat-block">
                        {/* <!-- Message Container --> */}
                        <div class="outer-container">
                            <div class="chat-container">
                                {/* <!-- Messages --> */}
                                <div id="chatbox">
                                    <h5 id="chat-timestamp"></h5>
                                    <p id="botStarterMessage" class="botText"><span>Carregando...</span></p>
                                </div>
                                {/* 
                                    <!-- User input box --> */}
                                <div class="chat-bar-input-block">
                                    <div id="userInput">
                                        <input id="textInput" class="input-box" type="text" name="msg"
                                            placeholder="Digite o nome do produto" />
                                        <p></p>
                                    </div>

                                    <div class="chat-bar-icons">
                                        <FaHeart id="chat-icon" style={{ color: '#fff' }} onClick={() => HeartButton()} />
                                        <FaGreaterThan id="chat-icon" style={{ color: '#333' }} onClick={() => SendButton()}/>
                                    </div>
                                </div>

                                <div id="chat-bar-bottom">
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}