"use strict"

let operator = "";
let previousValue = "";
let currentValue = "";

let clear = document.querySelector(".clear");
let equal = document.querySelector(".equal");
let decimal = document.querySelector(".decimal");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let deleteBtn = document.querySelector(".delete")

let previous = document.querySelector(".previous");
let current = document.querySelector(".current")

// number clicking
numbers.forEach((number) => number.addEventListener("click", function(e){
    handleNumber(e.target.textContent);
    current.textContent = currentValue; //currentValue is from the handleNumber function
}))

// operator clicking
operators.forEach((op) => op.addEventListener("click",function(e){
    handleOperator(e.target.textContent);
    previous.textContent = previousValue + " " + operator
    current.textContent = currentValue;
}))

// clear button to reset
clear.addEventListener("click", function(){
    previousValue = "";
    currentValue = "";
    operator = "";
    previous.textContent = currentValue;
    current.textContent = currentValue;
})

equal.addEventListener("click", function(){
    if(currentValue != "" && previousValue != ""){
        calculate();
        previous.textContent = "";
        if(previousValue.length <= 8){
            current.textContent = previousValue;
        }else{
            currentScreen.textContent = previousValue.slice(0,5) + "...";
        }
    }
})

decimal.addEventListener("click", function(){
    addDecimal();
})

deleteBtn.addEventListener("click", function(){
    currentValue = currentValue.slice(0,-1);
    current.textContent = currentValue
})


// to collect the number and set rules
function handleNumber(num){
    if(currentValue.length <= 26){
        currentValue += num;
    }
}
// to collect the operator
function handleOperator(op){
    operator = op;
    previousValue = currentValue;
    currentValue = "";

}

function calculate (){
    // convert from string to numbers to make calculations
    previousValue = Number(previousValue) 
    currentValue = Number(currentValue)

    if(operator === "+"){
        previousValue += currentValue
    }else if(operator === "-"){
        previousValue -= currentValue
    }else if(operator === "x"){
        previousValue *= currentValue
    }else if(operator === "/"){
        previousValue /= currentValue
    }else if(operator === "%"){
        previousValue %= currentValue
    }
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
}

function roundNumber(num){
    return Math.round(num * 1000) / 1000;
}

function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue += "."
    }
}
