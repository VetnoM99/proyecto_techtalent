<<<<<<< HEAD
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material'; 

=======
import React, { useRef, useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import bioagrad1 from '../assets/bioagradebles.jpg';
import bioagrad2 from '../assets/bioagradables-RafaBeladiez-010.jpg';
import bioagrad3 from '../assets/bioagradables2.png';
import bioagrad4 from '../assets/bioagradables-colabora-institucion-academica.jpg';
import '../styles/Home.css';

const images = [bioagrad1, bioagrad2, bioagrad3, bioagrad4];
const texts = [
    "Fundados en el año 2024, nuestro objetivo es lograr un futuro limpio y sostenible en la Costa Dorada para 2030, donde nuestras especies se conserven en paz y de manera sana en un mar completamente limpio. Únete a nuestro programa de voluntariado y ayuda a limpiar nuestras playas y océanos. Cada pequeño esfuerzo cuenta para mantener nuestras costas libres de residuos y asegurar un hábitat seguro para la vida marina.",
    "Participa en nuestros talleres educativos y aprende sobre la importancia de conservar nuestros océanos. Fomentamos la conciencia ambiental entre las nuevas generaciones para un futuro más sostenible.",
    "Colabora con nosotros como empresa y demuéstrale al mundo tu compromiso con la sostenibilidad. Juntos podemos implementar prácticas responsables y reducir el impacto ambiental de nuestras actividades.",
    "Apoya nuestras iniciativas de investigación científica para monitorear y analizar la salud de nuestros océanos. Con datos precisos y actualizados, podemos desarrollar estrategias efectivas para su protección y conservación."
];
>>>>>>> a3942194c8660697bb0f2c6e0df17e4645453177

const buttonLinks = [
    "/contacto",
    "/participa",
    "/quienes-somos",
    "/proyecto"
];

const Home: React.FC = () => {
<<<<<<< HEAD
=======
    const refs = useRef<HTMLDivElement[]>([]);
    const [visibleStates, setVisibleStates] = useState<boolean[]>(new Array(images.length).fill(false));

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = refs.current.indexOf(entry.target as HTMLDivElement);
                        if (index !== -1) {
                            setVisibleStates((prev) => {
                                const newStates = [...prev];
                                newStates[index] = true;
                                return newStates;
                            });
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        refs.current.forEach((ref) => ref && observer.observe(ref));

        return () => {
            refs.current.forEach((ref) => ref && observer.unobserve(ref));
        };
    }, []);

>>>>>>> a3942194c8660697bb0f2c6e0df17e4645453177
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                   Bienvenidos a Port⭕Net
                </Typography>
                <HomeIcon /> 
                <Typography>
                Trabajamos para combatir la contaminación marítima y proteger nuestros océanos.
            Fundados en el año 2024 nuestro objetivo está que en 2030 poder lograr un futuro limpio y sostenible la Costa Dorada.
            En la que nuestras especies se conserven en paz y de manera sana en un mar completamente limpio.
                </Typography>
<<<<<<< HEAD
=======

                <Box
                    mt={4}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <a
                        href=""
                        style={{
                            position: 'relative',
                            display: 'inline-block',
                            padding: '10px 20px',
                            textDecoration: 'none',
                            color: '#fff',
                            backgroundColor: '#0073e6',
                            borderRadius: '4px',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = 'translateX(10px) translateY(-10px)';
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = 'none';
                        }}
                    >
                        Apoya
                    </a>
                </Box>

                {images.map((src, index) => (
                    <Grid
                        container
                        key={index}
                        ref={(el) => (refs.current[index] = el!)}
                        spacing={2}
                        alignItems="center"
                        sx={{
                            opacity: visibleStates[index] ? 1 : 0,
                            transform: visibleStates[index]
                                ? 'translateX(0)'
                                : index % 2 === 0
                                    ? 'translateX(-100%)'  // Mueve la imagen desde la izquierda fuera del contenedor
                                    : 'translateX(100%)',   // Mueve la imagen desde la derecha fuera del contenedor
                            transition: 'all 1s ease',
                            my: 4,
                        }}
                    >
                        {index % 2 === 0 ? (
                            <>
                                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Box
                                        component="img"
                                        src={src}
                                        alt={`bioagradable-${index}`}
                                        sx={{
                                            width: '100%',
                                            maxWidth: '500px',
                                            height: 'auto',
                                            objectFit: 'cover',  // Ajusta el tamaño de la imagen si es necesario
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
                                    <Typography variant="h6" paragraph>{texts[index]}</Typography>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        href={buttonLinks[index]}
                                    >
                                        Más información
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
                                    <Typography variant="h6" paragraph>{texts[index]}</Typography>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        href={buttonLinks[index]}
                                    >
                                        Más información
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <Box
                                        component="img"
                                        src={src}
                                        alt={`bioagradable-${index}`}
                                        sx={{
                                            width: '100%',
                                            maxWidth: '500px',
                                            height: 'auto',
                                            objectFit: 'cover',  // Ajusta el tamaño de la imagen si es necesario
                                        }}
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                ))}
>>>>>>> a3942194c8660697bb0f2c6e0df17e4645453177
            </Box>
        </Container>
    );
};


export default Home;

