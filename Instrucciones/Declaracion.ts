import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

export class Declaracion implements Instruccion {
    linea: number;
    columna: number;
    expresion: Expresion;
    tipo: Tipo;
    identificador: string;

    constructor(identificador: string, exp: Expresion, tipo: Tipo, linea: number, columna: number) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.tipo = tipo;
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        if (this.expresion != null) {
            let valor = this.expresion.getValorImplicito(ent, arbol);
            const tipoValor = this.expresion.getTipo(ent, arbol);
            if (tipoValor == this.tipo || (tipoValor == Tipo.NULL && this.tipo == Tipo.STRING) || this.isDouble(tipoValor)) {
                if (!ent.existe(this.identificador)) {
                    if(this.isDouble(tipoValor)){
                        valor = valor.toFixed(2);
                    }
                    let simbolo: Simbolo = new Simbolo(this.tipo, this.identificador, this.linea, this.columna, valor);
                    ent.agregar(this.identificador, simbolo);
                } else {
                    return new Excepcion(this.linea, this.columna, "Semantico", "La variable ya existe");
                }
            } else {
                return new Excepcion(this.linea, this.columna, "Semantico", "El tipo asignado a la variable no es correcto");
            }
        } else {
            if (!ent.existe(this.identificador)) {
                let simbolo: Simbolo = new Simbolo(this.tipo, this.identificador, this.linea, this.columna, null);
                ent.agregar(this.identificador, simbolo);
            } else {
                return new Excepcion(this.linea, this.columna, "Semantico", "La variable ya existe");
            }
        }
    }

    getTipo(): string {
        if (this.tipo === Tipo.BOOL) {
            return 'boolean';
        }
        else if (this.tipo === Tipo.STRING) {
            return 'string';
        }
        else if (this.tipo === Tipo.INT) {
            return 'int';
        }
        else if (this.tipo === Tipo.DOUBLE) {
            return 'double';
        }
        else if (this.tipo === Tipo.CHAR) {
            return 'char';
        }

        return '';
    }

    isInt(n: number) {
        return Number(n) === n && n % 1 === 0;
    }

    isDouble(tipoValor:any){
        return tipoValor == Tipo.INT && this.tipo == Tipo.DOUBLE
    }
}