import * as tf from '@tensorflow/tfjs';

export async function analisarPadrao(historicoRespostas: number[]) {
  const tensor = tf.tensor(historicoRespostas);
  const mediaArray = tensor.mean().dataSync(); // Retorna Float32Array
  const media = mediaArray[0]; // Obtém o primeiro elemento do array
  
  console.log('Desempenho médio:', media);
  return media > 0.5 ? 'Avançar nível' : 'Revisar conteúdo';
}
