"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identificador = void 0;
const Excepcion_1 = require("../AST/Excepcion");
class Identificador {
    constructor(identificador, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = null;
        this.identificador = identificador;
    }
    getTipo(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    getValorImplicito(ent, arbol) {
        if (ent.existeEnActual(this.identificador)) {
            let simbolo = ent.getSimbolo(this.identificador);
            return simbolo.getValorImplicito(ent, arbol);
        }
        else {
            return new Excepcion_1.Excepcion(this.linea, this.columna, "Error Semantico", "La variable no existe");
        }
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
}
exports.Identificador = Identificador;