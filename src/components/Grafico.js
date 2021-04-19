import React, {useState, useEffect} from "react";
import "./Grafico.css";

import {ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, } from  "recharts";

export default ({ dados, primeiraMoeda, segundaMoeda, moedaConverte } )=>{
    
    const [data, setData] = useState("");

    const carregaData = ()=>{
        const totMoeda = [];
        let moedaAtual = [];
        const totValor = [];

        let valorConversao = "";

        for(let item in dados) {
            for(let m in dados[item]) {
                moedaAtual = m;
                totValor.push(dados[item][m])
            }
            
            valorConversao = dados[item][moedaAtual];


            let valor = {

                titulo: item.slice(5),
                moeda: parseFloat(dados[item][moedaAtual]).toFixed(2)
            }
            totMoeda.push(valor);
            console.log(typeof(valor.moeda))
            
        }
        
        setData(totMoeda);
        moedaConverte(valorConversao);


    }

    useEffect(()=>{
        carregaData();
    }, [dados])

    return (
        <React.Fragment>
            <div className="caixa--grafico">
                {dados && 
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