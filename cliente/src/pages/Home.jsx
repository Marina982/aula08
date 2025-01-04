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

  return (
    <div>
      <Header className={styles.header} />
      <Button variant="contained" onClick={() => exportPDF()} style={{ margin: '10px' }}>Gerar PDF</Button>
      <Link to="/registrar">
        <Button variant="contained" color="" style={{ margin: '10px' }}>Registrar</Button>
      </Link>
      <TableContainer component={Paper}>
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
                  <Button variant="contained" color="primary" onClick={() => deletar(jogo.id)}>Remover</Button>
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
