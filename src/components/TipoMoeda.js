import React, {useState, useEffect} from "react";
import "./TipoMoeda.css";

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

export default ( {item, trocaPrimaria, trocaSecundaria, carregaDados} )=>{

    const [listaMoedas, setListaMoedas] = useState("");

    const [caixaPrimariaAtivada, setCaixaPrimariaAtivada] = useState(false);
    const [caixaSecundariaAtivada, setCaixaSecundariaAtivada] = useState(false);

    const [moedaPrimariaEscolhida, setMoedaPrimariaEscolhida] = useState("USD");
    const [moedaSecundariaEscolhida, setMoedaSecundariaEscolhida] = useState("BRL");


    useEffect(()=>{
        for(let i in item.rates) {
            let totMoedas = [];
                for(let moeda in item.rates[i]) {
                    totMoedas.push(moeda);
                }
                setListaMoedas(totMoedas);
                carregaDados(moedaPrimariaEscolhida, moedaSecundariaEscolhida);
                break;
            } 
    }, [])

    return ( 
        <div className="caixa--moeda">
            <h1 className="caixa--moeda--titulo">
                Analise e Conversão de Moeda
            </h1>
            
            <div className="caixa--moeda--primaria">
                <div className="botao--mostra--moedas" onClick={()=>{
                    setCaixaPrimariaAtivada(!caixaPrimariaAtivada);
                    setCaixaSecundariaAtivada(false);
                }}>
                    {caixaPrimariaAtivada? <ArrowDropDownIcon /> : <ArrowRightIcon /> }
                    {moedaPrimariaEscolhida}
                </div>
                
                {caixaPrimariaAtivada &&
                    <div className="moeda--escolha">
                        {listaMoedas.map((moeda, key)=>{
                            return (
                                <div className="moeda--primaria" key={key} onClick={()=>{
                                    setCaixaPrimariaAtivada(false);
                                    setMoedaPrimariaEscolhida(moeda);
                                    trocaPrimaria(moeda);

                                    if(moeda === moedaSecundariaEscolhida) {
                                        trocaSecundaria(moedaPrimariaEscolhida);
                                        setMoedaSecundariaEscolhida(moedaPrimariaEscolhida);
                                        carregaDados(moeda, moedaPrimariaEscolhida);
                                    } else {
                                        carregaDados(moeda, moedaSecundariaEscolhida)
                                    }
                                }}>
                                    {moeda}
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
            <div className="figura--cedula"><LocalAtmIcon style={{fontSize: "50px"}}/></div>
            <div className={"caixa--moeda--secundaria"}>
                <div className="botao--mostra--moedas" onClick={()=>{
                    setCaixaSecundariaAtivada(!caixaSecundariaAtivada);
                    setCaixaPrimariaAtivada(false);
                }}>
                    {caixaSecundariaAtivada? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                    {moedaSecundariaEscolhida}
                </div>

                {caixaSecundariaAtivada &&
                    <div className="moeda--escolha">
                        {listaMoedas.map((moeda, key)=>{
                            return (
                                <div className="moeda--secundaria" key={key} onClick={()=>{
                                    setMoedaSecundariaEscolhida(moeda);
                                    trocaSecundaria(moeda);
                                    setCaixaSecundariaAtivada(false);

                                    if(moeda === moedaPrimariaEscolhida) {
                                        trocaPrimaria(moedaSecundariaEscolhida);
                                        setMoedaPrimariaEscolhida(moedaSecundariaEscolhida);
                                        carregaDados(moedaSecundariaEscolhida, moeda);
                                    } else {
                                        carregaDados(moedaPrimariaEscolhida, moeda);
                                    }
                                    
                                }}>
                                    {moeda}
                                </div>
                            )
                        })}
                    </div>
                }
            </div>


        </div>
    )
}