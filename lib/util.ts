export function throwTokenError(token: string, position: number) {
    throw new Error(`Unexprectd token '${token}' at position ${position}`)
}

export const LETTERS = "abcdefghijklmnopqrstuvwxyz_π" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const DIGITS = "0123456789";
export const OPERATORS = "*/-+%^";
export const PARENTHESIS = "()";
export const EXPRESSION_KEYS= LETTERS + DIGITS + OPERATORS + PARENTHESIS

export function isExpressionKey(key: string): boolean{
    return EXPRESSION_KEYS.indexOf(key) > -1;
}
   
export function isNumber(character: string) {
       if(!character) return false;
       return DIGITS.indexOf(character) > -1;
   }
   
export function isLetter(character: string){
       if(!character) return false;
   
       return LETTERS.indexOf(character) > -1;
   }
   
export function isOperator(key: string): boolean{
       return OPERATORS.indexOf(key) > -1;
   }
   
   export function isParenthesis(key: string): boolean{
       return PARENTHESIS.indexOf(key) > -1;
   }