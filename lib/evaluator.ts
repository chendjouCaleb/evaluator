import { Factorial, applyFunction } from "./function";
import { Variable } from "./variable";
import { throwTokenError, isLetter } from "./util";

export class Evaluator {
    private depth = 0;
    constructor(private expression: string, private cursor: number = 0 ){
        //console.log(`${expression} = ${this.Eval()}`);
        
    }

    Eval(): number {
        let value = this.term();
        while(this.getCurrent() == '+' || this.getCurrent() == '-'){
            if(this.popCurrent() == '-'){
                value -= this.term();
            }else{
                value += this.term();
            }
        }
        if(this.getCurrent()){
            if(this.getCurrent() == ')' && this.depth != 0){
                
            }else{
                this.throwTokenError();
            }
            
        }


        return value;
    }

    number(): number{
        let value = '';
        while(this.isNumber(this.getCurrent())){
            value += this.popCurrent();
        }

        if(this.getCurrent() == '.'){
            value += this.popCurrent();
        }

        while(this.isNumber(this.getCurrent())){
            value += this.popCurrent();
        }

        return +value;
    }

    factor(): number{
        if(!this.getCurrent()) return 0;
        let factor = 0;
        if(this.isNumber(this.getCurrent())){
            factor = this.number();
            if(this.getCurrent() == '('){
                factor *= this.factor();
            }
        }

        else if(this.getCurrent() == '+'){
            this.popCurrent();
            factor = this.factor();
        }else if(this.getCurrent() == '-'){
            this.popCurrent();
            factor = -this.factor();
        }else if(this.getCurrent() == '.'){
            this.popCurrent();
            let number = this.factor();
            let power = number.toString().length;
            factor = number / Math.pow(10, power);
        }else if(this.getCurrent() === '('){
            this.depth++;
            this.popCurrent();
            //let subEvaluator = new Evaluator(this.expression, this.cursor);
            factor = this.Eval();
            if(this.getCurrent() != ')'){
                this.throwExpectedToken(')');
            }
            this.popCurrent();
            this.depth--;
            if(this.getCurrent() === '('){
                factor *= this.factor();
            }
        }else if(isLetter(this.getCurrent())){
            let name = this.getName();
            if(this.getCurrent() == '('){
                this.depth++;
                this.popCurrent();
                let values = [];
                values.push(this.Eval());
                if(this.getCurrent() != ')'){
                    this.throwExpectedToken(')');
                }
                this.depth--;
                this.popCurrent();
                factor = applyFunction(name, values);
            }else{
                factor = Variable.getStorage().Get(name);
            }
            
        }
        else{
            throw new Error(`Unexpected token '${this.getCurrent()}' at position ${this.cursor}`);
        }

        if(this.getCurrent() == '^'){
            this.popCurrent();
            let power = this.factor();
            factor = Math.pow(factor, power);
        }

        if(this.getCurrent() == '!'){
            this.popCurrent();
            factor = Factorial(factor);
        }
        if(isLetter(this.getCurrent())){
            factor *= this.factor();
        }

        return factor;
    }

    term(): number {
        let value = this.factor();
        while(this.getCurrent() == '/' || this.getCurrent() == '*'){
            if(this.popCurrent() == '/'){
                value /= this.factor();
            }else{
                value *= this.factor();
            }
        }
        return value;
    }


    getName(){
        let name = "";
        while(isLetter(this.getCurrent()) || this.isNumber(this.getCurrent())){
            name = name + this.popCurrent();
        }
        return name;
    }

    popCurrent(): string {
        let character = this.getCurrent();
        this.cursor++;
        return character;
    }

    getCurrent(): string {
        return this.expression[this.cursor];
    }

    isNumber(character: string) {
        if(!character) return false;
        return character.charCodeAt(0) >= '0'.charCodeAt(0) && character.charCodeAt(0) <= '9'.charCodeAt(0) 
    }

    
    throwTokenError(){
        throwTokenError(this.getCurrent(), this.cursor);
    }

    throwExpectedToken(token: string){
        throw new Error(`Le caractère '${token}' est attendu à la position ${this.cursor}`)
    }
    
}