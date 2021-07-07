import React, {useState, useEffect} from "react";
import "./App.css";

import { useSelector, useDispatch } from "react-redux";

import { apiRequest } from "./store/CarregaMoedas/CarregaMoedas.actions";

import Cabecalho from "./components/Cabecalho";
import TipoMoeda from "./components/TipoMoeda";
import Grafico from "./components/Grafico";
import Rodape from "./components/Rodape";

import cifrao from "./imagens/cifrao.png";

export default ()=>{
	
	const dadosApi = useSelector(state=>state.carregaMoedas);
	const {moedaUm: moedaPrimaria, moedaDois: moedaSecundaria} = useSelector((state)=>state.moedasSelecionadas);
	const dispatch = useDispatch();

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
	
	useEffect(()=>{
		dispatch(apiRequest(moedaPrimaria));
	}, []);

	useEffect(()=>{
		mudaValorInput("");
	}, [moedaConvertida]);

	return (
		<div className="app">

			<Cabecalho />

			<div className="caixa--principal">

				<div className="moedas--area">
					<div className="cifrao">
						<div className="cifrao--imagem">
							<img src={cifrao} alt="imagem de um saco de dinheiro amarelo" />
						</div>
					</div>
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

					<TipoMoeda />

				</div>
			</div>

			<div className="conteudo--inferior">
				
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

				<p className="grafico--paragrafo">Variação da moeda nos últimos 7 dias</p>
				<div className="grafico">
					
					<Grafico moedaConverte={moedaConverte} />
				</div>
			</div>
			
			<Rodape />

		</div>
	)
}