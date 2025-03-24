import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  //write your code here

  // VARIABLES

  const palos = ['♦', '♥', '♠', '♣']
  //object que nos permite obtener la letra correspondiente cuando el valor es 1, 11, 12 y 13 ó; A, J, Q y K respectivamente
  const translateValues = {
    1:  'A',
    11: 'J',
    12: 'Q',
    13: 'K'
  }

  //elementos de la carta
  const paloTop = document.querySelector("#paloTop")
  const cardValue = document.querySelector("#cardValue")
  const paloBottom = document.querySelector("#paloBottom")

  //botón nueva carta
  const botonRefresh = document.querySelector("#newCard")

  //elementos del timer
  const timerCount = document.querySelector("#timerValue")
  const timerText = document.querySelector("#timerStatus")
  const timerButton = document.querySelector("#timer")

  //elemento del div que ocupa la carta
  const cartaDiv = document.querySelector("#cartaDiv")

  //inputs de ancho y altura
  const widthInput = document.querySelector("#widthInput")
  const heightInput = document.querySelector("#heightInput")

  //variables que almacenan el ID que devuelve cada uno de los setInterval
  let timerIntervalID = null  //intervalo 10 segundos
  let countIntervalID = null  //intervalo 1 segundo


  // FUNCIONES

  //función que devuelve un objeto con el valor y el palo de la carta
  function getRandomCard(){
    let palo = palos[Math.floor(Math.random()*4)]
    let value = Math.floor(Math.random()*13) + 1

    //ajuste del valor cuando no se muestra como un número
    if(value < 2 || value > 10){
      value = translateValues[value]
    }
    
    console.log(`La carta elegida será el ${value} de ${palo}`)

    const card = {
      palo: palo,
      value: value
    }
    return card
  }
  
  //función que actualiza la carta en pantalla con una nueva
  function showNewCard(){
    const selectedCard = getRandomCard()

    if(selectedCard.palo == palos[0] || selectedCard.palo == palos[1]){
      paloTop.classList.replace("paloNegro","paloRojo")
      paloBottom.classList.replace("paloNegro","paloRojo")
    } else {
      paloTop.classList.replace("paloRojo","paloNegro")
      paloBottom.classList.replace("paloRojo","paloNegro")
    }

    paloTop.innerHTML = selectedCard.palo
    paloBottom.innerHTML = selectedCard.palo

    cardValue.innerHTML = selectedCard.value

    return true
  }

  //función que actualiza el timer en pantalla cada segundo
  function updateTimer(){
    return setInterval((e) => {
      let time = timerCount.innerHTML
      time--
      if(time < 10)
        timerCount.innerHTML = '0' + time
      else
        timerCount.innerHTML = time
    }, 1000)
  }

  // LISTENERS

  //listener click en el botón del timer
  botonRefresh.addEventListener('click', showNewCard)

  //listener para activar/desactivar el timer
  timerButton.addEventListener('click', (e) => {
    if(timerText.innerHTML == "off"){
      timerText.innerHTML = "ON"
      timerText.classList.replace("text-dark","text-danger")

      countIntervalID = updateTimer()
      timerIntervalID = setInterval((e) => {
        showNewCard()
        timerCount.innerHTML=10
        clearInterval(countIntervalID)
        countIntervalID = updateTimer()
     }, 11000)
    }
    else{
      clearInterval(timerIntervalID)
      clearInterval(countIntervalID)
      timerText.innerHTML = "off"
      timerText.classList.replace("text-danger","text-dark")
      timerCount.innerHTML = 10
    }
  })

  //listeners para actualizar alto y ancho de la carta en función de la entrada en los inputs
  document.querySelector("#widthInput").addEventListener('change',(e) => {
    cartaDiv.style.width = widthInput.value +"px"
  })

  document.querySelector("#heightInput").addEventListener('change',(e) => {
    cartaDiv.style.height = heightInput.value +"px"
  })


  // EJECUCIÓN
  //enseña una nueva carta al cargar
  showNewCard()

  console.log("Hello Rigo from the console!");
};
