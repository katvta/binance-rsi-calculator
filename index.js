// Carrega a variável de ambiente SYMBOL definida no arquivo .env (ex: "BTCUSDT")
const SYMBOL = process.env.SYMBOL; 

// Carrega a variável de ambiente INTERVAL definida no arquivo .env (ex: "1h")
const INTERVAL = process.env.INTERVAL; 

// Carrega a variável de ambiente PERIOD definida no arquivo .env, convertendo para número inteiro (ex: 14)
const PERIOD = parseInt(process.env.PERIOD); 

// Função assíncrona que busca os dados históricos (candles) da Binance para o par e intervalo definidos
async function getCandles() {
  // Realiza uma requisição à API da Binance para obter 100 velas do par SYMBOL com o intervalo INTERVAL
  const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${SYMBOL}&interval=${INTERVAL}&limit=100`);
  
  // Converte a resposta da requisição para o formato JSON
  const data = await response.json();
  
  // Mapeia o array de velas para extrair o valor de fechamento de cada vela (posição 4) e converte-o para número
  const closes = data.map(k => parseFloat(k[4]));
  
  // Calcula o valor do RSI (Relative Strength Index) utilizando o array de fechamentos e o período definido
  const rsi = RSI(closes, PERIOD);
  
  // Limpa o console para exibir somente os dados atuais
  console.clear();
  
  // Exibe o valor calculado do RSI no console
  console.log(rsi);
}

// Função para calcular as médias simples de ganhos e perdas em um segmento dos preços de fechamento
// Parâmetros:
// - closes: array de preços de fechamento
// - period: número de períodos (velas) a serem considerados
// - startIndex: índice inicial do segmento no array closes
function averages(closes, period, startIndex) {
  // Inicializa as variáveis para acumular ganhos e perdas
  let gains = 0, losses = 0;
  
  // Loop que percorre o segmento definido pelo período a partir do startIndex
  for (let i = 0; i < period && (i + startIndex) < closes.length; i++) {
    // Calcula a diferença entre o fechamento atual e o fechamento anterior
    const diff = closes[i + startIndex] - closes[i + startIndex - 1];
    
    // Se a diferença for positiva, acumula no total de ganhos
    if (diff >= 0)
      gains += diff;
    // Se a diferença for negativa, acumula o valor absoluto no total de perdas
    else
      losses += Math.abs(diff);
  }
  
  // Calcula a média dos ganhos dividindo o total de ganhos pelo número de períodos
  let avgGains = gains / period;
  // Calcula a média das perdas dividindo o total de perdas pelo número de períodos
  let avgLosses = losses / period;
  
  // Retorna um objeto com as médias calculadas de ganhos e perdas
  return { avgGains, avgLosses };
}

// Função que calcula o RSI (Relative Strength Index) utilizando o array de preços de fechamento e o período definido
function RSI(closes, period) {
  // Calcula as médias simples dos ganhos e perdas para o primeiro segmento (começando a partir do índice 1)
  let { avgGains, avgLosses } = averages(closes, period, 1);
  
  // Itera sobre os fechamentos a partir do índice 2 para atualizar as médias usando uma abordagem exponencial
  for (let i = 2; i < closes.length; i++) {
    // Calcula as médias simples para o segmento atual com início em i
    let newAverages = averages(closes, period, i);
    
    // Atualiza a média exponencial dos ganhos:
    // Combina a média anterior ponderada (multiplicada por (period - 1)) com a nova média e divide pelo período
    avgGains = (avgGains * (period - 1) + newAverages.avgGains) / period;
    
    // Atualiza a média exponencial das perdas de maneira similar
    avgLosses = (avgLosses * (period - 1) + newAverages.avgLosses) / period;
  }
  
  // Calcula o índice de força relativa (RS) dividindo a média dos ganhos pela média das perdas
  const rs = avgGains / avgLosses;
  
  // Retorna o valor do RSI usando a fórmula: RSI = 100 - (100 / (1 + RS))
  return 100 - (100 / (1 + rs));
}

// Configura um timer para chamar a função getCandles a cada 3000 milissegundos (3 segundos)
// Isso permite atualizar o cálculo do RSI periodicamente
setInterval(getCandles, 3000);
