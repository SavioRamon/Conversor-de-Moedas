import React, {useState, useEffect} from "react";
import "./App.css";

import Cabecalho from "./components/Cabecalho";
import TipoMoeda from "./components/TipoMoeda";
import Grafico from "./components/Grafico";

export default ()=>{

	const [dadosMoeda, setDadosMoeda] = useState("");
	const [dadosGrafico, setDadosGrafico] = useState("");

	const [moedaPrimaria, setMoedaPrimaria] = useState("USD");
	const [moedaSecundaria, setMoedaSecundaria] = useState("BRL");
	
	const [moedaConvertida, setMoedaConvertida] = useState("");

	const moedaConverte = (valor)=>{
		setMoedaConvertida(valor);
	}


	const carregaDados = (moedaPrimaria, moedaSecundaria)=>{
		let data = new Date();

		let dia = data.getDate();
		let diasPassados = dia - 7;
		let mes = data.getMonth()+1;
		let ano = data.getFullYear();

		if(dia < 10) {
			dia = `0${dia}`
		}
		if(mes < 10) {
			mes = `0${mes}`
		}
		

		console.log(dia, mes, ano);
		const requisicaoTodaMoeda = `https://api.exchangerate.host/timeseries?start_date=
		${ano}-${mes}-${diasPassados}&end_date=
		${ano}-${mes}-${dia}&places=2&symbols=USD,BRL,EUR,GBP,JPY,AUD,CHF,CAD,RMB,ARS,TRL`;
		
		const requisicaoParcial = `https://api.exchangerate.host/timeseries?start_date=
		${ano}-${mes}-${diasPassados}&end_date=
		${ano}-${mes}-${dia}&places=2&base=${moedaPrimaria}&symbols=${moedaSecundaria}`;
			
		let requestURL = !dadosMoeda? requisicaoTodaMoeda : requisicaoParcial;

		let request = new XMLHttpRequest();
		request.open('GET', requestURL);
		request.responseType = 'json';
		request.send();
				
		request.onload = ()=>{
			let response = request.response;
			dadosMoeda && setDadosGrafico(response);
			!dadosMoeda && setDadosMoeda(response);
		};
	}

	useEffect(()=>{
		carregaDados(moedaPrimaria, moedaSecundaria);
	}, [])

	return (
		<div className="app">
			<div className="caixa--principal">
				<Cabecalho />

				<div className="moedas--area">
					{dadosMoeda &&
						<TipoMoeda item={dadosMoeda} trocaPrimaria={setMoedaPrimaria} trocaSecundaria={setMoedaSecundaria} carregaDados={carregaDados} />
					}
				</div>
				
				<div className="caixa--conversao">
					{
						moedaConvertida &&
						<div className="moeda--convertida">
							{`${moedaPrimaria} para ${moedaSecundaria} hoje: 
							${moedaConvertida? moedaConvertida : "Indisponível"}`}
						</div>
					}
				</div>

				<div className="grafico">
					<Grafico dados={dadosGrafico.rates} primeiraMoeda={moedaPrimaria} segundaMoeda={moedaSecundaria} moedaConverte={moedaConverte} />
				</div>

			</div>
		</div>
	)
}