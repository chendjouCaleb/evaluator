import {Evaluator} from "../evaluator";

test("évaluation d'expression arithmétique", () => {
    expect(new Evaluator("cos(90)+sin(180)+5").Eval()).toBe(5);
    expect(new Evaluator("").Eval()).toBe(0);
    expect(new Evaluator("1*10+12+32-4").Eval()).toBe(50);
    expect(new Evaluator("17.36/10+45").Eval()).toBe(46.736);
    expect(new Evaluator("+17.36+45").Eval()).toBe(62.36);
    expect(new Evaluator("-17.36+45").Eval()).toBe(27.64);
    expect(new Evaluator(".36+45").Eval()).toBe(45.36);
    expect(new Evaluator("(.363)+45").Eval()).toBe(45.363);
    expect(new Evaluator("10^2+45").Eval()).toBe(145);
    expect(new Evaluator("3!+45").Eval()).toBe(51);
    expect(new Evaluator("PI+45").Eval()).toBe(48.1415926535898);
    expect(new Evaluator("10E+47").Eval()).toBe(74.18281828459045);
    expect(new Evaluator("3cos(90)+E").Eval()).toBe(2.718281828459045);
});