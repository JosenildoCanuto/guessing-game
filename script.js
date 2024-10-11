let inputN = document.querySelector(".input-number");
let number = document.querySelector(".the-number");
let changes = document.querySelector(".changes");
let btn = document.querySelector(".submit");
let numberMaior = document.querySelector(".maior");
let numberMenor = document.querySelector(".menor");
let tips = document.querySelector('.hotOrCold');

let p = document.createElement('p')
let h3 = document.createElement('h3')


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
    } else {
      //numero chutado correto
      alert(`Você ACERTOUUU, com ${attemps} tentativas`)
    }

    if (attemps > 10) {
      alert(`Não deu :( a resposta era ${numberSecret}`)
    } else {
      p.innerHTML = `Faltam ${10 - attemps} tentativas`;
    }

    hotAndCold(numberSecret, valueNumber);
    changes.appendChild(p)
  } else {
    console.log("Por favor, insira um número válido entre 0 e 100.");
  }
}

function hotAndCold(secret, input){

  h3.classList.remove('hot', 'cold', 'mid')
 
  let valueCalc = Math.abs(secret - input);

  if(valueCalc > 70){
    h3.classList.add('cold');
    h3.innerHTML = 'MUITO FRIO';
  } else if (valueCalc > 50){
    h3.classList.add('cold');
    h3.innerHTML = 'FRIO';
  } else if (valueCalc > 30){
    h3.classList.add('mid');
    h3.innerHTML = 'MORNO';
  } else if (valueCalc > 10){
    h3.classList.add('hot');
    h3.innerHTML = 'QUENTE';
  } else {
    h3.classList.add('hot');
    h3.innerHTML = 'MUITO QUENTE';
  }

  tips.appendChild(h3)
}

const randomNumberInterval = (a, b) => {
  return Math.floor(Math.random() * (b - a + 1)) + a;
};

const numberSecret = randomNumberInterval(1, 100);
