"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadControlador = void 0;
const Entorno_1 = require("../AST/Entorno");
class QuadControlador {
    /*
        isTrue: Quadrupla[] //ARREGLO PARA IF/ELSE/SWITCH
        isFalse: Quadrupla[];
        breaks: Quadrupla[];
        continues: Quadrupla[];
    
        tables: SymbolTable[];
         stack: SymbolTable[];
    
        labelTrue: string | undefined;
        labelFalse: string | undefined;
    
         sm: SemanticHandler;
         blocks: CodeBlock[];
    
         quadReturn?: Quadrupla;
         returns: Quadrupla[];
    */
    constructor(arbol) {
        this.quads = [];
        this.labels = 0;
        this.temps = 0;
        this.codigo3D = [];
        this.arbol = arbol;
        this.actual = new Entorno_1.Entorno(null);
    }
    getTemp() {
        return `t${this.temps++}`;
    }
    getLabel() {
        return `L${this.labels++}`;
    }
    addQuad(quad) {
        this.quads.push(quad);
    }
}
exports.QuadControlador = QuadControlador;
