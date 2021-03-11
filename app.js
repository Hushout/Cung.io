const width = 300;//hauteur de la box
const heigt = 300;//largeur de la box
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')

//coupe la box en carré de 20x20
for (let i=0;i < 225 ;i++){
    const square = document.createElement('div')
    square.setAttribute("id", i);
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))


const allKeys = [0,1,2,3,4,5,6,7,8,9,10,11]  //la position de toute les keys
const possibleKey =["up","left","down","right"] // les différents directions de keys possibles



//function qui affiche la bonne image de key dans le carré indiqué
function generateSingleKey(rdNb,nbCurrentSquare){
    let currentDiv = document.getElementById(nbCurrentSquare); 
    // on select le div qui se trouve dans le grid qu'on veut cad la case où se trouve actuellement le key ,donné par allKeys
    let newDiv = document.createElement('div')
    switch (rdNb) {
        case 0:
            newDiv.classList.add("upkey")
            currentDiv.appendChild(newDiv)
            //   retourner la flèche du haut
          break;
        case 1:
            newDiv.classList.add("leftkey")
            currentDiv.appendChild(newDiv)
            //   retourner la flèche de gauche
          break;
        case 2:
            newDiv.classList.add("downkey")
            currentDiv.appendChild(newDiv)
            //   retourner la flèche de bas
          break;
        case 3:
            newDiv.classList.add("rightkey")
            currentDiv.appendChild(newDiv)
            //   retourner la flèche de bas
        break;
        default:
            console.log('error')
            // retourner la flèche de droite
      }
}

//function qui génère nbKey keys , 
//il initialise la liste des keys a reproduire et affiche en même temps
//cad pour chaque key il donne une direction aléatoire et met la valeur de cette key à 0(nouvelle key) 
function generateAllKey(nbKey) {
    if (nbKey < 12) {
    let a = 0 ; 
        for (let i =0 ; i <=nbKey;i++){
            squares[allKeys[i]].classList.add('newkey')
            let rdNb=Math.floor(Math.random() * 4)
            // console.log(rdNb)
            currentKeyDirection.push(rdNb)
            generateSingleKey(rdNb,allKeys[a])
            a++; 
            currentKeyvalue.push(false)
            console.log(currentKeyDirection[i])
        }
    }
}

let currentKeyCursor = 0
// console.log("le curseur est sur la key n°" +currentKeyCursor)

function verifyKey(direction){
    if(currentKeyCursor < currentKeyDirection.length){
    if (currentKeyDirection[currentKeyCursor] == direction ) {
        currentKeyvalue[currentKeyCursor]=true
        squares[allKeys[currentKeyCursor]].classList.replace('newkey' ,'truekey')
        currentKeyCursor++
    }
    else {
        while(currentKeyCursor > 0){
            currentKeyCursor--
            currentKeyvalue[currentKeyCursor]=false
            // squares[currentKeyCursor].classList.remove('truekey')
            squares[allKeys[currentKeyCursor]].classList.replace('truekey', 'newkey')
        }
    }
    // console.log(currentKeyCursor)
    console.log(possibleKey[direction])
    }
}


    var currentKeyDirection = [] //tableau dynamique qui indique l'actuelle direction de chaque key
    var currentKeyvalue =[]      //tableau dynamique qui indique la valeur de chaque key (0= la key n'est pas encore joué 1= la key a été joué)
function initAll(){
    currentKeyDirection = [] 
    currentKeyvalue =[]
    currentKeyCursor--//problème ici
    if(currentKeyCursor > 0){
        while(currentKeyCursor >= 0){
            let element = document.getElementById(currentKeyCursor);
            // console.log("voiçi la div "+element.id)
            // console.log("son fils est  "+element.firstChild)
            element.removeChild(element.firstChild);
            squares[allKeys[currentKeyCursor]].className = ""
            currentKeyCursor-- 
        }
        currentKeyCursor=0 
    }
    
}
var score = 0;
function verifyValKey(){
    if(currentKeyvalue.every(v => v === true)){
        score+=1;
        scoreDisplay.innerHTML = 'score :' +score
        initAll()
        draw()
    }
    else{
        if(currentKeyCursor != 0){
        while(currentKeyCursor >= 0){
            currentKeyvalue[currentKeyCursor]=false
            squares[allKeys[currentKeyCursor]].classList.replace('truekey', 'newkey')
            currentKeyCursor--
        }
        console.log("le curseur est sur la key n°" +currentKeyCursor)
        console.log("ici")
        currentKeyCursor=0 
        }else console.log('error')
    }
}

//function qui reconnait la touche et change la couleur du bouton
function playKey(e) { 
    switch(e.keyCode) {
        case 38://upkey
            verifyKey(0)
            break
        case 37://leftkey
            verifyKey(1)
            break
        case 40://downkey
            verifyKey(2)
            break
        case 39 ://rightkey
            verifyKey(3)
            break
        case 89 ://key-y
            chrono(15)
            break
        case 32 ://spacebar
            // console.log(currentKeyvalue.every(v => v === true))
            verifyValKey()
            break    
    }
  }
  document.addEventListener('keydown', playKey)


function draw() {
    // for (let i =0; i < allKeys.length; i++) {
    //     squares[allKeys[i]].classList.add('newkey')
    // }
    // initAll()
    let rdNb=Math.floor(1 + (Math.random() * (11 - 1)))
    generateAllKey(rdNb)
}

draw()

const timerDisplay = document.querySelector('.timer')

function chrono(t){
    if(t == 0){
        timerDisplay.innerHTML = 'stop ! c\'est finis !'
        document.removeEventListener('keydown', playKey)
    }
    else {
        timerDisplay.innerHTML = 'il reste '+t+' secondes'
        t--
        setTimeout(chrono, 1000,t); // check again in a second
    }
}