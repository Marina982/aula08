import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/RegistrosForm.module.css';  
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Registrar() {
  const [Nome, setNome] = useState('');
  const [Email, setEmail] = useState('');
  const [Idade, setIdade] = useState('');
  const [Cpf, setCpf] = useState('');
  const [Endereco, setEndereco] = useState('');
  const [Pais, setPais] = useState('');
  const [Idioma, setIdioma] = useState('');

  const navigate = useNavigate();

  const registrar = async (event) => {
    event.preventDefault();
    try {
      const resposta = await fetch("http://localhost:3001/jogos", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: Nome,
          email: Email,
          idade: Idade,
          cpf: Cpf,
          endereco: Endereco,
          pais: Pais,
          idioma: Idioma
        })
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

  return (
    <main>
      <Header />

      <div className={styles["form-container"]}>
        <form onSubmit={registrar} className={styles.form}>
          <input
            type="text"
            value={Nome}
            placeholder="Nome"
            onChange={(event) => setNome(event.target.value)}
          />
          <input
            type="email"
            value={Email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="number"
            value={Idade}
            placeholder="Idade"
            onChange={(event) => setIdade(event.target.value)}
          />
          <input
            type="text"
            value={Cpf}
            placeholder="CPF"
            onChange={(event) => setCpf(event.target.value)}
          />
          <input
            type="text"
            value={Endereco}
            placeholder="Endereço"
            onChange={(event) => setEndereco(event.target.value)}
          />
          <input
            type="text"
            value={Pais}
            placeholder="País"
            onChange={(event) => setPais(event.target.value)}
          />
          <input
            type="text"
            value={Idioma}
            placeholder="Idioma"
            onChange={(event) => setIdioma(event.target.value)}
          />
          <button type="submit">Registrar</button>
        </form>
        <Footer className={styles.footer} />
      </div>
    </main>
  );
}
