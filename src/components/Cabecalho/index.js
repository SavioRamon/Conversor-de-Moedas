import React from 'react';
import "./style.css";

import cifrao from "../../imagens/cifrao.png";

export default ()=>{
    return (
        <div className="cabecalho--conteudo">
            <h1 className="cabecalho--titulo">
                <span>Câmbio</span> <span className="letra--o--cifrao">M<img src={cifrao} alt="imagem de um saco de dinheiro amarelo" />eda</span>
            </h1>
        </div>
    )
}