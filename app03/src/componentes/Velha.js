import React,{useState} from 'react';

// Estilos css
const cssTabuleiro={
    display: 'flex',
    flexDirection: 'column'
}

const cssLinha={
    display: 'flex',
    flexDirection: 'row'
}

const cssCasa={
    width: 100,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContente: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: 60,
    border: '1px solid #000'
}

function Velha() {
  
    // Variaveis
    const jogoInicial = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // States
    const [jogo, setJogo] = useState(jogoInicial);
    const [simboloAtual, setSimboloAtual] = useState('X');
    const [jogando, setJogando] = useState(true);

    // Funções
    const tabuleiro=(jg)=> {
        return(
            <div style={cssTabuleiro}>
                <div style={cssLinha}>
                    <div style={cssCasa} onClick="" data-pos="00">{jg[0][0]}</div>
                    <div style={cssCasa} onClick="" data-pos="01">{jg[0][1]}</div>
                    <div style={cssCasa} onClick="" data-pos="02">{jg[0][2]}</div>
                </div>
                <div style={cssLinha}>
                    <div style={cssCasa} onClick="" data-pos="10">{jg[1][0]}</div>
                    <div style={cssCasa} onClick="" data-pos="11">{jg[1][1]}</div>
                    <div style={cssCasa} onClick="" data-pos="12">{jg[1][2]}</div>
                </div>
                <div style={cssLinha}>
                    <div style={cssCasa} onClick="" data-pos="20">{jg[2][0]}</div>
                    <div style={cssCasa} onClick="" data-pos="21">{jg[2][1]}</div>
                    <div style={cssCasa} onClick="" data-pos="22">{jg[2][2]}</div>
                </div>
            </div>
        );
    }

    const verificaVitoria=()=> {
        let pontos = 0;
        // Linhas
        for (let l = 0; l < 3; l++) {
            pontos = 0;
            for (let c = 0; c < 3; c++) {
                if(jogo[l][c] == simboloAtual)pontos++;
            }
            if (pontos == 3) {
                return true;
            }
        }

        // colunas
        for (let c = 0; c < 3; c++) {
            pontos = 0;
            for (let l = 0; l < 3; l++) {
                if(jogo[l][c] == simboloAtual)pontos++;
            }
            if (pontos == 3) {
                return true;
            }
        }

        // Diagonais
        pontos = 0;
        let l = 0;
        for (let c = 2; c >= 0; c--){
            if(jogo[l][c] == simboloAtual)pontos++;
            l++;
        }
        if (pontos == 3) {
            return true;
        }else{
            return false;
        }
    }

    const trocaJogador=()=> {
        simboloAtual=="X"?setSimboloAtual("O"):setSimboloAtual("X");
    }

    const retornaPosicao=(e)=> {
        const p = e.target.getAttribute("data-pos");
        const pos = [parseInt(p.substring(0,1)), parseInt(p.substring(1,2))];
        return pos;
    }

    const verificaPosVazia=(e)=> {
        if(jogo[retornaPosicao(e)[0]],[retornaPosicao(e)[1]] == '')return true;
        else return false;
    }

    return (
        <>
        </>
    );
}

export default Velha;