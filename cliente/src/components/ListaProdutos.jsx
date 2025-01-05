import { Card, CardMedia, CardContent, Typography, Grid, Button } from "@mui/material";

export default function ListarProdutos({ listaProdutos }) {
    return (
        <Grid container spacing={1}>
            {
                listaProdutos.map((produto) => (
                    <Grid item xs={10} sm={6} md={4} key={produto.id}>
                        <Card sx={{ margin: 6, padding: 3 }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={produto.imagem}
                                alt={produto.item}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {produto.item}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {produto.marca}
                                </Typography>
                                <Typography variant="body2" color="text.primary">
                                    {produto.preco}
                                </Typography>
                                {produto.descricao.map((descricao, index) => (
                                    <Typography key={index} variant="body2" color="text.secondary">
                                        {descricao}
                                    </Typography>
                                ))}
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    style={{ backgroundColor: "white", color: "black"}}
                                    onClick={() => adicionarProdutoPedido(produto)}>
                                    Comprar
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
            {/* Espaço extra no final da lista */}
            <Grid item xs={12}>
                <div style={{ height: '150px' }}></div>
            </Grid>
        </Grid>
    );
}
