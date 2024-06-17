const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator_keys')
const display = calculator.querySelector('.calculator_display')
const calculate = (n1, operator, n2) => {
    const first = parseFloat(n1);
    const second = parseFloat(n2);
    if (operator === 'add')  return first + second
    if (operator === 'subtract')  return first - second
    if (operator === 'multiply') return first * second;
    if (operator === 'divide') return first / second;
}
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyvalue = key.textContent
        let displayvalue = display.textContent

        Array.from(key.parentNode.children).forEach(k =>
            k.classList.remove('is-depressed'),
        )

        if(action==="add" || action==="subtract" || action==="multiply" || action==="divide"){
            if(calculator.dataset.operator && calculator.dataset.firstValue && !(calculator.dataset.previousKeyType==="calculate" || calculator.dataset.previousKeyType==="operator")){
                const firstValue = calculator.dataset.firstValue
                const operator = calculator.dataset.operator
                const secondValue = displayvalue
                let result=String(calculate(firstValue, operator, secondValue))
                    if(result.length>9) display.textContent = result.substring(0,8);
                    else display.textContent = result;
                displayvalue=display.textContent
            }
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayvalue
            calculator.dataset.operator = action
        }
        
        else if(action==="clear"){
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            }else {
                key.textContent = 'AC'
            }
            
            display.textContent = "0";
            calculator.dataset.previousKeyType === 'clear'
        }
        
        else if(action==="decimal"){
            if(!displayvalue.includes('.')){
                display.textContent = displayvalue + '.';
            }
            if(calculator.dataset.previousKeyType === 'operator' || calculator.dataset.previousKeyType === 'calculate'){
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal'
        }
        
        else if(action==="calculate"){
            if(!calculator.dataset.previousKeyType){
                display.textContent = '0';
            }else{
                if(calculator.dataset.firstValue){
                    let firstValue = calculator.dataset.firstValue
                    const operator = calculator.dataset.operator
                    let secondValue = displayvalue

                    if(calculator.dataset.previousKeyType==="calculate"){
                        firstValue = display.textContent;
                        secondValue = calculator.dataset.modValue;
                    }
                    let result=String(calculate(firstValue, operator, secondValue))
                        if(result.length>9) display.textContent = result.substring(0,8);
                        else display.textContent = result;
                    calculator.dataset.modValue = secondValue
                }
            }
            calculator.dataset.previousKeyType = 'calculate'
        }
        
        else{
            if(displayvalue.length>8){
                display.textContent = displayvalue;
            }
            else if(displayvalue === "0" || calculator.dataset.previousKeyType === 'operator'){
                display.textContent = keyvalue;
            }else{
                display.textContent = displayvalue + keyvalue;
            }
            calculator.dataset.previousKeyType = 'numeric'
        }

        if(action!=="clear"){
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }
    }
  })