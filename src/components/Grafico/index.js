import React, {useState, useEffect} from "react";
import "./style.css";

import { useSelector } from "react-redux";

import {ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, } from  "recharts";

export default ({ moedaConverte } )=>{
    
    const dadosApi = useSelector(state=>state.carregaMoedas.resposta);
    const segundaMoeda = useSelector((state)=>state.moedasSelecionadas.moedaDois);

    const [data, setData] = useState("");

    const carregaData = ()=>{
        const totMoeda = [];
        const totValor = [];

        let valorConversao = "";
        if(dadosApi){
            for(let item in dadosApi.rates) {
                totValor.push(dadosApi.rates[item][segundaMoeda])
                
                
                valorConversao = dadosApi.rates[item][segundaMoeda];
    
                let valor = {
    
                    titulo: item.slice(5),
                    moeda: parseFloat(dadosApi.rates[item][segundaMoeda]).toFixed(2)
                }
                totMoeda.push(valor);
                
            }
            setData(totMoeda);
            moedaConverte(valorConversao);
        }
    }

    useEffect(()=>{
        carregaData();
    }, [dadosApi], [])
    
    useEffect(()=>{
        carregaData();
    }, [segundaMoeda], [])
    return (
        <React.Fragment>
            <div className="caixa--grafico">
                {data && 
                    <ResponsiveContainer>
                        <LineChart data={data} margin={{ top: 0, right: 20, left: -30, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="1 1" stroke="#000"/>
                            <XAxis dataKey ="titulo" style={{fontSize: "10px"}} interval={0}/>
                            <YAxis domain={["auto", "auto"]} style={{fontSize: "10px"}} />
                            <Tooltip />
                            <Legend iconSize={20} height={10}/>
                            <Line type="linear" name={segundaMoeda} dataKey={"moeda"} stroke="#ff0000"  />
                        </LineChart>
                    </ResponsiveContainer>
                }
            </div>
        
        </React.Fragment>
    )
}