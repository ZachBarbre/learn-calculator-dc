'use strict';

const input = document.querySelector('#input'), // input/output button
  numbers = document.querySelectorAll('.numbers div'), // number buttons
  operators = document.querySelectorAll('.operators div'), // operator buttons
  result = document.querySelector('#result'), // equal button
  clear = document.querySelector('#clear'), // clear button
  operatorsSymbols = ['*','-','+','/'];

let resultDisplayed = false; // flag to keep an eye on what output is displayed
let calculateArray = [];

function addEventListenerToNodelist(nodelist){
  nodelist.forEach(function(node){
    node.addEventListener('click', function(event){
      if(resultDisplayed){
        input.innerHTML = '';
        resultDisplayed = false;
      }
      switch (true){
        case node.innerText === 'C':
          input.innerHTML = '';
          break;
        case operatorsSymbols.includes(node.innerText):
          addOperatorInput(node.innerText);
          break;
        case node.innerHTML === '.':
          addDecimalInput(node.innerHTML);
          break;
        default:
          input.innerHTML += node.innerText;
      }
    })
    })
  };

function addOperatorInput(operator){
  switch (true){
    case input.innerHTML[0] === undefined:
    case input.innerHTML[input.innerHTML.length - 1] === operator:
      break;
    case operatorsSymbols.includes(input.innerHTML[input.innerHTML.length - 1]):
      input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1) + operator;
      break;
    default:
      input.innerHTML += operator
    }
}

function addDecimalInput(decimal){
  let lastOperatorIndex = 0
  let lastDecimalIndex = 0
  for (let i = 0; i < input.innerText.length; i++){
    if (operatorsSymbols.includes(input.innerHTML[i])){
      lastOperatorIndex = i;
    }
    if (input.innerHTML[i] === '.'){
      lastDecimalIndex = i;
    }
  }
  switch (true){
    case input.innerHTML[0] === undefined:
    case operatorsSymbols.includes(input.innerHTML[input.innerHTML.length - 1]):
      input.innerHTML += '0.'
    case input.innerHTML[input.innerHTML.length - 1] === decimal:
      break;
    case lastDecimalIndex > lastOperatorIndex:
      break;
    default:
      input.innerHTML += decimal;
  }
}
 
function addEventListenerToResult(result){
  result.addEventListener('click', function(event){
    const inputString = input.innerHTML;
    let numberArray = inputString.split(/\+|\-|\*|\//g);
    let operatorsArray = inputString.replace(/[0-9]|\./g, '').split('');
    numberArray = numberArray.map(Number);
    doMultipication(numberArray, operatorsArray);
    doDivison(numberArray, operatorsArray);
    doAddition(numberArray, operatorsArray);
    doSubtraction(numberArray, operatorsArray);
    input.innerHTML = numberArray;
    resultDisplayed = true;
  })
}

function doMultipication(numberArray, operatorsArray){
  let operatorIndex = operatorsArray.indexOf('*');
  while (operatorIndex !== -1){
    let newNumber = numberArray[operatorIndex] * numberArray[operatorIndex + 1];
    operatorsArray.splice(operatorIndex,1);
    numberArray.splice(operatorIndex,2, newNumber);
    operatorIndex = operatorsArray.indexOf('*');
  }
}

function doDivison(numberArray, operatorsArray){
  let operatorIndex = operatorsArray.indexOf('/');
  while (operatorIndex !== -1){
    let newNumber = numberArray[operatorIndex] / numberArray[operatorIndex + 1];
    operatorsArray.splice(operatorIndex,1);
    numberArray.splice(operatorIndex,2, newNumber);
    operatorIndex = operatorsArray.indexOf('/');
  }
}

function doAddition(numberArray, operatorsArray){
  let operatorIndex = operatorsArray.indexOf('+');
  while (operatorIndex !== -1){
    let newNumber = numberArray[operatorIndex] + numberArray[operatorIndex + 1];
    operatorsArray.splice(operatorIndex,1);
    numberArray.splice(operatorIndex,2, newNumber);
    operatorIndex = operatorsArray.indexOf('+');
  }
}

function doSubtraction(numberArray, operatorsArray){
  let operatorIndex = operatorsArray.indexOf('-');
  while (operatorIndex !== -1){
    let newNumber = numberArray[operatorIndex] - numberArray[operatorIndex + 1];
    operatorsArray.splice(operatorIndex,1);
    numberArray.splice(operatorIndex,2, newNumber);
    operatorIndex = operatorsArray.indexOf('-');
  }
}




  addEventListenerToNodelist(numbers);
  addEventListenerToNodelist(operators);
  addEventListenerToResult(result);