export class Variable{
    private variables:{ [index: string]: number } = { };
    private static instance = new Variable();
    private constructor(){
        this.Set("PI", Math.PI);
        this.Set("E", Math.E);
        this.Set("π", Math.PI);
    }

    public static getStorage(): Variable {
        return Variable.instance;
    }

    Set(key: string, value: number){
        this.variables[key] = value;
    }

    Get(key: string){
        const value =  this.variables[key];

        if(!value){
            throw new Error(`La variable ${key} n'existe pas`)
        }
        return value;
    }
}