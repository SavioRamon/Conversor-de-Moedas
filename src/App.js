import React, {useState, useEffect} from "react";
import "./App.css";

import { useSelector, useDispatch } from "react-redux";

import { convertendo } from "./store/Conversor/Conversor.actions";
import { apiRequest } from "./store/CarregaMoedas/CarregaMoedas.actions";

import Cabecalho from "./components/Cabecalho";
import TipoMoeda from "./components/TipoMoeda";
import Grafico from "./components/Grafico";
import Rodape from "./components/Rodape";

import cifrao from "./imagens/cifrao.png";

export default ()=>{
	
	const dadosApi = useSelector(state=>state.carregaMoedas);
	const {moedaUm: moedaPrimaria, moedaDois: moedaSecundaria, resultado} = useSelector((state)=>state.moedasSelecionadas);
	const dispatch = useDispatch();

	const [valorPrimeiroInput, setValorPrimeiroInput] = useState(1);

	const valorBase = ()=>{
		let data = new Date();

		let dia = data.getDate();
		let mes = data.getMonth()+1;
		let ano = data.getFullYear();

		if(dia < 10) {
			dia = `0${dia}`
		}	
		if(mes < 10) {
			mes = `0${mes}`
		}
		
		return dadosApi.resposta.rates[`${ano}-${mes}-${dia}`][moedaSecundaria]
		
	}
	
	
	useEffect(()=>{
		dispatch(apiRequest(moedaPrimaria));
	}, []);

	useEffect(()=>{
		if(dadosApi.resposta){
			dispatch(convertendo(valorPrimeiroInput, valorBase()));
		}
	}, [dadosApi])

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
							onChange={(valor)=> {
								setValorPrimeiroInput(valor.target.value);
								dispatch(convertendo(valor.target.value, valorBase()));
							}} 
							type="number" 
							name="input--primeiro--valor" 
							className="input--primeiro--valor" 
							style={
								typeof parseFloat(valorPrimeiroInput) === "number" && valorPrimeiroInput >= 0? {boxShadow: "none"} : {boxShadow: "0px 0px 5px #ff0000"}
						    }
						/>

						<input 
						    value={resultado} 
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
						resultado &&
						<div className="moeda--hoje--valor">
							<p>Hoje, 
								<span style={{color: "#ff0000"}}> 1 </span> 
								{moedaPrimaria} = {valorBase().toFixed(2).replace(".", ",")} {moedaSecundaria}
							</p>
						</div>
					}
						
				</div>

				<p className="grafico--paragrafo">Variação da moeda nos últimos 7 dias</p>
				<div className="grafico">
					
					<Grafico />
				</div>
			</div>
			
			<Rodape />

		</div>
	)
}