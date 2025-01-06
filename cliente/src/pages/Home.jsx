import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from '../styles/Header.module.css';
import Loading from '../components/Loading';


export default function Home() {

  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    const buscaJogos = async () => {
      try {
        const resposta = await fetch("http://localhost:3001/jogos");
        const dados = await resposta.json();
        setJogos(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    };
    buscaJogos();
  }, []);

  const deletar = async (id) => {
    try {
      await fetch("http://localhost:3001/jogos/" + id, {
        method: 'DELETE'
      });
      setJogos(jogos.filter(jogo => jogo.id !== id));
    } catch {
      alert("Algo deu errado!!");
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    const table = jogos.map(jogo => [
      jogo.id,
      jogo.nome,
      jogo.email,
      jogo.idade,
      jogo.cpf,
      jogo.endereco,
      jogo.pais,
      jogo.idioma
    ]);

    doc.text("Lista de usuarios", 10, 10);
    doc.autoTable({
      head: [["ID", "Nome", "E-mail", "Idade", "CPF", "Endereço", "País", "Idioma"]],
      body: table
    });

    doc.save("Arquivo-tabela-if.pdf");
  };

  const reverseOrder = () => {
    const listaReversa = [...jogos].reverse((a,b) => a.nome.localeCompare(b.nome))
    setJogos(listaReversa)
  }

  const orderAZ = () => {
    const AZ = [...jogos].reverse((a,b) => b.nome.localeCompare(a.nome))
    setJogos(AZ)
  }

  if(jogos.length == 0){
    return <Loading/>
  }

  return (
    <div>
      <Header className={styles.header} />
      <Button variant="contained" onClick={() => exportPDF()} style={{ margin: '10px', color: "black", backgroundColor: "white" }}>Gerar PDF</Button>
      <Link to="/">
        <Button variant="contained"  style={{ margin: '10px', color: "black", backgroundColor: "white" }}>Registrar</Button>
      </Link>
      <Button variant="contained" style={{backgroundColor: "white", color: "black"}}  onClick={() => orderAZ() }>
        De A a Z
      </Button>

      <Button variant="contained" onClick={() => reverseOrder()} style={{margin: '10px', color: "black", backgroundColor: "white"}}>
        Inverter
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Idade</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Endereço</TableCell>
            <TableCell>País</TableCell>
            <TableCell>Idioma</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jogos.map((jogo) => (
            <TableRow key={jogo.id}>
              <TableCell>{jogo.nome}</TableCell>
              <TableCell>{jogo.email}</TableCell>
              <TableCell>{jogo.idade}</TableCell>
              <TableCell>{jogo.cpf}</TableCell>
              <TableCell>{jogo.endereco}</TableCell>
              <TableCell>{jogo.pais}</TableCell>
              <TableCell>{jogo.idioma}</TableCell>
              <TableCell>
                <Button variant="contained" style={{color: "black", backgroundColor: "white" }} onClick={() => deletar(jogo.id)}>Remover</Button>
                <Link to={'/Alterar/' + jogo.id}>
                  <Button variant="contained" style={{color: "black", backgroundColor: "white" }}>Alterar</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Footer className={styles.footer} />
    </div>
  );
}
