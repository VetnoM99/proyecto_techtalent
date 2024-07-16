import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import PuertoImage from '../assets/Puerto 0.jpg';
import PulpoImage from '../assets/Pulpo 2.jpg';
import PaellaImage from '../assets/Paella OK .jpg';
import Ticket from '../assets/Ticket1.jpg';
import App from '../assets/App.jpg'

const QuienesSomos: React.FC = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Quiénes somos
                </Typography>
                <Typography variant="body1">
                "Del mar a tu mesa". Nos comprometemos a ofrecer productos de la más alta calidad mientras protegemos nuestras costas.
                        Con el proyecto 'Port⭕Net', lideramos la lucha contra el plástico y las prácticas insostenibles."
                        
                        Con cada ticket de compra que el cliente haga en uno de nuestros restaurantes/socios, aportará una pequeña cantidad a 
                        la causa. Sin tener que pagar extras y con un mínimo porcentaje que la empresa no resentirá en sus ingresos. Así podremos
                        aportar todos directamente. 
                        
                        Tu mismo desde la App podrás donar los puntos a la ONG que prefieras. En el caso de que no
                        dispongas del tiempo para poderlo hacer, no te preocupes. Cada seis meses hacemos recuento de los votos perdidos y se
                        repartirán de manera equitativa entre todas las ONG."

                </Typography>
                <Box display="flex" justifyContent="center" my={4} flexWrap="wrap" gap={2}>
                    <img src={PuertoImage} alt="Ocean" style={{ width: '32%', maxWidth: '600px', height: '300px' }} />
                    <img src={PulpoImage} alt="Pulpo" style={{ width: '32%', maxWidth: '600px', height: '300px' }} />
                    <img src={PaellaImage} alt="Paella" style={{ width: '32%', maxWidth: '600px', height: '300px' }} />
                    <img src={Ticket} alt="Ticket" style={{ width: '35%', maxWidth: '600px', height: '300px' }} />
                    <img src={App} alt="App" style={{ width: '35%', maxWidth: '600px', height: '300px' }} />
                </Box>
                <Typography variant="h5" component="h1" gutterBottom>
                Nuestro objetivo:
                </Typography>
                <Typography>
                Ante las alarmantes noticias sobre la contaminación plástica en el mar y sus devastadores efectos, en 2024 decidimos actuar. 
                Así nació el proyecto Port⭕Net, diseñado en consonancia con los Objetivos de Desarrollo Sostenible (ODS). Nuestro objetivo principal es limpiar más de 1000 km² del fondo marino de la Costa Dorada, promoviendo al mismo tiempo prácticas de pesca responsable y sostenible, y dejando atrás métodos destructivos que dañan los ecosistemas a corto y largo plazo.
                Los restaurantes de la zona se han comprometido a donar una parte de cada venta para apoyar a las ONG que se dedican a la recolección de basura marina y la protección de especies. 
                Estas donaciones ayudarán a cubrir los costos de los equipos de buceo, Zodiacs, barcos, lanchas y otros vehículos necesarios para llevar a cabo estas importantes y complejas tareas.
                </Typography>
                <Typography variant="h5" component="h1" gutterBottom>
                Restaurantes colaboradores del proyecto:
                </Typography>
                <Typography>
                Nos comprometemos a ofrecer productos de la más alta calidad mientras protegemos nuestros océanos.
                Con el proyecto 'Port⭕Net', lideramos la lucha contra el plástico y las prácticas insostenibles. Cada vez más la cantidad
                de comercios aumenta. Pero por ahora, en uno de los pueblos más bellos del Mediterraneo cuenta con los cinco principales líderes
                de este gran proyecto que cada vez coge más forma. Conócelos haciendo click sobre la imagen.

                </Typography>
            </Box>
        </Container>
    );
};

export default QuienesSomos;

