var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// funciones que se van a usar abajo
var enumIns = ["inc", "dec", "halt", "goto", "move", "clear", "add", "copy"];
var expectedValue = [1, 1, 1, 1, 2, 1, 3, 3];
// Revisa si el input esta vacio
function isEmpty(input) {
    if (input.trim() == "") {
        return true;
    }
    else {
        return false;
    }
}
// revisa si es entero
function isInt(input) {
    if (input.indexOf(".") !== -1) {
        return false;
    }
    else {
        return true;
    }
}
// revisa que los elementos de lista sean enteros y que sean la misma cantidad de datos de numero esperado
function listaValInts(input, numeroEsperado) {
    var listaFiltrada = input.filter(function (x) {
        return !isNaN(Number(x)) && isInt(x) && !isEmpty(x);
    });
    if (input.length == listaFiltrada.length && input.length == numeroEsperado) {
        return true;
    }
    else {
        return false;
    }
}
//Cuenta la cantidad de veces que sale un input
function count(lista, comparacion) {
    var count = 0;
    lista.forEach(function (x) {
        if (x == comparacion) {
            count += 1;
        }
    });
    return count;
}
// Revisa que la instruccion sea valida
function instruccionesValidas(ins, parametros, numReg) {
    if (ins == "halt") {
        if (parametros[0].trim() == "" && parametros.length == 1) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (listaValInts(parametros, expectedValue[enumIns.indexOf(ins)])) {
        if (ins == "goto") {
            return true;
        }
        else {
            var check = parametros.filter(function (x) { return Number(x) < numReg && count(parametros, x) == 1; });
            if (check.length == parametros.length) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    else {
        return false;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    //Data inicial y su boton
    var numeroDeRegistros = document.querySelector("#numRegistros");
    var sizeInput = document.querySelector("#sizeInput");
    var btnInicio = document.querySelector("#btnInicio");
    //Valores finales de estos datos para que queden en el tipo deseado
    var numDeReg;
    var sizeIn;
    // Maquina que se va a representar con una tabla
    var maquina = document.querySelector("#maquina");
    var maquinaTabla = document.querySelector(".maquina");
    var maquinaData = document.querySelector("#registrosData");
    var btnMaquina = document.querySelector("#btnData");
    // Instrucciones
    var divInstrucciones = document.querySelector(".divinstrucciones");
    // determina si apretas para agregar lista o ejecutar instruccion
    var modo = "";
    //Menu de instrucciones
    var instruccion = document.querySelector(".instruccion");
    var instruccionVal = document.querySelector(".accion");
    var param = document.querySelector(".valores");
    // va a guardar las instrucciones que se le entregan a la maquina
    var listaDeinstrucciones = [];
    // Lista de instrucciones html
    var listaInsHtml = document.querySelector("#listaIns");
    //Divisiones de instrucciones individuales y en lista
    var divInstruccionesLista = document.querySelector(".lista");
    //Botones para ir cambiando de menu
    var btnIndividual = document.querySelector("#btnIndividual");
    var btnLista = document.querySelector("#btnLista");
    // Boton para agregar o ejectuar instrucciones
    var btnIns = document.querySelector("#agregar");
    // Botones de la lista
    var btnReset = document.querySelector("#reset");
    var btnEjecutar = document.querySelector("#ejecutar-ins");
    // El boton de Inicio va a escuchar si es clikiado para activar la data incicial y hacer visible la tabla si es el caso
    btnInicio.addEventListener("click", function () {
        // Se definen variables para este scope
        var sizeInputscope = sizeInput.value;
        var numDeRegistros = numeroDeRegistros.value;
        // Se revisa que el input no este vacio, sea entero y que no tenga caracteres inapropiados
        if (isEmpty(sizeInputscope) || isEmpty(numDeRegistros)) {
            alert("Alguno de sus inputs esta vacio");
        }
        else if (isNaN(Number(sizeInputscope)) || isNaN(Number(numDeRegistros))) {
            alert("Contiene algun caracter invalido");
        }
        else if (!isInt(sizeInputscope) || !isInt(numDeRegistros)) {
            alert("Contiene algun valor no entero");
        }
        else {
            // Se bloque que el boton pueda ser apretado denuevo para que no se sobreescriban las variables, se muestra la division maquina y se fijan el numero de registrso y el size input a un number
            btnInicio.disabled = true;
            maquina.classList.remove("invisible");
            numDeReg = Number(numeroDeRegistros.value);
            sizeIn = Number(sizeInput.value);
        }
    });
    btnMaquina.addEventListener("click", function () {
        var data = maquinaData.value.split(",");
        // Se revisa que los valores dentro de la data sean enteros
        if (listaValInts(data, sizeIn)) {
            // Se agregan valores 0 hasta llegar al numero de registros
            while (data.length < numDeReg) {
                data.push("0");
            }
            // Se desabilita el boton y se le agrega la data a la tabla y se habilitan las instrucciones
            btnMaquina.disabled = true;
            initMaquina(data.slice(0, numDeReg));
            divInstrucciones.classList.remove("invisible");
        }
        else {
            alert("Algun dato esta mal implementado revise si todos sus valores son enteros");
        }
    });
    function initMaquina(data) {
        data.forEach(function (value, index) {
            // se crea una fila de tabla
            var tableRow = document.createElement("tr");
            // se crean los elementos y se le asignan valores y al valor un id
            var numRegistro = document.createElement("td");
            numRegistro.innerText = String(index);
            var valorRegistro = document.createElement("td");
            valorRegistro.innerHTML = String(value);
            valorRegistro.setAttribute("id", String(index));
            // Se agregan a la fila
            tableRow.appendChild(numRegistro);
            tableRow.appendChild(valorRegistro);
            // se agrega a la maquina
            maquinaTabla.appendChild(tableRow);
        });
    }
    btnLista.addEventListener("click", function () {
        // Se desabilita el boton actual se habilita el otro y se cambian que div esta escondida y cual no
        instruccion.classList.remove("invisible");
        divInstruccionesLista.classList.remove("invisible");
        btnLista.disabled = true;
        btnIndividual.disabled = false;
        var btnInscont = btnIns.firstChild;
        btnInscont.textContent = "Agregar Instruccion";
        modo = "lista";
    });
    btnIndividual.addEventListener("click", function () {
        instruccion.classList.remove("invisible");
        divInstruccionesLista.classList.add("invisible");
        btnLista.disabled = false;
        btnIndividual.disabled = true;
        var btnInscont = btnIns.firstChild;
        btnInscont.textContent = "Ejecutar Instruccion";
        modo = "Ind";
    });
    // Escucha el boton que revisa el input de las instrucciones
    btnIns.addEventListener("click", function () {
        var parametros = param.value.split(",");
        var ins = instruccionVal.value;
        if (instruccionesValidas(ins, parametros, numDeReg)) {
            if (modo == "lista") {
                agregarInstruccion(ins, parametros);
            }
            else {
                btnEjecutar.disabled = true;
                btnIns.disabled = true;
                partirMaquina([
                    [ins, parametros],
                    ["halt", [""]],
                    ["", [""]],
                ], false);
            }
        }
        else {
            alert("Sus parametros tienen algun error");
        }
    });
    btnReset.addEventListener("click", function () { return resetInstrucciones(); });
    btnEjecutar.addEventListener("click", function () {
        if (checkearInstrucciones(listaDeinstrucciones)) {
            partirMaquina(listaDeinstrucciones, true);
            btnEjecutar.disabled = true;
            btnIns.disabled = true;
        }
        else {
            alert("Hay algun error es sus instrucciones, cuidado con sus dec");
        }
    });
    function agregarInstruccion(ins, param) {
        // Se agrega al htlm
        var listItem = document.createElement("li");
        listItem.setAttribute("id", "0" + listaDeinstrucciones.length);
        listItem.textContent =
            ins.toUpperCase() + "(" + param.reduce(function (acum, x) { return acum + "," + x; }) + ")";
        listaInsHtml.appendChild(listItem);
        // Se agrega a la lista interna
        listaDeinstrucciones.push([ins, param]);
    }
    function resetInstrucciones() {
        divInstruccionesLista.removeChild(listaInsHtml);
        var nuevaLista = document.createElement("ol");
        nuevaLista.setAttribute("id", "listaIns");
        nuevaLista.setAttribute("start", "0");
        divInstruccionesLista.appendChild(nuevaLista);
        listaInsHtml = nuevaLista;
        listaDeinstrucciones = [];
    }
    function checkearInstrucciones(instrucciones) {
        var pc = 0;
        // Funcion que revisa que el pc no pase el largo de la lista
        // falla en el caso dec halt ..... ya que siempre asume que el dec es mayor que 0
        for (var i = 0; i < instrucciones.length; i++) {
            if (instrucciones[i][0] == "goto") {
                pc = Number(instrucciones[i][1][0]) - 1;
            }
            else if (instrucciones[i][0] == "dec") {
                pc += 2;
                i++;
            }
            else if (instrucciones[i][0] == "halt") {
                return true;
            }
            else {
                pc += 1;
            }
            if (pc >= instrucciones.length) {
                return false;
            }
        }
        return true;
    }
    function partirMaquina(instrucciones, isLista) {
        // Instancia maquina y parte los procesos
        var maquina = procesos(instrucciones, true, isLista);
        maquina.correr();
    }
    function sleep(ms) {
        // Corta una funcion await en x ms
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    }
    var procesos = function (instrucciones, primario, isLista) {
        return {
            instrucciones: instrucciones,
            primario: primario,
            isLista: isLista,
            tiempoEspera: 250,
            pc: 0,
            // Se hizo una funcion async para que pudieran hacerse tiempos de espera entre las instrucciones y asi poder captarlas
            correr: function correr() {
                return __awaiter(this, void 0, void 0, function () {
                    var instruccionEnLista, accion, param_1, espera_1, esperaPaso, espera_2, esperaPaso, espera_3, esperaPaso, espera_4, esperaPaso, espera, numreg, registro, pcAnterior, instruccionEnLista, pcAnterior, instruccionEnLista, i, instruccionEnLista, pcAnterior, instruccionEnLista;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(this.instrucciones[this.pc][0] !== "halt")) return [3 /*break*/, 13];
                                if (this.primario && this.isLista) {
                                    instruccionEnLista = document.getElementById("0" + this.pc);
                                    instruccionEnLista.classList.add("bold");
                                }
                                accion = this.instrucciones[this.pc][0];
                                param_1 = this.instrucciones[this.pc][1];
                                if (!(accion == "inc")) return [3 /*break*/, 1];
                                this.inc(param_1);
                                return [3 /*break*/, 11];
                            case 1:
                                if (!(accion == "dec")) return [3 /*break*/, 2];
                                this.dec(param_1);
                                return [3 /*break*/, 11];
                            case 2:
                                if (!(accion == "goto")) return [3 /*break*/, 3];
                                this.goto(param_1);
                                return [3 /*break*/, 11];
                            case 3:
                                if (!(accion == "clear")) return [3 /*break*/, 5];
                                espera_1 = this.clear(param_1);
                                return [4 /*yield*/, sleep(espera_1)];
                            case 4:
                                esperaPaso = _a.sent();
                                return [3 /*break*/, 11];
                            case 5:
                                if (!(accion == "move")) return [3 /*break*/, 7];
                                espera_2 = this.move(param_1);
                                return [4 /*yield*/, sleep(espera_2)];
                            case 6:
                                esperaPaso = _a.sent();
                                return [3 /*break*/, 11];
                            case 7:
                                if (!(accion == "add")) return [3 /*break*/, 9];
                                espera_3 = this.add(param_1);
                                return [4 /*yield*/, sleep(espera_3)];
                            case 8:
                                esperaPaso = _a.sent();
                                return [3 /*break*/, 11];
                            case 9:
                                if (!(accion == "copy")) return [3 /*break*/, 11];
                                espera_4 = this.copy(param_1);
                                return [4 /*yield*/, sleep(espera_4)];
                            case 10:
                                esperaPaso = _a.sent();
                                _a.label = 11;
                            case 11: return [4 /*yield*/, sleep(this.tiempoEspera)];
                            case 12:
                                espera = _a.sent();
                                // Pone en bold la instruccion que se esta ejectuando en este momento
                                if (this.primario && accion == "dec" && this.isLista) {
                                    numreg = String(Number(param_1[0]));
                                    registro = document.getElementById(numreg);
                                    if (registro.textContent == "0") {
                                        pcAnterior = Number(this.pc - 1);
                                        instruccionEnLista = document.getElementById("0" + pcAnterior);
                                        instruccionEnLista.classList.remove("bold");
                                    }
                                    else {
                                        pcAnterior = String(Number(this.pc - 2));
                                        instruccionEnLista = document.getElementById("0" + pcAnterior);
                                        instruccionEnLista.classList.remove("bold");
                                    }
                                }
                                else if (this.primario && accion == "goto" && this.isLista) {
                                    for (i = 0; i < this.instrucciones.length; i++) {
                                        instruccionEnLista = document.getElementById("0" + i);
                                        instruccionEnLista.classList.remove("bold");
                                    }
                                }
                                else if (this.primario && this.isLista) {
                                    pcAnterior = Number(this.pc - 1);
                                    instruccionEnLista = document.getElementById("0" + pcAnterior);
                                    instruccionEnLista.classList.remove("bold");
                                }
                                return [3 /*break*/, 0];
                            case 13:
                                if (this.primario) {
                                    this.halt();
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            },
            halt: function () {
                // Rehabilita los botones que antes estaban desabilitados y muestra el resultado
                btnEjecutar.disabled = false;
                btnIns.disabled = false;
                var res = document.getElementById("resultado");
                var r0 = document.getElementById("0");
                res.classList.remove("invisible");
                res.innerHTML = "Resultado: " + (r0 === null || r0 === void 0 ? void 0 : r0.innerHTML);
            },
            inc: function (r) {
                // sube en uno el valor del registro r, cambia la instruccion en uno
                var numRegistro = String(Number(r[0]));
                var registro = document.getElementById(numRegistro);
                registro.textContent = String(Number(registro.textContent) + 1);
                this.pc += 1;
            },
            dec: function (r) {
                // baja en uno el valor del registro r, cambia la instruccion en dos o uno dependiendo
                // del valor del registro
                var numRegistro = String(Number(r[0]));
                var registro = document.getElementById(numRegistro);
                var valorRegistro = Number(registro.innerText);
                if (valorRegistro > 0) {
                    registro.innerHTML = String(valorRegistro - 1);
                    this.pc += 2;
                }
                else {
                    this.pc += 1;
                }
            },
            goto: function (r) {
                // Mueve que instruccion se esta leyendo
                this.pc = Number(r[0]);
            },
            clear: function (r) {
                var numRegistro = String(Number(r[0]));
                var instrucciones = [
                    ["dec", [numRegistro]],
                    ["halt", [""]],
                    ["goto", ["0"]],
                ];
                var registro = document.getElementById(numRegistro);
                var numInicial = Number(registro.innerHTML);
                var fase = procesos(instrucciones, false, true);
                fase.tiempoEspera = 100;
                fase.correr();
                this.pc += 1;
                // para que el programa no avanze mientras se ejectua este comando
                // formula que se utiliza para calcular este tiempo es:
                // numero de registro a borrar mas 1 que es la cantidad de pasos
                // multiplicado por cuanto espera
                // y por ultimo la cantidad de instrucciones que hay
                // el mas 2 es por el halt y por que para borrar por ejemplo 4 se necesitan 5 pasos
                return 2 * fase.tiempoEspera * (numInicial + 2);
            },
            move: function (arr) {
                // Se aplica string number para que no salgan resultados como 00 o 03 que retornarian nulo
                var r = String(Number(arr[0]));
                var s = String(Number(arr[1]));
                var instrucciones = [
                    ["clear", [s]],
                    ["dec", [r]],
                    ["halt", [""]],
                    ["inc", [s]],
                    ["goto", ["1"]],
                ];
                var registroFinal = document.getElementById(s);
                var registroInicial = document.getElementById(r);
                var numRegistroObjetivo = Number(registroFinal.innerHTML);
                var numRegistroAMover = Number(registroInicial.innerHTML);
                var fase = procesos(instrucciones, false, true);
                fase.tiempoEspera = 100;
                fase.correr();
                this.pc += 1;
                var tiempoClear = 2 * fase.tiempoEspera * (numRegistroObjetivo + 2);
                var tiempoCambios = 3 * fase.tiempoEspera * (numRegistroAMover + 2);
                // para que el programa no avanze mientras se ejectua este comando
                return tiempoClear + tiempoCambios;
            },
            add: function (param) {
                var r = String(Number(param[0]));
                var s = String(Number(param[1]));
                var t = String(Number(param[2]));
                var instrucciones = [
                    ["dec", [r]],
                    ["halt", [""]],
                    ["inc", [s]],
                    ["inc", [t]],
                    ["goto", ["0"]],
                ];
                var registroInicial = document.getElementById(r);
                var numRegistroASumar = Number(registroInicial.innerHTML);
                var fase = procesos(instrucciones, false, true);
                fase.tiempoEspera = 100;
                fase.correr();
                this.pc += 1;
                // se hacen 4 operaciones cada turno
                var tiempo = 4 * fase.tiempoEspera * (numRegistroASumar + 2);
                return tiempo;
            },
            copy: function (param) {
                var r = String(Number(param[0]));
                var s = String(Number(param[1]));
                var t = String(Number(param[2]));
                var instrucciones = [
                    ["clear", [s]],
                    ["move", [r, t]],
                    ["add", [t, r, s]],
                    ["halt", [""]],
                ];
                //data para tiempo clear s
                var registroACopiar = document.getElementById(s);
                var numInicial = Number(registroACopiar.innerHTML);
                //data para tiempo move r,t
                var registroFinalMove = document.getElementById(t);
                var registroInicialMove = document.getElementById(r);
                var numRegistroObjetivoMove = Number(registroFinalMove.innerHTML);
                var numRegistroAMover = Number(registroInicialMove.innerHTML);
                var fase = procesos(instrucciones, false, true);
                fase.tiempoEspera = 100;
                fase.correr();
                this.pc += 1;
                // tiempos
                //clear
                var tiempoCLear = 2 * fase.tiempoEspera * (numInicial + 2);
                //move
                var tiempoClearMove = 2 * fase.tiempoEspera * (numRegistroObjetivoMove + 2);
                var tiempoCambiosMove = 3 * fase.tiempoEspera * (numRegistroAMover + 2);
                //add
                //Como t tiene el valor de el registro r inicial se utiliza ese
                var tiempoAdd = 4 * fase.tiempoEspera * (numRegistroAMover + 2);
                // se suman todos los tiempos y el halt final
                return (tiempoCLear +
                    tiempoClearMove +
                    tiempoCambiosMove +
                    tiempoAdd +
                    fase.tiempoEspera);
            }
        };
    };
});
