"use strict";
class CalculadoraBasica {
    _pantalla = '';
    recienResuelta = false;
    memoria = 0;
    constructor(caja) {
        this._caja = caja;
    }
    /**
     * @param {string} valor
     */
    set pantalla(valor) {
        this.recienResuelta = false;
        this._pantalla = valor;
        this._caja.value = valor;
    }
    get pantalla() {
        return this._pantalla;
    }
    digito(n) {
        if (this.recienResuelta) {
            this.pantalla = '';
        }
        this.pantalla += n;
    }
    suma() {
        this.pantalla += '+';
    }
    resta() {
        this.pantalla += '-';
    }
    punto() {
        this.pantalla += '.';
    }
    multiplicacion() {
        this.pantalla += '*';
    }
    division() {
        this.pantalla += '/';
    }
    mrc() {
        this.pantalla = this.memoria;
        this.recienResuelta = true;
    }
    mMenos() {
        this.memoria -= this.igual();
    }
    mMas() {
        this.memoria += this.igual();
    }
    borrar() {
        this.pantalla = this.pantalla.slice(0, -1);
    }
    igual() {
        try {
            const valor = this._evaluar();
            this.pantalla = valor;
            this.recienResuelta = true;
            return valor;
        }
        catch (error) {
            this.pantalla = 'Error';
            this.recienResuelta = true;
        }
    }
    _evaluar() {
        const n = Number(eval(this.pantalla));
        if (n == undefined)
            throw 'Error';
        return n;
    }

}

class CalculadoraCientifica extends CalculadoraBasica {
    _shiftPressed = false;
    _hypPressed = false;
    constructor(caja) {
        super(caja);
    }
    sin() {
        if (this._shiftPressed && this._hypPressed)
            this.pantalla += 'Math.asinh(';
        else if (this._shiftPressed)
            this.pantalla += 'Math.asin(';
        else if (this._hypPressed)
            this.pantalla += 'Math.sinh(';
        else
            this.pantalla += 'Math.sin(';
    }
    cos() {
        if (this._shiftPressed && this._hypPressed)
            this.pantalla += 'Math.acosh(';
        else if (this._shiftPressed)
            this.pantalla += 'Math.acos(';
        else if (this._hypPressed)
            this.pantalla += 'Math.cosh(';
        else
            this.pantalla += 'Math.cos(';
    }
    tan() {
        if (this._shiftPressed && this._hypPressed)
            this.pantalla += 'Math.atanh(';
        else if (this._shiftPressed)
            this.pantalla += 'Math.atan(';
        else if (this._hypPressed)
            this.pantalla += 'Math.tanh(';
        else
            this.pantalla += 'Math.tan(';
    }
    sqrt() {
        this.pantalla += 'Math.sqrt(';
    }
    log() {
        this.pantalla += 'Math.log(';
    }
    pow() {
        this.pantalla += '**';
    }
    pow2() {
        this.pantalla += '**2';
    }
    powBase10() {
        this.pantalla += '10**';
    }
    leftBracket() {
        this.pantalla += '(';
    }
    rightBracket() {
        this.pantalla += ')';
    }
    pi() {
        this.pantalla += 'Math.PI';
    }
    exp() {
        this.pantalla += 'Math.exp(';
    }
    mod() {
        this.pantalla += '%';
    }
    shift() {
        this._shiftPressed = !this._shiftPressed;
    }
    hyp() {
        this._hypPressed = !this._hypPressed;
    }
    c() {
        this.pantalla = '';
    }
    fact() {
        this.pantalla = 'fact(';
    }
    igual() {
        const p = this.pantalla;
        this.pantalla = p.replace(/fact\(/g, 'calculadora.calcFactorial(');
        super.igual();
    }
    ms() {
        this.memoria = super.igual();
    }
    mc() {
        this.memoria = 0;
    }
    calcFactorial(start = 1, n) {
        if (n == 0)
            return total;
        return factorial(n * total, n - 1);
    }
}
var calculadora = new CalculadoraCientifica(document.getElementById('pantalla'));

