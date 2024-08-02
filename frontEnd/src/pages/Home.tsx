import React, { useRef, useEffect, useState } from "react";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import bioagrad1 from "../assets/bioagradebles.jpg";
import bioagrad2 from "../assets/bioagradables-RafaBeladiez-010.jpg";
import bioagrad3 from "../assets/bioagradables2.png";
import bioagrad4 from "../assets/bioagradables-colabora-institucion-academica.jpg";
import "../styles/Home.css";

const images = [bioagrad1, bioagrad2, bioagrad3, bioagrad4];
const texts = [
  "Fundados en el año 2024, nuestro objetivo es lograr un futuro limpio y sostenible en la Costa Dorada para 2030, donde nuestras especies se conserven en paz y de manera sana en un mar completamente limpio. Únete a nuestro programa de voluntariado y ayuda a limpiar nuestras playas y océanos. Cada pequeño esfuerzo cuenta para mantener nuestras costas libres de residuos y asegurar un hábitat seguro para la vida marina.",
  "Participa en nuestros talleres educativos y aprende sobre la importancia de conservar nuestros océanos. Fomentamos la conciencia ambiental entre las nuevas generaciones para un futuro más sostenible.",
  "Colabora con nosotros como empresa y demuéstrale al mundo tu compromiso con la sostenibilidad. Juntos podemos implementar prácticas responsables y reducir el impacto ambiental de nuestras actividades.",
  "Apoya nuestras iniciativas de investigación científica para monitorear y analizar la salud de nuestros océanos. Con datos precisos y actualizados, podemos desarrollar estrategias efectivas para su protección y conservación.",
];

const buttonLinks = ["/contacto", "/participa", "/quienes-somos", "/proyecto"];

const Home: React.FC = () => {
  const refs = useRef<HTMLDivElement[]>([]);
  const [visibleStates, setVisibleStates] = useState<boolean[]>(
    new Array(images.length).fill(false)
  );

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

  return (
    <Container className="home-container">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenidos a Port⭕Net
        </Typography>

        <Typography variant="h3">
          Trabajamos para combatir la contaminación marítima y proteger nuestros
          océanos.
        </Typography>

        {images.map((src, index) => (
          <Grid
            container
            key={index}
            ref={(el) => (refs.current[index] = el!)}
            spacing={2}
            alignItems="center"
            className="image-grid"
            sx={{
              opacity: visibleStates[index] ? 1 : 0,
              transition: "opacity 1s ease",
              my: 4,
            }}
          >
            {index % 2 === 0 ? (
              <>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Box
                    component="img"
                    src={src}
                    alt={`bioagradable-${index}`}
                    sx={{
                      width: "100%",
                      maxWidth: "500px",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
                  <Typography variant="h6" paragraph>
                    {texts[index]}
                  </Typography>
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
                <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
                  <Typography variant="h6" paragraph>
                    {texts[index]}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    href={buttonLinks[index]}
                  >
                    Más información
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <Box
                    component="img"
                    src={src}
                    alt={`bioagradable-${index}`}
                    sx={{
                      width: "100%",
                      maxWidth: "500px",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              </>
            )}
          </Grid>
        ))}
      </Box>
    </Container>
  );
};

export default Home;
