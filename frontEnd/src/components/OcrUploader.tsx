import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserProvider";
import { motion } from "framer-motion";
import "../styles/OcrUploader.css"; // Archivo CSS para los estilos

const OcrUploader: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("");
  const [donationToONG, setDonationToONG] = useState<number>(0);
  const [clientPoints, setClientPoints] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { user } = useUser();

  interface RestaurantIds {
    [key: string]: number;
  }

  const restaurantIds: RestaurantIds = {
    "RESTAURANT MONTSERRAT PEIX I MARISC": 1,
    "RESTAURANT & LOUNGE LINDRET": 2,
    "RESTAURANT BRASAS & COCKTAIL KEMA": 3,
    "RESTAURANT EL PÒSIT": 4,
    "ARROCERÍA ROCE": 5,
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);

      const urls = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
      setErrorMessage(null); // Reset error message
    }
  };

  const handleRestaurantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRestaurant(e.target.value);
  };

  const checkFileExists = async (fileName: string) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/files/check-file",
        {
          params: { fileName, userId: user?.id },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error checking file existence:", error);
      return false;
    }
  };

  const handleCalculate = async () => {
    if (files.length === 0) {
      setErrorMessage("Primero tienes que subir un archivo");
      return;
    }

    setIsCalculating(true);
    setErrorMessage(null); // Reset error message
    let accumulatedTotal = 0;

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:8080/ocr/extract",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const extractedText = response.data;

        // Filtrar y sumar el total
        const totalAmount = extractAndSumTotal(extractedText);
        if (totalAmount === 0) {
          setErrorMessage("No se reconoce el total de la factura");
          setIsCalculating(false);
          return;
        }
        accumulatedTotal += totalAmount;
      } catch (error) {
        console.error("Error extracting total:", error);
        setErrorMessage("No se reconoce el total de la factura");
        setIsCalculating(false);
        return;
      }
    }

    // Calcular el 1% del total para la donación a la ONG
    const donationAmount = accumulatedTotal * 0.01;
    setDonationToONG(donationAmount);

    // Calcular el 3% del total para puntos del cliente
    const clientPointsAmount = accumulatedTotal * 0.03;
    setClientPoints(clientPointsAmount);

    setIsCalculating(false);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setErrorMessage("Primero tienes que subir un archivo");
      return;
    }

    if (!selectedRestaurant) {
      setErrorMessage("Primero tienes que seleccionar un restaurante");
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    const restaurantId = restaurantIds[selectedRestaurant];

    if (!restaurantId) {
      setErrorMessage("Restaurante no válido seleccionado");
      setIsUploading(false);
      return;
    }

    if (user) {
      try {
        // Verificar si los archivos ya existen
        for (const file of files) {
          const fileExists = await checkFileExists(file.name);
          if (fileExists) {
            setErrorMessage(`No puedes subir el mismo recibo`);
            setIsUploading(false);
            return;
          }
        }

        // Obtener el saldo actual del socio
        const saldoResponse = await axios.get(
          `http://localhost:8080/socios/${restaurantId}/saldo`
        );
        const saldoActual = saldoResponse.data;

        // Sumar el nuevo saldo al saldo existente
        const nuevoSaldo = saldoActual + donationToONG;

        // Actualizar el saldo del restaurante seleccionado
        await axios.put(
          `http://localhost:8080/socios/${restaurantId}/saldo`,
          { nuevoSaldo },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Saldo actualizado exitosamente");

        // Subir los archivos solo si todo lo anterior fue exitoso
        const formData = new FormData();
        for (const file of files) {
          formData.append("files", file);
        }

        formData.append("userId", user.id.toString());

        const response = await axios.post(
          "http://localhost:8080/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Files uploaded successfully", response.data);
      } catch (error) {
        console.error("Error uploading files or updating saldo:", error);
        setErrorMessage("Error al subir archivos o actualizar el saldo");
      }
    } else {
      console.error("No user found");
    }

    setFiles([]);
    setPreviewUrls([]);
    setIsUploading(false);
  };

  // Filtrar y sumar los totales del texto
  const extractAndSumTotal = (data: string) => {
    const lines = data.split("\n");
    let sum = 0;

    lines.forEach((line) => {
      const match = line.match(/TOTAL.*?(\d+[\.,]?\d*)/i);
      if (match) {
        sum += parseFloat(match[1].replace(",", "."));
      }
    });

    return sum;
  };

  return (
    <div className="ocr-uploader-container">
      <h1 className="ocr-header">Subir Aportación</h1>
      <div className="upload-box">
        <input id="file-input"type="file"multiple onChange={handleFileChange}className="file-input"/>
        <select value={selectedRestaurant}onChange={handleRestaurantChange}className="restaurant-select">
          <option value="">Selecciona un restaurante</option>
          <option value="RESTAURANT MONTSERRAT PEIX I MARISC">
            RESTAURANT MONTSERRAT PEIX I MARISC
          </option>
          <option value="RESTAURANT & LOUNGE LINDRET">
            RESTAURANT & LOUNGE LINDRET
          </option>
          <option value="RESTAURANT BRASAS & COCKTAIL KEMA">
            RESTAURANT BRASAS & COCKTAIL KEMA
          </option>
          <option value="RESTAURANT EL PÒSIT">RESTAURANT EL PÒSIT</option>
          <option value="ARROCERÍA ROCE">ARROCERÍA ROCE</option>
        </select>
        <div className="preview-container">
          {previewUrls.map((url, index) => (
            <motion.img key={index}src={url}alt={`Preview ${index + 1}`} className="preview-image"initial={{ opacity: 0 }}animate={{ opacity: 1 }}transition={{ duration: 0.5 }}/>
          ))}
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleCalculate}disabled={isCalculating}className="calculate-button">
          {isCalculating ? "Calculando..." : "Calcular"}
        </button>
        <button onClick={handleUpload}disabled={isUploading || isCalculating}className="upload-button">
          {isUploading ? "Subiendo..." : "Subir"}
        </button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="info-container">
        <p>Donación a la ONG: {donationToONG.toFixed(2)} €</p>
        <p>Puntos para el Cliente: {clientPoints.toFixed(2)} €</p>
        </div>
    </div>
  );
};
export default OcrUploader;
