import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import styles from '../styles/Form.module.css';

export default function Alterar() {
  const { id } = useParams();
  const [jogos, setJogos] = useState({
    nome: '',
    email: '',
    idade: '',
    cpf: '',
    endereco: '',
    pais: '',
    idioma: ''
  });
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [pais, setPais] = useState('');
  const [idioma, setIdioma] = useState('');

  useEffect(() => {
    const buscaJogos = async () => {
      try {
        const resposta = await fetch(`http://localhost:3001/jogos/${id}`);
        const dados = await resposta.json();
        setJogos(dados);
        setNome(dados.nome);
        setEmail(dados.email);
        setIdade(dados.idade);
        setCpf(dados.cpf);
        setEndereco(dados.endereco);
        setPais(dados.pais);
        setIdioma(dados.idioma);
      } catch (err) {
        console.error('Ocorreu um erro no app:', err);
        alert('Ocorreu um erro no app!');
      }
    };
    buscaJogos();
  }, [id]);

  const alterar = async (event) => {
    event.preventDefault();
    try {
      const resposta = await fetch(`http://localhost:3001/jogos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          idade,
          cpf,
          endereco,
          pais,
          idioma
        })
      });
      if (!resposta.ok) {
        alert("Erro ao alterar");
      }
      const attDados = await resposta.json();
      setJogos(attDados);
      alert("Dados atualizados");
    } catch (err) {
      alert('Ocorreu um erro ao atualizar.');
    }
  };

  return (
    <div>
      <Header className={styles.header} />
      <main className={styles.main}>
        <form onSubmit={alterar} className={styles.form}>
          <input
            type="text"
            value={nome}
            placeholder="Nome"
            onChange={(event) => setNome(event.target.value)}
          />
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            value={idade}
            placeholder="Idade"
            onChange={(event) => setIdade(event.target.value)}
          />
          <input
            type="text"
            value={cpf}
            placeholder="CPF"
            onChange={(event) => setCpf(event.target.value)}
          />
          <input
            type="text"
            value={endereco}
            placeholder="Endereço"
            onChange={(event) => setEndereco(event.target.value)}
          />
          <input
            type="text"
            value={pais}
            placeholder="País"
            onChange={(event) => setPais(event.target.value)}
          />
          <input
            type="text"
            value={idioma}
            placeholder="Idioma"
            onChange={(event) => setIdioma(event.target.value)}
          />
          <button type="submit">Atualizar dados</button>
        </form>
      </main>
    </div>
  );
}
