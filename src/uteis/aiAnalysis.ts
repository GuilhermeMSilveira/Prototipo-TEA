export const analisarDesempenho = async (historico: number[]): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const score = historico.reduce((acc, val) => acc + val, 0) / historico.length;
      resolve(`Seu desempenho foi de ${(score * 100).toFixed(2)}%`);
    }, 2000);
  });
};
