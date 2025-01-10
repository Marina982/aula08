import ListarProdutos from "../components/ListaProdutos";
import Header from "../components/Header";
import styles from '../styles/Header.module.css';
import { useState } from "react";
import Footer from "../components/Footer";
import { Button } from "@mui/material";

export default function Produtos() {
    const [listaProdutos, setProdutos] = useState([
        {
            id: 1,
            item: "The Last of Us Part I",
            imagem: "https://image.api.playstation.com/vulcan/img/rnd/202011/1020/FKgazVvG7BcWouCr39mIiXkW.png?w=230&thumb=false",
            preco: 99.99,
            marca: "Naughty Dog",
            descricao: ["Ação,", "Aventura"]
        },
        {
            id: 2,
            item: "God of War",
            imagem: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png?w=230&thumb=false",
            preco: 299.99,
            marca: "Santa Monica Studio",
            descricao: ["Ação,", "Aventura"]
        },
        {
            id: 3,
            item: "Ghost of Tsushima",
            imagem: "https://image.api.playstation.com/vulcan/ap/rnd/202106/2322/c16gs6a7lbAYzPf7ZTikbH1c.png?w=230&thumb=false",
            preco: 299.99,
            marca: "Sucker Punch Productions",
            descricao: ["Ação,", "Aventura"]
        },
        {
            id: 4,
            item: "Spider-Man: Miles Morales",
            imagem: "https://image.api.playstation.com/vulcan/ap/rnd/202008/1020/T45iRN1bhiWcJUzST6UFGBvO.png?w=230&thumb=false",
            preco: 343.99,
            marca: "Insomniac Games",
            descricao: ["Ação,", "Aventura"]
        },
        {
            id: 5,
            item: "Horizon Zero Dawn",
            imagem: "https://image.api.playstation.com/vulcan/ap/rnd/202409/2716/16b33fa9a5c7285ba86a035b4a1c5f8eb430b407eae35ffd.png?w=230&thumb=false",
            preco: 149.99,
            marca: "Guerrilla Games",
            descricao: ["RPG,", "Aventura"]
        },
        {
            id: 6,
            item: "Uncharted 4: A Thief's End",
            imagem: "https://image.api.playstation.com/vulcan/img/rnd/202011/1018/SGqMZHd7WWmN4XIcLfYMxJsc.png?w=230&thumb=false",
            preco: 200.99,
            marca: "Naughty Dog",
            descricao: ["Ação,", "Aventura"]
        }
    ]);

    

    const reverseOrder = () => {
        const listaReversa = [...listaProdutos].reverse((a, b) => a.item.localeCompare(b.item));
        setProdutos(listaReversa);
    };

    const orderAZ = () => {
        const AZ = [...listaProdutos].sort((a, b) => a.item.localeCompare(b.item));
        setProdutos(AZ);
    };

    const crescente = () => {
        const menorMaior = [...listaProdutos].sort((a, b) => a.preco - b.preco);
        setProdutos(menorMaior);
    };

    const decrescente = () => {
        const maiorMenor = [...listaProdutos].sort((a, b) => b.preco - a.preco);
        setProdutos(maiorMenor);
    };


    const consultar = (Pesquisar) => {
        const consulta = [...listaProdutos].filter(produto => 
            produto.item.toLowerCase().includes(Pesquisar.toLowerCase())
        )
        setProdutos(consulta)
    }

    return (
        <div>
            <Header className={styles.header} />
            <Button variant="contained" style={{ color: "black", backgroundColor: "white" }} onClick={() => orderAZ()}>
                AZ
            </Button>
            <Button variant="contained" onClick={() => reverseOrder()} style={{ margin: '10px', color: "black", backgroundColor: "white" }}>
                Reverter
            </Button>
            <Button variant="contained" onClick={() => crescente()} style={{ margin: '10px', color: "black", backgroundColor: "white" }}>
                Menor para o Maior
            </Button>
            <Button variant="contained" onClick={() => decrescente()} style={{ margin: '10px', color: "black", backgroundColor: "white" }}>
                Maior para o Menor
            </Button>
            <input
                type="text"
                placeholder="Search"
                onChange={(event) => consultar(event.target.value)}
            />
            <ListarProdutos listaProdutos={listaProdutos} />
            <Footer className={styles.footer} />
        </div>
    );
}
