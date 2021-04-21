import React from 'react';
import "./Cabecalho.css";

import cifrao from "../imagens/cifrao.png";

export default ()=>{
    return (
        <div className="cabecalho--conteudo">
            <h1 className="cabecalho--titulo">
                <span>Câmbio</span> <span className="letra--o--cifrao">M<img src={cifrao} />eda</span>
            </h1>
        </div>
    )
}