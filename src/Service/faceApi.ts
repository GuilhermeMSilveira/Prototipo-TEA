import axios from "axios";

const API_KEY = "SUA_CHAVE_DE_API"; // 🔑 Coloque sua chave aqui
const ENDPOINT = "SEU_ENDPOINT"; // 🌍 Exemplo: https://seuprojeto.cognitiveservices.azure.com/

interface EmotionResponse {
  anger: number;
  contempt: number;
  disgust: number;
  fear: number;
  happiness: number;
  neutral: number;
  sadness: number;
  surprise: number;
}

export const analyzeFace = async (base64Image: string): Promise<EmotionResponse | null> => {
  try {
    const response = await axios.post(
      `${ENDPOINT}/face/v1.0/detect?returnFaceAttributes=emotion`,
      { url: `data:image/jpeg;base64,${base64Image}` },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.length > 0) {
      return response.data[0].faceAttributes.emotion;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao analisar imagem:", error);
    return null;
  }
};
