import styles from '../styles/Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className={styles.header}>
      <img
        src="https://tse1.mm.bing.net/th?id=OIG2.U_dOxi8Rl9.l6A6S_Diz&pid=ImgGn"
        alt="Logo do Site de Jogos"
        className={styles.logo}
      />
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/">Cadastro</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/produtos">Jogos</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/Home">Usuarios</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
