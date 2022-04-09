const screen = document.getElementById('screen')
const history = document.getElementById('history')

let temporal;
let result;
let operador;
let nextIsErased = false;

const reset = () =>{
    temporal = "";
    screen.textContent = "0";
    history.textContent = "";
    operador = "";
    nextIsErased = false;
    result = "";
}

const key = (c) => {
    if(c === "delete"){
        if(nextIsErased){
            temporal = "";
            operador = "";
            history.textContent = "";
            result=""
            return
        }
        screen.textContent =  screen.textContent.length === 1 ? '0': screen.textContent.slice(0,-1)
    }
    if(c === "." && !(screen.textContent.includes(".")) ){
        screen.textContent += "."
    }
    if(c === "sign"){
        if(nextIsErased){
            temporal = "";
            operador = "";
            history.textContent = "";
            result=""
        }
        if(screen.textContent === "0") return;
        screen.textContent = screen.textContent.includes('-') ? screen.textContent.slice(1) : '-'+screen.textContent
    }
    if(typeof c === "number"){
        if(nextIsErased){
            history.textContent=`${temporal} ${operador}`
            screen.textContent = c
            nextIsErased = false
            return
        }
        screen.textContent = screen.textContent === '0' ? c : screen.textContent+c
    }

    if(c === '%'){
        if(operador){
            screen.textContent = parseFloat(parseFloat(parseFloat(screen.textContent) / 100 * parseFloat(temporal)).toFixed(4).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')).toString()
            history.textContent += ` ${screen.textContent}` 
            return
        }
    }

    if(c === '/'){
        operation('/')
    }

    if(c === '*'){
        operation('*')
    }

    if(c === '+'){
        operation('+')
    }

    if(c === '-'){
        operation('-')
    }

    if(c === "="){
        if(!temporal)return;
        if(operador === "/"){
            result = (parseFloat(temporal) / parseFloat(screen.textContent)).toString()
        }
        if(operador === "+"){
            result = (parseFloat(temporal) + parseFloat(screen.textContent)).toString()
        }
        if(operador === "*"){
            result = parseFloat(parseFloat(parseFloat(temporal) * parseFloat(screen.textContent)).toFixed(4).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')).toString()
        }
        if(operador === "-"){
            result = (parseFloat(temporal) - parseFloat(screen.textContent)).toString()
        }

        screen.textContent = screen.textContent.slice(-1) === "." ? screen.textContent.slice(0,-1) : screen.textContent
        history.textContent = `${temporal} ${operador} ${screen.textContent} = ${result}`
        screen.textContent = result;
        nextIsErased = true
        operador = ""
        temporal = ""
        result=""
        
    }
}

const operation =(o)=>{
        if(operador){
            if(operador === "/"){             
                result = (parseFloat(temporal) / parseFloat(screen.textContent)).toString()
            }
            if(operador === "*"){
                result = parseFloat(parseFloat(parseFloat(temporal) * parseFloat(screen.textContent)).toFixed(4).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')).toString()
            }
            if(operador === "+"){
                result = (parseFloat(temporal) + parseFloat(screen.textContent)).toString()
            }
            if(operador === "-"){
                result = (parseFloat(temporal) - parseFloat(screen.textContent)).toString()
            }

            operador =o
            history.textContent = `${result} ${operador}`
            screen.textContent = result;
            temporal = screen.textContent
            nextIsErased = true
            return
        }

        screen.textContent = screen.textContent.slice(-1) === "." ? screen.textContent.slice(0,-1) : screen.textContent
        temporal = screen.textContent
        operador = o
        history.textContent = temporal + " " + operador
        nextIsErased = true
    
}