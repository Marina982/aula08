import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import styles from '../styles/Form.module.css';
import Footer from "../components/Footer";

import { useNavigate } from "react-router-dom";

export default function Formulario() {

  const navigate = useNavigate();

  const { id } = useParams();
  const isEdit = !!id;
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    idade: '',
    cpf: '',
    endereco: '',
    pais: '',
    idioma: ''
  });

  useEffect(() => {
    if (isEdit) {
      const buscaDados = async () => {
        try {
          const resposta = await fetch(`http://localhost:3001/jogos/${id}`);
          const dados = await resposta.json();
          setDados(dados);
        } catch (err) {
          console.error('Ocorreu um erro no app:', err);
          alert('Ocorreu um erro no app!');
        }
      };
      buscaDados();
    }
  }, [id, isEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = isEdit ? `http://localhost:3001/jogos/${id}` : 'http://localhost:3001/jogos';
      const method = isEdit ? 'PUT' : 'POST';
      const resposta = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      if (resposta.ok) {
        navigate('/Home');  
      } else {
        const errorData = await resposta.json();
        alert('Ocorreu um erro na aplicação: ' + errorData.message);
      }
    } catch (err) {
      alert('Ocorreu um erro de rede na aplicação');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDados({ ...dados, [name]: value });
  };

  return (
    <div>
      <Header className={styles.header} />
      
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="nome"
            value={dados.nome}
            placeholder="Nome"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={dados.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="text"
            name="idade"
            value={dados.idade}
            placeholder="Idade"
            onChange={handleChange}
          />
          <input
            type="text"
            name="cpf"
            value={dados.cpf}
            placeholder="CPF"
            onChange={handleChange}
          />
          <input
            type="text"
            name="endereco"
            value={dados.endereco}
            placeholder="Endereço"
            onChange={handleChange}
          />
          <input
            type="text"
            name="pais"
            value={dados.pais}
            placeholder="País"
            onChange={handleChange}
          />
          <input
            type="text"
            name="idioma"
            value={dados.idioma}
            placeholder="Idioma"
            onChange={handleChange}
          />
          <button type="submit">Alterar</button>
        </form>
        <Footer className={styles.footer} />
      </main>
    </div>
  );
}
