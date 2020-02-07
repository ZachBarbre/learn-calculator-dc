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
      console.log(`${node.innerText} Clicked!`)
      if (node.innerText === 'C'){
        input.innerHTML = '';
        console.log(input.innerHTML);
      } 
      else if (operatorsSymbols.includes(node.innerText)){
        addOperatorInput(node.innerText);
      }
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
 
function addEventListenerToItem(item){
  item.addEventListener('click', function(event){
    console.log(`${item} clicked`);
  })
}

  addEventListenerToNodelist(numbers);
  addEventListenerToNodelist(operators);
  addEventListenerToItem(result);