let result = [];
let finalNumber = 0;
let incrementNumber = 0;
let resultText = document.querySelector("#result");
let previousResult = document.querySelector("#previousResult");

// Função para tocar som de feedback
function playSound() {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      400,
      audioContext.currentTime + 0.1
    );

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    // Ignorar erro se o som não puder ser reproduzido
  }
}

// Função para criar confete
function createConfetti() {
  const colors = ["#007aff", "#34c759", "#ff9500", "#ff3b30", "#af52de"];

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}vw;
        width: 8px;
        height: 8px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        animation: confettiFall 3s linear forwards;
      `;

      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 3000);
    }, i * 50);
  }
}

function getNumber() {
  finalNumber = document.querySelector("#finalNumber").value;

  // Validação
  if (!finalNumber || finalNumber <= 0) {
    showNotification(
      "Por favor, insira um número válido maior que zero!",
      "error"
    );
    return;
  }

  // Loading state
  const button = event.target;
  const originalText = button.innerHTML;
  button.innerHTML = "Sorteando...";
  button.disabled = true;

  setTimeout(() => {
    if (incrementNumber === 0) {
      removeContainer();
    }

    getRandom(finalNumber);

    // Restaurar botão
    button.innerHTML = originalText;
    button.disabled = false;
  }, 500);
}

// Função específica para o espaço
function sortearComEspaco() {
  if (!finalNumber || finalNumber <= 0) {
    showNotification(
      "Por favor, insira um número válido maior que zero!",
      "error"
    );
    return;
  }

  // Verificar se todos os números já foram sorteados
  if (result.length >= finalNumber) {
    showNotification(
      "Todos os números já foram sorteados! Clique em 'Sortear Novamente' para reiniciar.",
      "info"
    );
    return;
  }

  // Esconder o box inicial se for a primeira vez
  if (incrementNumber === 0) {
    removeContainer();
  }

  // Sortear novo número
  getRandom(finalNumber);
}

// Função para mostrar notificações
function showNotification(message, type = "info") {
  // Remover notificação anterior se existir
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification notification--${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animar entrada
  setTimeout(() => notification.classList.add("show"), 100);

  // Remover após 3 segundos
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 32) {
    event.preventDefault();
    sortearComEspaco();
  }
});

function removeContainer() {
  document.querySelector(".form-card").classList.add("hide");
  document.querySelector(".secondary-btn").classList.add("show");
  incrementNumber++;
}

function getRandom(max) {
  let randomNumber = Math.floor(Math.random() * max + 1);

  if (randomNumber === 0) {
    getNumber();
  } else {
    verifyNumber(randomNumber);
  }
}

function verifyNumber(testNumber) {
  // Verificar se todos os números já foram sorteados
  if (result.length >= finalNumber) {
    showNotification(
      "Todos os números já foram sorteados! Clique em 'Sortear Novamente' para reiniciar.",
      "info"
    );
    return;
  }

  if (result.length != 0) {
    let resultVerify = result.includes(testNumber);

    if (resultVerify == false) {
      result.push(testNumber);
      getPrint(testNumber);
    } else {
      // Se o número já foi sorteado, tentar novamente
      getRandom(finalNumber);
    }
  } else {
    result.push(testNumber);
    getPrint(testNumber);
  }
}

function getPrint(valueFinal) {
  document.querySelector(".results").classList.add("show");

  // Tocar som de feedback
  playSound();

  // Criar confete
  createConfetti();

  let changingPosition = result.slice(0).reverse();
  let data = changingPosition
    .map((num, index) => {
      return `<li style="animation-delay: ${index * 0.1}s">${num}</li>`;
    })
    .join("");

  resultText.innerHTML = valueFinal;
  previousResult.innerHTML = data;

  // Verificar se todos os números foram sorteados
  if (result.length >= finalNumber) {
    showNotification("🎉 Parabéns! Todos os números foram sorteados!", "info");
  }
}
