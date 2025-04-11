const PI = 3.14;
function sumar(x, y) {
let resultado = x+y;
return resultado;
}
const restar = (c, d) => {
    let resultado = c-d;
    return resultado;
};
const multiplicar = (a, b) => {
    let resultado = a*b;
    return resultado;
};
function dividir(p, q) {
    let resultado = p/q;
    return resultado;
}
const nums = ["dos", "cuatro", "ocho", "diez"];
export {PI, sumar, multiplicar, restar, dividir, nums};