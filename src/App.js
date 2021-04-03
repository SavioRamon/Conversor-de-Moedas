import React, {useState, useEffect} from "react";
import "./App.css";

import TipoMoeda from "./components/TipoMoeda";
import Grafico from "./components/Grafico";

export default ()=>{

	const [dadosMoeda, setDadosMoeda] = useState("");
	const [dadosGrafico, setDadosGrafico] = useState("");

	const [moedaPrimaria, setMoedaPrimaria] = useState("USD");
	const [moedaSecundaria, setMoedaSecundaria] = useState("BRL");
	
	const [moedaConvertida, setMoedaConvertida] = useState("");

	const [valorPrimeiroInput, setValorPrimeiroInput] = useState(1);
	const [valorSegundoInput, setValorSegundoInput] = useState(moedaConvertida);


	const mudaValorInput = (valor)=>{

		// A função irá analisar se ela foi chamada através da digitação no teclado ou por seleção de moedas, processando a informação e guardando na variável 'novoValor' 

		let novoValor = "";

		if (valor) {
			let numero = parseFloat(valor.target.value);
			setValorPrimeiroInput(valor.target.value);
			if(typeof(numero) === "number" && numero >= 0) {
				novoValor = numero * moedaConvertida;
			}
			
		} else {
			let numero = parseFloat(valorPrimeiroInput);
			if(typeof(numero) === "number" && numero >= 0) {
				novoValor = numero * moedaConvertida;
			};
		}

		// Essa parte da função irá analisar se 'novoValor' foi alterado ou continua uma variável vazia, mudando o valor do segundo input para um valor em float ou um campo vazio.

		
	
		if(novoValor) {	
			setValorSegundoInput(parseFloat(novoValor).toFixed(2).replace(".", ","));
		} else {
			setValorSegundoInput(novoValor);
		}
	}


	const moedaConverte = (valor)=>{
		setMoedaConvertida(valor);
	}


	const carregaDados = (moedaPrimaria, moedaSecundaria)=>{
		let data = new Date();

		let dia = data.getDate();
		let diasPassados = dia - 6;
		let mes = data.getMonth()+1;
		let ano = data.getFullYear();

		if(dia < 10) {
			dia = `0${dia}`
		}
		if(mes < 10) {
			mes = `0${mes}`
		}
		
		const requisicaoTodaMoeda = `https://api.exchangerate.host/timeseries?start_date=
		${ano}-${mes}-${diasPassados}&end_date=
		${ano}-${mes}-${dia}&symbols=USD,BRL,EUR,GBP,JPY,AUD,CHF,CAD,RMB,ARS,TRL`;
		
		const requisicaoParcial = `https://api.exchangerate.host/timeseries?start_date=
		${ano}-${mes}-${diasPassados}&end_date=
		${ano}-${mes}-${dia}&base=${moedaPrimaria}&symbols=${moedaSecundaria}`;
			
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
	}, []);

	useEffect(()=>{
		mudaValorInput("");
	}, [moedaConvertida]);

	return (
		<div className="app">
			<div className="caixa--principal">
				
				<div className="moedas--area">

					<div className="moeda--conversao">
						<input 
						    value={valorPrimeiroInput} 
							onChange={(valor)=> mudaValorInput(valor)} 
							type="number" 
							name="input--primeiro--valor" 
							className="input--primeiro--valor" 
							style={
								valorSegundoInput || valorSegundoInput === 0? {boxShadow: "none"} : {boxShadow: "0px 0px 5px #ff0000"}
						    }
						/>

						<input 
						    value={valorSegundoInput} 
							name="input--segundo--valor" 
							className="input--segundo--valor"  
							readOnly 
						/>

					</div>

					{dadosMoeda &&
						<TipoMoeda item={dadosMoeda} trocaPrimaria={setMoedaPrimaria} trocaSecundaria={setMoedaSecundaria} carregaDados={carregaDados} />
					}

				</div>
			</div>
				
			<div className="moeda--hoje">
				{
					moedaConvertida &&
					<div className="moeda--hoje--valor">
						<p>Hoje, 
							<span style={{color: "#ff0000"}}> 1 </span> 
							{moedaPrimaria} = 
							<span style={{color: "#ff0000"}}>
								{` ${moedaConvertida? parseFloat(moedaConvertida).toFixed(2).replace(".", ",") : "Indisponível"} `}
							</span> 
							{moedaSecundaria}
						</p>
					</div>
				}
					
			</div>

			<div className="grafico">
				<p>Variação da moeda nos últimos 7 dias</p>
				<Grafico dados={dadosGrafico.rates} primeiraMoeda={moedaPrimaria} segundaMoeda={moedaSecundaria} moedaConverte={moedaConverte} />
			</div>

		</div>
	)
}