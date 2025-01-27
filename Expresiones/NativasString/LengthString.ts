import { AST } from "../../AST/AST";
import { Entorno } from "../../AST/Entorno";
import { Tipo } from "../../AST/Tipo";
import { Simbolo } from "../../AST/Simbolo";
import { Expresion } from "../../Interfaces/Expresion";
import { Excepcion } from "../../AST/Excepcion";
import { QuadControlador } from "../../Traductor/QuadControlador";
import { Quadrupla } from "../../Traductor/Quadrupla";

export class LengthString implements Expresion {
    linea: number;
    columna: number;
    identificador: string;

    constructor(identificador: string, linea: number, columna: number){
        this.identificador = identificador;      
        this.linea = linea;
        this.columna = columna;   
    }
    traducir(controlador:QuadControlador):Quadrupla|undefined{
        return;
    }
    getTipo(ent: Entorno, arbol: AST): Tipo {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof(valor) === 'boolean')
        {
            return Tipo.BOOL;
        }
        else if (typeof(valor) === 'string')
        {
            if(this.isChar(valor)){
                return Tipo.CHAR;
            }
            return Tipo.STRING;
        }
        else if (typeof(valor) === 'number')
        {
            if(this.isInt(Number(valor))){
                return Tipo.INT;
            }
           return Tipo.DOUBLE;
        }
        else if(valor === null){
            return Tipo.NULL;
        }
            
        return Tipo.VOID;
    }
    

    getValorImplicito(ent: Entorno, arbol: AST) {
        
          if (ent.existeEnActual(this.identificador)) {
                let simbolo:Simbolo = ent.getSimbolo(this.identificador);
                let typeSimbolo = simbolo.getTipo(ent,arbol);
                let valueSimbolo: any = simbolo.getValorImplicito(ent,arbol);
                if( typeSimbolo == Tipo.STRING){
                    if(valueSimbolo != Tipo.NULL){
                        return valueSimbolo.length;
                
                    }else {
                        return new Excepcion(this.linea,this.columna,"Error Semantico","No puede obtener el tamaño de una cadena con un valor Null",ent.getEntorno());
                    }
                    
                }else{
                    return new Excepcion(this.linea, this.columna, "Error Semantico", "Tipo de Dato Erroneo para Funcion length()",ent.getEntorno());
                }
            } else {
                return new Excepcion(this.linea, this.columna, "Error Semantico", "La variable no esta definida",ent.getEntorno());
            }
           
        } 
       
    isInt(n:number){
        return Number(n) === n && n % 1 === 0;
    }

    isChar(cadena:string){
        return cadena.length == 3 && cadena.charAt(0) === "'" && cadena.charAt(cadena.length-1) === "'";
    }
}