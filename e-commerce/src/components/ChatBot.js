import React, { useEffect } from 'react';
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
                    FirstBotMessage();
                });
            }
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

    async function GetBotResponse(input) {
        const inputUpper = String(input).toUpperCase();
        if (inputUpper.includes('OLÁ') || inputUpper.includes('OI') || inputUpper.includes('EAI')) {
            return "Olá, como posso ajudar?";
        } else {
            try {
                const conexao = await fetch(`http://localhost:3001/BOT/${localStorage.getItem('cliente')}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        pergunta: inputUpper
                    })
                });
                if (!conexao.ok) throw new Error("Não foi possível acessar API de IA.");
                else {
                    const conexaoConvertida = conexao.json();
                    conexaoConvertida.then(res => {
                        const p = document.createElement("p");
                        p.classList.add("botText");

                        const span = document.createElement("span");
                        // const text = document.createTextNode(`${res.reply}`);
                        // span.appendChild(text)

                        span.innerHTML = res.reply;
                        p.appendChild(span);
                        document.getElementById("chatbox").appendChild(p);

                        document.getElementById("chat-bar-bottom").scrollIntoView(true);
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
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
        let firstMessage = `Olá, seja Bem-Vindo! Qual receita eu posso te sugerir hoje? Ex.: Lasanha`;
        document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

        let time = GetTime();

        document.getElementById("chat-timestamp").value = "";
        document.getElementById("chat-timestamp").append(time);
        document.getElementById("userInput").scrollIntoView(false);
    }

    // Retrieves the response
    async function GetHardResponse(userText) {
        let botResponse = await GetBotResponse(userText);
        const p = document.createElement("p");
        p.classList.add("botText");

        const span = document.createElement("span");
        const text = document.createTextNode("Pesquisando...");
        span.appendChild(text)

        p.appendChild(span);
        document.getElementById("chatbox").appendChild(p);

        document.getElementById("chat-bar-bottom").scrollIntoView(true);
    }

    //Gets the text text from the input box and processes it
    async function GetResponse() {
        let userText = document.getElementById("textInput").value;

        if (userText === "") {
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

    async function SendButton() {
        GetResponse();
    }

    function HeartButton() {
        ButtonSendText("&#9829;")
    }

    return (
        <>
            {/* <!-- CHAT BAR BLOCK --> */}
            <div className="chat-bar-collapsible">
                <button id="chat-button" type="button" className="collapsible">Consulte receitas!
                    <FaCommentsDollar id="chat-icon" style={{ color: '#fff' }} />
                </button>

                <div className="content_chat">
                    <div className="full-chat-block">
                        {/* <!-- Message Container --> */}
                        <div className="outer-container">
                            <div className="chat-container">
                                {/* <!-- Messages --> */}
                                <div id="chatbox">
                                    <h5 id="chat-timestamp"></h5>
                                    <p id="botStarterMessage" className="botText"><span>Carregando...</span></p>
                                </div>
                                {/* 
                                    <!-- User input box --> */}
                                <div className="chat-bar-input-block">
                                    <div id="userInput">
                                        <input id="textInput" className="input-box" type="text" name="msg"
                                            placeholder="Digite o nome do produto" />
                                        <p></p>
                                    </div>

                                    <div className="chat-bar-icons">
                                        {/* <FaHeart id="chat-icon" style={{ color: '#fff' }} onClick={() => HeartButton()} /> */}
                                        <FaGreaterThan id="chat-icon" style={{ color: '#333' }} onClick={() => SendButton()} />
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