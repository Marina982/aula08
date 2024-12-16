import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import'jspdf-autotable'
import { Button } from "@mui/material"
import { Link } from "react-router-dom";
import Header from "../components/Header";
import styles from '../styles/Header.module.css';

export default function Home() {

  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    const buscaJogos = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setJogos(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscaJogos();
  }, [jogos])

const deletar = async (id) => {
  try{
     await fetch('http://localhost:3000/usuarios/' + id, {
      method: 'DELETE'
});
  }catch{
alert("Algo deu errado!!")
  }
}


const exportPDF = () => {
  const doc = new jsPDF();

  const table = jogos.map(jogo => [
    jogo.nome,
    jogo.email

  ]);
  doc.text("Lista de usuarios", 10, 10);
  doc.autoTable({
  head:[["Nome", "E-mail"]],
  body: table
  });

  doc.save("Arquivo-tabela-if")
}


  return (

    <table>
      <>
      <Header/>
    <Button variant="contained" onClick={()=> exportPDF()}>Gerar PDF</Button>
  </>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {jogos.map((jogo) =>
        <tr key={jogo.id}>
          <td>{jogo.nome}</td>
          <td>{jogo.email}</td>
          <td><button onClick={() => deletar(jogo.id)} >Remover</button></td>
          <Link to={'/Alterar' + jogos.id}>
<button>Alterar</button>
</Link>
        </tr>

      
      )}
    </table>
  );
}