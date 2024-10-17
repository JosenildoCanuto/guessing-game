let inputNumber = document.querySelector(".input-number");
let number = document.querySelector(".the-number");
let changes = document.querySelector(".changes");
let btn = document.querySelector(".submit");
let numberMaior = document.querySelector(".maior");
let numberMenor = document.querySelector(".menor");
let tips = document.querySelector(".hotOrCold");
let totalTentativa = document.querySelector(".tentativaTotal");
let valorFinal = document.querySelector(".valorFinal");
let modalWin = document.querySelector(".popup-content-win");
let modalLose = document.querySelector(".popup-content-lose");
let popupWin = document.querySelector(".popup-win");
let popupLose = document.querySelector(".popup-lose");
let btnAgain = document.querySelectorAll(".again");
let attempsNumbersHistory = document.querySelector(".attempsNumbers");
let modalInit = document.querySelector(".welcome");
let nameInput = document.querySelector(".name");
let btnSubmit = document.querySelector(".name-submit");
let username = document.querySelector(".username");
let statistics = document.querySelector(".statistics");

let statisticsPoints = document.querySelector(".statistics-points");
let statisticsGames = document.querySelector(".statistics-games");

let p = document.createElement("p");
let h3 = document.createElement("h3");

let attemps = 0;
let numbersAttemps = [];

loadPoints()

btn.addEventListener("click", check);
btnAgain.forEach((btn) => {
  btn.addEventListener("click", againGame);
});

function check() {
  let valueInput = inputNumber.value;
  let valueNumber = parseInt(valueInput);

  if (!isNaN(valueNumber) && valueNumber > 0 && valueNumber <= 100) {
    number.innerHTML = valueNumber;
    attemps++;
    numbersAttemps.push(valueNumber);

    if (valueNumber < numberSecret) {
      //se o numero que o user colocou for menor que o valor secreto
      numberMenor.innerHTML = valueNumber;
    } else if (valueNumber > numberSecret) {
      //se o numero que o user colocou for maior que o valor secreto
      numberMaior.innerHTML = valueNumber;
    } else {
      //numero chutado correto
      p.innerHTML = `Parabéns, você acertouu com: ${attemps} tentativas`;
      totalTentativa.appendChild(p);
      popupWin.classList.add("active");
      statisticsPoints.innerHTML = "";
      statisticsGames.innerHTML = "";

      getPoints("V");
      return;
    }

    if (attemps === 10) {
      p.innerHTML = `Não foi dessa vez, tente novamente! Era o número: ${numberSecret}`;
      valorFinal.appendChild(p);
      popupLose.classList.add("active");
      getPoints("L");
    } else {
      p.innerHTML = `Faltam ${10 - attemps} tentativas`;
      changes.appendChild(p);
    }

    hotAndCold(numberSecret, valueNumber);
    history();
  } else {
    alert("Por favor, insira um número válido entre 0 e 100.");
  }

  inputNumber.value = "";
}

function hotAndCold(secret, input) {
  h3.classList.remove("hot", "cold", "mid");

  let valueCalc = Math.abs(secret - input);

  if (valueCalc > 70) {
    h3.classList.add("cold");
    h3.innerHTML = "MUITO FRIO";
  } else if (valueCalc > 50) {
    h3.classList.add("frio");
    h3.innerHTML = "FRIO";
  } else if (valueCalc > 30) {
    h3.classList.add("mid");
    h3.innerHTML = "MORNO";
  } else if (valueCalc > 10) {
    h3.classList.add("hot");
    h3.innerHTML = "QUENTE";
  } else {
    h3.classList.add("quente");
    h3.innerHTML = "MUITO QUENTE";
  }

  tips.appendChild(h3);
}

function againGame() {
  numberSecret = randomNumberInterval(1, 100);
  attemps = 0;
  numberMaior.innerHTML = 100;
  numberMenor.innerHTML = 1;
  number.innerHTML = "?";
  h3.innerHTML = "";
  changes.innerHTML = "";
  attempsNumbersHistory.innerHTML = "";
  inputNumber.value = "";
  numbersAttemps = [];
  popupLose.classList.remove("active");
  popupWin.classList.remove("active");
}

function history() {
  attempsNumbersHistory.innerHTML = "";

  numbersAttemps.forEach((number, i) => {
    let p = document.createElement("p");
    p.innerHTML = `${i + 1}) ${number}`;
    attempsNumbersHistory.appendChild(p);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  userProfile(); // Carrega o perfil do usuário ao carregar a página
});

btnSubmit.addEventListener("click", getName);

function getName() {
  let userName = nameInput.value;
  let savedProfile = localStorage.getItem("userProfile");

  if (!savedProfile) {
    if (userName.length >= 4) {
      // Verifica se o nome tem pelo menos 4 letras
      saveUserProfile(userName); // Salva o perfil com nome, pontos e tentativas
      modalInit.classList.add("off");
      modalInit.classList.remove("active");
      userProfile();
    } else {
      alert("Nome deve ter no mínimo 4 letras"); // Mostra alerta caso o nome seja inválido
    }
  } else {
    modalInit.classList.add("off");
    modalInit.classList.remove("active");
    userProfile();
  }
}

function saveUserProfile(name) {
  const profile = {
    name: name,
    points: 0,
    gameAttempts: 0,
  };

  localStorage.setItem("userProfile", JSON.stringify(profile));
}

function userProfile() {
  let user = localStorage.getItem("userProfile");

  if (user) {
    let profile = JSON.parse(user);
    username.innerHTML = "";

    let h3 = document.createElement("h3");
    h3.innerHTML = profile.name;
    username.appendChild(h3);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  getName();
});

function getPoints(value) {
  let user = localStorage.getItem("userProfile");
  statisticsPoints.innerHTML = "";

  if (user) {
    let profile = JSON.parse(user);
    let p = document.createElement("p");
    statisticsPoints.innerHTML = "";

    if (value === "V") {
      profile.points += 5;
    } else if (value === "L") {
      profile.points -= 3;
    }

    localStorage.setItem("userProfile", JSON.stringify(profile));

    p.innerHTML = `${profile.points} Points`;
    statisticsPoints.appendChild(p);
  }

  getGames();
}

function getGames() {
  let user = localStorage.getItem("userProfile");
  statisticsGames.innerHTML = "";

  if (user) {
    let profile = JSON.parse(user);

    let p = document.createElement("p");

    p.innerHTML = "|";
    statistics.appendChild(p);
    profile.gameAttempts += 1

    localStorage.setItem("userProfile", JSON.stringify(profile));

    p.innerHTML = `${profile.gameAttempts} Games`;
    statisticsGames.appendChild(p);
  }
}

function loadPoints(){
  let user = localStorage.getItem('userProfile');
  statisticsGames.innerHTML = "";
  statisticsPoints.innerHTML = "";

  if (user) {
    let profile = JSON.parse(user);

    let pointsElement   = document.createElement("p");

    pointsElement.innerHTML = `${profile.points} Points`;
    statisticsPoints.appendChild(pointsElement);

    let gamesElement  = document.createElement("p");

    gamesElement.innerHTML = `${profile.gameAttempts} Games`;
    statisticsGames.appendChild(gamesElement);
  }
}

const randomNumberInterval = (a, b) => {
  return Math.floor(Math.random() * (b - a + 1)) + a;
};

let numberSecret = randomNumberInterval(1, 100);
