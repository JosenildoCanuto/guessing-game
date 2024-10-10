let inputN = document.querySelector(".input-number");
let number = document.querySelector(".the-number");
let changes = document.querySelector(".changes");
let btn = document.querySelector(".submit");
let numberMaior = document.querySelector(".maior");
let numberMenor = document.querySelector(".menor");

let tentativas = document.createElement('p')

let attemps = 0;

btn.addEventListener("click", validar);

function validar() {
  let valueInput = inputN.value;
  let valueNumber = parseInt(valueInput);

  if (!isNaN(valueNumber) && valueNumber > 0 && valueNumber <= 100) {
    number.innerHTML = valueNumber;

    if (valueNumber < numberSecret) {
      //se o numero que o user colocou for menor que o valor secreto
      attemps++;
      numberMenor.innerHTML = valueNumber;
    } else if (valueNumber > numberSecret) {
      //se o numero que o user colocou for maior que o valor secreto
      attemps++;
      numberMaior.innerHTML = valueNumber;
    } else if (attemps > 10) {
        alert(`Não deu :( a resposta era, ${numberSecret}`)
    } else {
      //numero chutado correto
      alert(`Você ACERTOUUU, com ' ${attemps} tentativas`)
    }

    tentativas.innerHTML = `Faltam ${10 - attemps}`;
    changes.appendChild(tentativas)
  } else {
    console.log("Por favor, insira um número válido entre 0 e 100.");
  }
}

const randomNumberInterval = (a, b) => {
  return Math.floor(Math.random() * (b - a + 1)) + a;
};

const numberSecret = randomNumberInterval(1, 100);
