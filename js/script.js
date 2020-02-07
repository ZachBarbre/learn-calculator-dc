'use strict';

const input = document.querySelector('#input'), // input/output button
  numbers = document.querySelectorAll('.numbers div'), // number buttons
  operators = document.querySelectorAll('.operators div'), // operator buttons
  result = document.querySelector('#result'), // equal button
  clear = document.querySelector('#clear'), // clear button
  operatorsSymbols = ['*','-','+','/','.'];

let resultDisplayed = false; // flag to keep an eye on what output is displayed
let calculateArray = [];

function addEventListenerToNodelist(nodelist){
  nodelist.forEach(function(node){
    node.addEventListener('click', function(event){
      if(resultDisplayed){
        input.innerHTML = '';
        resultDisplayed = false;
      }
      console.log(`${node.innerText} Clicked!`)
      if (node.innerText === 'C'){
        input.innerHTML = '';
        console.log(input.innerHTML);
      } 
      else if (operatorsSymbols.includes(node.innerText)){
        addOperatorInput(node.innerText);
      }
      // else if (node.innerHTML === '.'){
      //   addDecimalInput(node.innerHTML);
      // }
      else {
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

// function addDecimalInput(decimal){
  
// }
 
function addEventListenerToResult(result){
  result.addEventListener('click', function(event){
    console.log(`${result} clicked`);
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