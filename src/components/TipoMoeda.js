import React, {useState, useEffect} from "react";
import "./TipoMoeda.css";

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

    const listaMoedasInformacoes = listaMoedas && listaMoedas.map((item)=>{
        function moedaNome(abreviacao) {
            switch (abreviacao) {
                case "USD":
                    return "Dólar Americano";
                case "BRL":
                    return "Real";
                case "EUR":
                    return "Euro";
                case "GBP":
                    return "Libra esterlina";
                case "JPY":
                    return "Iene";
                case "AUD":
                    return "Dólar Australiano";
                case "CHF":
                    return "Franco Suíço";
                case "CAD":
                    return "Dólar Canadense";
                case "RMB":
                    return "Renminbi (Yuan)";
                case "ARS":
                    return "Peso Argentino";
                case "TRL":
                    return "Lira Turca";
            }

        }

        return (
            {
                abreviacao: item,
                nomeCompleto: moedaNome(item)
            }
        )
    })

    return ( 
        <div className="caixa--moeda">
            
            <div className="caixa--moeda--primaria">
                
                <div className="botao--mostra--moedas" onClick={()=>{
                    setCaixaPrimariaAtivada(!caixaPrimariaAtivada);
                    setCaixaSecundariaAtivada(false);
                }}>
                    {moedaPrimariaEscolhida}
                </div>
                
                {caixaPrimariaAtivada &&
                    <div className="moeda--escolha">
                        {listaMoedasInformacoes.map((moeda, key)=>{
                            return (
                                <div className="moeda--primaria" key={key} onClick={()=>{
                                    setCaixaPrimariaAtivada(false);
                                    setMoedaPrimariaEscolhida(moeda.abreviacao);
                                    trocaPrimaria(moeda.abreviacao);

                                    if(moeda.abreviacao === moedaSecundariaEscolhida) {
                                        trocaSecundaria(moedaPrimariaEscolhida);
                                        setMoedaSecundariaEscolhida(moedaPrimariaEscolhida);
                                        carregaDados(moeda.abreviacao, moedaPrimariaEscolhida);
                                    } else {
                                        carregaDados(moeda.abreviacao, moedaSecundariaEscolhida)
                                    }
                                }}>
                                    {moeda.nomeCompleto}<span>{moeda.abreviacao}</span>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>

            <div className={"caixa--moeda--secundaria"}>

                <div className="botao--mostra--moedas" onClick={()=>{
                    setCaixaSecundariaAtivada(!caixaSecundariaAtivada);
                    setCaixaPrimariaAtivada(false);
                }}>
                    {moedaSecundariaEscolhida}
                </div>

                {caixaSecundariaAtivada &&
                    <div className="moeda--escolha">
                        {listaMoedasInformacoes.map((moeda, key)=>{
                            return (
                                <div className="moeda--secundaria" key={key} onClick={()=>{
                                    setMoedaSecundariaEscolhida(moeda.abreviacao);
                                    trocaSecundaria(moeda.abreviacao);
                                    setCaixaSecundariaAtivada(false);

                                    if(moeda.abreviacao === moedaPrimariaEscolhida) {
                                        trocaPrimaria(moedaSecundariaEscolhida);
                                        setMoedaPrimariaEscolhida(moedaSecundariaEscolhida);
                                        carregaDados(moedaSecundariaEscolhida, moeda.abreviacao);
                                    } else {
                                        carregaDados(moedaPrimariaEscolhida, moeda.abreviacao);
                                    }
                                    
                                }}>
                                    {moeda.nomeCompleto}<span>{moeda.abreviacao}</span>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>


        </div>
    )
}