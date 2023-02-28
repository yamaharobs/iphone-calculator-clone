const DEFAULT_SCREEN_SIZE = '50px'
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const screen = document.querySelector('[data-screen]')
const time = document.querySelector('[data-time]')
const date= new Date();

let operandOne;
let operandTwo;
let operator;
let clickedOperatorsArray = [];
let lastOperator;
let operandSelector = false;

let shouldClearScreen = false;


let result;





window.onload = () => {
    screen.innerText = '0'
}

const currentTime = [hour, minutes] = [
    date.getHours(),
    date.getMinutes()
]

//display current time on phone clock

time.innerText = `${currentTime[0]}:${currentTime[1]}`;

if(currentTime[0] > 12) {
    time.innerText = `${currentTime[0] - 12}:${currentTime[1]}`;
}

if(currentTime[1] < 10) {
    time.innerText = `${currentTime[0]}:0${currentTime[1]}`;
}


//resize numbers to shrink if more than 7 numbers

let resizeNumbers = function () {
    if (screen.innerText.length >= 7) {
        screen.style.fontSize = '40px'
    } else if (screen.innerText.length < 7) {
        screen.style.fontSize = DEFAULT_SCREEN_SIZE;
    }
}


function clear() {
    
    operandOne = undefined
    operandTwo = undefined
    operator = undefined
    clickedOperatorsArray = [];
   screen.innerText = 0

}

function appendNumber(number) {

    screen.innerText += number;
}







//math operations

function add(a , b) {
    result = a + b;
    return result
}

function subtract (a, b) {
    result = a - b
    return result
}

function multiply(a, b) {
    result = a * b
    return result
}

function divide(a, b) {
    result = a / b
    if (a === 0 || b === 0) {
        return null
    }
    if (a === 0 && b === 0) {
        return null
    }
    
}

const operate = function (operator, a, b) {

    a = Number(a)
    b = Number(b)

   

    switch (operator) {
        case 'add':
             add(a, b)
             return result
        case 'subtract':
            subtract(a, b)
            return result
        case 'multiply':
            multiply(a, b)
           return result
        case 'divide':
             divide(a, b)
             return result
        default:
            return 'error'
    }

}






//operation buttons listeners

operationButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        

        clickedOperatorsArray.push(e.target.id)

        lastOperator = clickedOperatorsArray[clickedOperatorsArray.length - 2];
        
        operandSelector = true;

       
        

        console.log(clickedOperatorsArray);
        console.log(lastOperator)

        

        operator = e.target.id;

        
      

        if (operandOne == undefined) {
            operandOne = screen.textContent;
            return
        }

        if (operandOne == result && operandTwo == undefined) {
            
        }

        

        if (operandOne != undefined && operandSelector == true){
            operandTwo = screen.textContent
            operate(lastOperator, operandOne, operandTwo)
            screen.textContent = result;
            operandOne = result;
            
            return operandOne;

        }

        if (typeof operandOne != undefined && operandTwo == undefined) {
            operandTwo = screen.textContent
            operate(lastOperator, operandOne, operandTwo);
            screen.textContent = result;
            operandOne = result;
        
            return operandOne

        }

       if (typeof operandOne != undefined && operandTwo != undefined){
        operandTwo = screen.textContent
            operate(lastOperator, operandOne, operandTwo);
            screen.textContent = result;
            operandOne = result;
        
            return operandOne
       }

        shouldClearScreen = true;

        

        
    })
})



//number buttons listeners

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {

        resizeNumbers();

       
      
        if (screen.innerText === '0') {
            screen.innerText = ''
        }
       
        if (operandSelector == true) {
            shouldClearScreen = true;
        }

        if (shouldClearScreen) {
            screen.textContent = ''
            shouldClearScreen = false;
        }

        operandSelector = false;

        if (screen.innerText.length === 9) {
            return;
        }
        
         if (operandOne == result && operandTwo == undefined) {
            operandOne = undefined
            

        }
        
        appendNumber(e.target.innerText);
    })
})



allClearButton.addEventListener('click', clear)

equalsButton.addEventListener('click', () => {
    if (operandOne == undefined && operandTwo == undefined) {
        screen.innerText = 0;
        return
    }
    operandTwo = screen.textContent
    console.log(operate(operator, operandOne, operandTwo))
    screen.textContent = result;
    operandOne = result;
    operandTwo = undefined;
    operandSelector = true;
    operator = undefined;
    clickedOperatorsArray = []
    lastOperator = undefined
});


