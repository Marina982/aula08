import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Alterar() {
  const { id } = useParams();
  const [jogos, setJogos] = useState({ nome: '', email: '' });
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const buscaJogos = async () => {
      try {
        const resposta = await fetch(`http://localhost:3000/jogos/${id}`);
        const dados = await resposta.json();
        setJogos(dados);
        setNome(dados.nome);
        setEmail(dados.email);
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
      const resposta = await fetch(`http://localhost:3000/jogos/${id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome,
          email: email
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
    <main>
      <form onSubmit={alterar}>
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
        <button type="submit">Atualizar dados</button>
      </form>
    </main>
  );
}
