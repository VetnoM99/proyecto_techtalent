// src/pages/Faq.tsx

import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: '¿Quiénes somos?',
    answer: 'Somos una iniciativa comprometida con ofrecer productos de alta calidad mientras protegemos nuestras costas. Con el proyecto Port⭕Net, lideramos la lucha contra el plástico y las prácticas insostenibles en el mar.'
  },
  {
    question: '¿Qué es Port⭕Net?',
    answer: 'Port⭕Net es un proyecto diseñado para limpiar más de 1000 km² del fondo marino de la Costa Dorada, promoviendo prácticas de pesca responsable y sostenible, en línea con los Objetivos de Desarrollo Sostenible (ODS).'
  },
  {
    question: '¿Cuál es nuestro objetivo principal para 2024?',
    answer: 'Nuestro objetivo principal para 2024 es limpiar más de 1000 km² del fondo marino de la Costa Dorada, mientras promovemos prácticas de pesca responsable y sostenible.'
  },
  {
    question: '¿Cómo colaboran los restaurantes con el proyecto?',
    answer: 'Los restaurantes de la zona se comprometen a donar una parte de cada venta para apoyar a las ONG que se dedican a la recolección de basura marina y la protección de especies. Estas donaciones cubren costos de equipos y vehículos necesarios para las tareas de limpieza.'
  },
  {
    question: '¿Cómo puedo contribuir al proyecto?',
    answer: 'Puedes contribuir simplemente haciendo compras en nuestros restaurantes socios, ya que una parte de cada venta se destina al proyecto sin costo adicional para ti. Además, puedes donar puntos a la ONG de tu preferencia a través de nuestra app.'
  },
  {
    question: '¿Qué pasa si no dono mis puntos a través de la app?',
    answer: 'Si no donas tus puntos, no te preocupes. Cada seis meses, hacemos un recuento de los votos perdidos y los repartimos de manera equitativa entre todas las ONG participantes.'
  },
];

const Faq: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
// @ts-ignore
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Preguntas frecuentes
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{ width: '80%', mb: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Faq;
