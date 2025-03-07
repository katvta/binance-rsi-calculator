# Binance RSI Calculator

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Este projeto calcula o **RSI (Relative Strength Index)** em tempo real utilizando dados históricos de velas (candles) da API da Binance. Ele é ideal para traders que desejam monitorar o RSI de um ativo específico com base em intervalos e períodos personalizados.

---

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v18.x ou superior)
- [npm](https://www.npmjs.com/) (v9.x ou superior)

---

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/katvta/binance-rsi-calculator.git
   cd binance-rsi-calculator
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:
   ```env
   SYMBOL=BTCUSDT
   INTERVAL=1h
   PERIOD=14
   ```
   - `SYMBOL`: O par de moedas a ser monitorado (ex: `BTCUSDT`, `ETHUSDT`).
   - `INTERVAL`: O intervalo das velas (ex: `1m`, `5m`, `1h`, `1d`).
   - `PERIOD`: O número de períodos para calcular o RSI (geralmente 14).

4. Execute o projeto:
   ```bash
   npm start
   ```

---

## 📂 Estrutura do Projeto

```
binance-rsi-calculator/
├── .env                  # Arquivo de configuração com variáveis de ambiente
├── index.js              # Código principal: busca os dados e calcula o RSI
├── package.json          # Configuração do projeto e dependências
└── README.md             # Documentação do projeto
```

---

## 📜 Funcionalidade do Projeto

O projeto realiza as seguintes tarefas:

1. **Busca de Dados Históricos:**  
   Utiliza a API da Binance para baixar os candles históricos de um par de moedas (ex: BTCUSDT) com um intervalo definido (ex: 1 hora). Apenas os últimos 100 candles são utilizados para o cálculo.

2. **Cálculo do RSI:**  
   Implementa uma função para calcular o RSI utilizando médias exponenciais de ganhos e perdas. O valor do RSI é atualizado a cada 3 segundos para fornecer uma visão dinâmica do mercado.

---

## 🛠️ Como Usar

1. **Configurar o Parâmetro de Entrada:**  
   Edite o arquivo `.env` para definir o par de moedas (`SYMBOL`), o intervalo das velas (`INTERVAL`) e o período do RSI (`PERIOD`).

2. **Executar o Script:**  
   Inicie o script com o comando:
   ```bash
   npm start
   ```

3. **Monitorar o RSI:**  
   O valor do RSI será exibido no console a cada 3 segundos. Use essa informação para tomar decisões de trading, como identificar condições de sobrecompra (RSI > 70) ou sobrevenda (RSI < 30).

---

## 📜 Exemplo de Execução

Ao executar o comando:

```bash
npm start
```

Você poderá ver no console uma saída semelhante a:

```
65.42
```

Isso indica que o RSI atual do ativo configurado está em **65.42**.

---

## 📂 Estrutura do Código

### 1. **Download dos Candles**
A função `getCandles` realiza uma requisição à API da Binance para obter os últimos 100 candles do par de moedas especificado. Os valores de fechamento (`close`) são extraídos e convertidos para números.

### 2. **Cálculo do RSI**
A função `RSI` implementa o cálculo do RSI utilizando médias exponenciais de ganhos e perdas. A fórmula utilizada é:

\[
RSI = 100 - \frac{100}{1 + RS}
\]

Onde \( RS \) (Relative Strength) é calculado como:

\[
RS = \frac{\text{Média de Ganhos}}{\text{Média de Perdas}}
\]

### 3. **Atualização Contínua**
O script utiliza `setInterval` para atualizar o RSI a cada 3 segundos, garantindo que os dados estejam sempre atualizados.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

**Desenvolvido por Katriel Amorim**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/katriel-amorim-a330b4322/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/katvta)
