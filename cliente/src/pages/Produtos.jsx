import ListarProdutos from "../components/ListaProdutos";
import Header from "../components/Header";
import styles from '../styles/Header.module.css';
import { useState } from "react";
import Footer from "../components/Footer";
import {Button} from "@mui/material";


export default function Produtos() {
    const [listaProdutos, setProdutos] = useState([
        {
            id: 1,
            item: "Tênis Adidas Breaknet",
            imagem: "https://static.netshoes.com.br/produtos/tenis-adidas-breaknet-feminino/90/NQQ-4379-890/NQQ-4379-890_zoom1.jpg?ts=1711641809&ims=326x",
            preco: 990,
            marca: "Adidas",
            descricao: ["Social,", "Branco"]
        },
        {
            id: 2,
            item: "Tênis ASICS GEL-Kimera",
            imagem: "https://static.netshoes.com.br/produtos/tenis-mizuno-wave-titan-2-masculino/06/2FU-6367-006/2FU-6367-006_zoom1.jpg?ts=1714414001&ims=326x",
            preco: 100,
            marca: "Asics",
            descricao: ["Social,", "Branco"]
        },
        {
            id: 3,
            item: "Tênis Adidas Breaknet",
            imagem: "https://static.netshoes.com.br/produtos/tenis-adidas-breaknet-masculino/90/NQQ-4378-890/NQQ-4378-890_zoom1.jpg?ts=1705939673&ims=326x",
            preco: 545,
            marca: "Adidas",
            descricao: ["Social,", "Branco"]
        },
        {
            id: 4,
            item: "Adidas Esportiva",
            imagem: "https://static.netshoes.com.br/produtos/tenis-adidas-response-runner/26/FB9-3696-026/FB9-3696-026_zoom1.jpg?ts=1721239502&ims=326x",
            preco: 454,
            marca: "Adidas",
            descricao: ["Social,", "Branco"]
        },
        {
            id: 5,
            item: "Puma RBD",
            imagem: "https://static.netshoes.com.br/produtos/tenis-puma-rbd-game-bdp/24/2I3-5479-024/2I3-5479-024_zoom1.jpg?ts=1695699428&ims=326x",
            preco: 222,
            marca: "PUMA",
            descricao: ["Social,", "Branco"]
        },
        {
            id: 6,
            item: "Tênis Everlast Racer",
            imagem: "https://static.netshoes.com.br/produtos/tenis-everlast-racer-unissex/58/AXB-7183-158/AXB-7183-158_zoom2.jpg?ts=1700223666&ims=326x",
            preco: 100,
            marca: "EverLast",
            descricao: ["Social,", "Branco"]
        }
    ]);


    const reverseOrder = () => {
        const listaReversa = [...listaProdutos].reverse((a,b) => a.nome.localeCompare(b.nome))
        setProdutos(listaReversa)
      }
  
  
      const orderAZ = () => {
        const AZ = [...listaProdutos].reverse((a,b) => b.nome.localeCompare(a.nome))
        setProdutos(AZ)
      }


      const crescente = () => {
        const menorMaior = [...listaProdutos].sort((a,b) => a.preco - b.preco)
        setProdutos(menorMaior)
      }
      
      const decrescente = () => {
        const maiorMenor = [...listaProdutos].sort((a,b) => b.preco - a.preco)
        setProdutos(maiorMenor)
      }

    return (
            <div>
                <Header className={styles.header} />


                <Button variant="contained" onClick={() => orderAZ() }>
                AZ
                </Button>


                 <Button variant="contained" onClick={() => reverseOrder()} style={{margin: '10px'}}>
                Reverser
                 </Button>

                 <Button variant="contained" onClick={() => crescente()} style={{margin: '10px'}}>
                Menor para o Maior
                 </Button>

                 <Button variant="contained" onClick={() => decrescente()} style={{margin: '10px'}}>
                Maior para o Menor
                 </Button>

                <ListarProdutos listaProdutos={listaProdutos} />
                <Footer className={styles.footer} />
            </div>
    
    );
}
