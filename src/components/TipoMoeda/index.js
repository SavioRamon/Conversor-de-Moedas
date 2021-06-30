import React, {useState, useEffect} from "react";
import "./style.css";

import { moedas } from "../../store/Conversor/Conversor.actions";
import { useSelector, useDispatch } from "react-redux";

export default ( {item, trocaPrimaria, trocaSecundaria, carregaDados} )=>{

    const moedasEscolha = useSelector((state)=>state.moedasSelecionadas);
    const dispatch = useDispatch();

    const [listaMoedas, setListaMoedas] = useState("");

    const [caixaPrimariaAtivada, setCaixaPrimariaAtivada] = useState(false);
    const [caixaSecundariaAtivada, setCaixaSecundariaAtivada] = useState(false);

    const [moedaPrimaria, setMoedaPrimaria] = useState(moedasEscolha.moedaUm);
    const [moedaSecundaria, setMoedaSecundaria] = useState(moedasEscolha.moedaDois);


    useEffect(()=>{
        for(let i in item.rates) {
            let totMoedas = [];
                for(let moeda in item.rates[i]) {
                    totMoedas.push(moeda);
                }
                setListaMoedas(totMoedas);
                carregaDados(moedaPrimaria, moedaSecundaria);
                break;
            }

    }, [])

    useEffect(()=> dispatch(moedas(moedaPrimaria, moedaSecundaria)), [moedaPrimaria])

    useEffect(()=> dispatch(moedas(moedaPrimaria, moedaSecundaria)), [moedaSecundaria])

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
                    {moedaPrimaria}
                </div>
                
                {caixaPrimariaAtivada &&
                    <div className="moeda--escolha">
                        {listaMoedasInformacoes.map((moeda, key)=>{
                            return (
                                <div className="moeda--primaria" key={key} onClick={()=>{
                                    setCaixaPrimariaAtivada(false);
                                    setMoedaPrimaria(moeda.abreviacao);
                                    trocaPrimaria(moeda.abreviacao);

                                    if(moeda.abreviacao === moedaSecundaria) {
                                        trocaSecundaria(moedaPrimaria);
                                        setMoedaSecundaria(moedaPrimaria);
                                        carregaDados(moeda.abreviacao, moedaPrimaria);
                                    } else {
                                        carregaDados(moeda.abreviacao, moedaSecundaria)
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
                    {moedaSecundaria}
                </div>

                {caixaSecundariaAtivada &&
                    <div className="moeda--escolha">
                        {listaMoedasInformacoes.map((moeda, key)=>{
                            return (
                                <div className="moeda--secundaria" key={key} onClick={()=>{
                                    setMoedaSecundaria(moeda.abreviacao);
                                    trocaSecundaria(moeda.abreviacao);
                                    setCaixaSecundariaAtivada(false);

                                    if(moeda.abreviacao === moedaPrimaria) {
                                        trocaPrimaria(moedaSecundaria);
                                        setMoedaPrimaria(moedaSecundaria);
                                        carregaDados(moedaSecundaria, moeda.abreviacao);
                                    } else {
                                        carregaDados(moedaPrimaria, moeda.abreviacao);
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