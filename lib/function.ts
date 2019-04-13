export class Function{
    constructor(public name: string) {}
    private variables:{ [index: string]: number } = { };

    call(caller: Function): number{
        return 0;
    }

    SetVariable(key: string, value: number){
        this.variables[key] = value;
    }

    GetVariable(key: string){
        const value =  this.variables[key];

        if(!value){
            let message = `La variable ${key} n'existe pas`;
            if(this.name != "main"){
                message += ` dans la fonction '${this.name}'`
            }
            throw new Error(`La variable ${key} n'existe pas`)
        }
        return value;
    }
}
export function Factorial(value: number): number{
    if(value == 0 || value == 1){
        return 1;
    }

    return value * Factorial(value - 1);
}

export function Arrangement(p: number, n: number): number{
    return Factorial(n)/Factorial(n - p);
}

export function combinaison(p: number, n: number): number{
    return Factorial(n)/(Factorial(n-p) * Factorial(p));
}

export function applyFunction(name: string, values: number[]){
    switch(name){
        case "cos":
            return Math.cos(values[0] * Math.PI/180);
        case "sin":
            return Math.sin(values[0] * Math.PI/180);
        case "e":
            return Math.exp(values[0]);
        case "sqrt":
            return Math.sqrt(values[0]);
        default:
            throw new Error(`Unknown function '${name}'`);    
    }
}