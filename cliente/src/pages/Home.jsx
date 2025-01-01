import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import styles from '../styles/Header.module.css';

export default function Home() {

  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    const buscaJogos = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/jogos");
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
      await fetch("http://localhost:3000/jogos/" + id, {
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
      jogo.email
    ]);

    doc.text("Lista de usuarios", 10, 10);
    doc.autoTable({
      head: [["id", "Nome", "E-mail"]],
      body: table
    });

    doc.save("Arquivo-tabela-if.pdf");
  };

  return (
    <div>
      <Header className={styles.header} />
      <Button variant="contained" onClick={() => exportPDF()}>Gerar PDF</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jogos.map((jogo) => (
              <TableRow key={jogo.id}>
                <TableCell>{jogo.nome}</TableCell>
                <TableCell>{jogo.email}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => deletar(jogo.id)}>Remover</Button>
                  <Link to={'/Alterar/' + jogo.id}>
                    <Button variant="contained">Alterar</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
