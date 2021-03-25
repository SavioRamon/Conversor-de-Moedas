import React, {useState, useEffect} from "react";
import "./Grafico.css";

import {ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from  "recharts";

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
            let valor = {

                titulo: item.slice(5),
                moeda: dados[item][moedaAtual]
            }
            totMoeda.push(valor);
            valorConversao = valor["moeda"];
            
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
                        <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="1 1" stroke="#000"/>
                            <XAxis dataKey="titulo" style={{fontSize: "10px"}} />
                            <YAxis domain={["auto", "auto"]} />
                            <Tooltip />
                            <Legend iconSize={20} />
                            <Line type="linear" name={segundaMoeda} dataKey={"moeda"} stroke="#ff0000" />
                        </LineChart>
                    </ResponsiveContainer>
                }
            </div>
        
        </React.Fragment>
    )
}