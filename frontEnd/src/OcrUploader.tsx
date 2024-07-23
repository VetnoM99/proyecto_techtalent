import React, { useState } from 'react';
import axios from 'axios';
import './OcrUploader.css'; // Archivo CSS para los estilos

const OcrUploader: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [donationToONG, setDonationToONG] = useState<number>(0);
    const [restaurantShare, setRestaurantShare] = useState<number>(0);
    const [clientPoints, setClientPoints] = useState<number>(0);
    const [uploadedCount, setUploadedCount] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleUpload = async () => {
        setIsUploading(true);
        let accumulatedTotal = total;

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:8080/ocr/extract', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const extractedText = response.data;

                // Filtrar y sumar el total
                const totalAmount = extractAndSumTotal(extractedText);
                accumulatedTotal += totalAmount;

                setUploadedCount(prevCount => prevCount + 1);

            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }

        // Calcular el 1% del total para la donación a la ONG
        const donationAmount = accumulatedTotal * 0.01;
        setDonationToONG(donationAmount);

        // Calcular el 85% del total para el restaurante
        const restaurantAmount = accumulatedTotal * 0.85;
        setRestaurantShare(restaurantAmount);

        // Calcular el saldo restante para puntos del cliente
        const clientPointsAmount = accumulatedTotal - donationAmount - restaurantAmount;
        setClientPoints(clientPointsAmount);

        setTotal(accumulatedTotal); // Actualizar el total acumulado

        setFiles([]); // Limpiar archivos después de la carga
        setIsUploading(false);
    };

    // Filtrar y sumar los totales del texto
    const extractAndSumTotal = (data: string) => {
        const lines = data.split('\n');
        let sum = 0;

        lines.forEach(line => {
            const match = line.match(/TOTAL.*?(\d+[\.,]?\d*)/i);
            if (match) {
                sum += parseFloat(match[1].replace(',', '.'));
            }
        });

        return sum;
    };

    return (
        <div className="ocr-uploader-container">
            <h1 className="ocr-header">Subir Recibos</h1>
            <div className="upload-box">
                <input type="file" multiple onChange={handleFileChange} className="file-input" />
                <button onClick={handleUpload} disabled={isUploading} className="upload-button">
                    {isUploading ? 'Subiendo...' : 'Subir'}
                </button>
            </div>
            <div className="info-container">
                <p>Archivos Subidos: {uploadedCount}</p>
                <p>Total Acumulado: {total.toFixed(2)} €</p>
                <p>Donación a la ONG: {donationToONG.toFixed(2)} €</p>
                <p>Parte para el Restaurante: {restaurantShare.toFixed(2)} €</p>
                <p>Puntos para el Cliente: {clientPoints.toFixed(2)} €</p>
            </div>
        </div>
    );
};

export default OcrUploader;
