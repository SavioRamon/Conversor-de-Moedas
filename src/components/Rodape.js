import React from "react";
import "./Rodape.css";

import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';

export default () => {
    return (
        <div className="rodape--conteudo">
            <p className="rodape--paragrafo">Este é um site em desenvolvimento. Caso encontre algum erro, me informe através do link de contato para que eu possa resolver o mais breve possível.</p>
            
            <ul className="lista--contatos" type="none">
                <hr />
                <li className="link--contato"><a  target="_blank" href="mailto:cambiomoedacontato@gmail.com?subject=CâmbioMoeda"><span><MailIcon /></span> Contato</a></li>
                <li className="link--github"><a target="_blank" href="https://www.github.com/savioramon"><span><GitHubIcon /></span> GitHub</a></li>
                <li className="link--linkedin"><a target="_blank" href="https://www.linkedin.com/in/sávio-ramon-87b1041b7"><span><LinkedInIcon /></span> LinkedIn</a></li>
            </ul>
            
        </div>
    )
}