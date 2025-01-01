import { useState } from "react";
import jsPDF from 'jspdf';
import'jspdf-autotable'
import { useNavigate } from "react-router-dom"
import autoTable from "jspdf-autotable";


export default function Registrar() {
 
  const [Nome, setNome] = useState('');
  const [Email, setEmail] = useState('');

  const navigation = useNavigate() ;

    const registrar = async (event) => {
      event.preventDefault();
try{
    const resposta = await fetch("http://localhost:3000/jogos",{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      nome: Nome,
      email: Email
    })
  });
  if(resposta.ok){
    navigation('/');
  }
}catch(err){
  alert('Ocorreu um erro na aplicação', err);
}
}


  return (
        <main>
          <form onSubmit={registrar}>

<input 
type="text" 
value={Nome} 
placeholder="Nome" 
onChange={(event) => setNome(event.target.value)}/>

<input 
type="text"
value={Email} 
placeholder="Email" 
onChange={(event) => setEmail(event.target.value)}/>

<button type="submit">Registrar</button>

          </form>
        </main>
  );
}