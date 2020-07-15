// funciones que se van a usar abajo
const enumIns = ["inc", "dec", "halt", "goto", "move", "clear", "add", "copy"];
const expectedValue = [1, 1, 1, 1, 2, 1, 3, 3];
// Revisa si el input esta vacio
function isEmpty(input: string): boolean {
  if (input.trim() == "") {
    return true;
  } else {
    return false;
  }
}

// revisa si es entero

function isInt(input: string) {
  if (input.indexOf(".") !== -1) {
    return false;
  } else {
    return true;
  }
}

// revisa que los elementos de lista sean enteros y que sean la misma cantidad de datos de numero esperado

function listaValInts(input: string[], numeroEsperado: number) {
  let listaFiltrada = input.filter((x) => {
    return !isNaN(Number(x)) && isInt(x) && !isEmpty(x);
  });
  if (input.length == listaFiltrada.length && input.length == numeroEsperado) {
    return true;
  } else {
    return false;
  }
}
//Cuenta la cantidad de veces que sale un input
function count(lista: any[], comparacion: any) {
  let count = 0;
  lista.forEach((x) => {
    if (x == comparacion) {
      count += 1;
    }
  });
  return count;
}
// Revisa que la instruccion sea valida

function instruccionesValidas(
  ins: string,
  parametros: string[],
  numReg: number
): boolean {
  if (ins == "halt") {
    if (parametros[0].trim() == "" && parametros.length == 1) {
      return true;
    } else {
      return false;
    }
  } else if (listaValInts(parametros, expectedValue[enumIns.indexOf(ins)])) {
    if (ins == "goto") {
      return true;
    } else {
      let check = parametros.filter(
        (x) => Number(x) < numReg && count(parametros, x) == 1
      );
      if (check.length == parametros.length) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  //Data inicial y su boton
  const numeroDeRegistros = document.querySelector(
    "#numRegistros"
  )! as HTMLInputElement;
  const sizeInput = document.querySelector("#sizeInput")! as HTMLInputElement;
  const btnInicio: HTMLButtonElement = document.querySelector(
    "#btnInicio"
  )! as HTMLButtonElement;

  //Valores finales de estos datos para que queden en el tipo deseado
  let numDeReg: number;
  let sizeIn: number;

  // Maquina que se va a representar con una tabla
  const maquina = document.querySelector("#maquina")! as HTMLElement;
  const maquinaTabla = document.querySelector(".maquina")! as HTMLElement;
  const maquinaData = document.querySelector(
    "#registrosData"
  )! as HTMLInputElement;
  const btnMaquina: HTMLButtonElement = document.querySelector(
    "#btnData"
  )! as HTMLButtonElement;

  // Instrucciones
  const divInstrucciones = document.querySelector(
    ".divinstrucciones"
  )! as HTMLElement;
  // determina si apretas para agregar lista o ejecutar instruccion
  let modo = "";
  //Menu de instrucciones
  const instruccion = document.querySelector(".instruccion")! as HTMLElement;
  const instruccionVal = document.querySelector(".accion")! as HTMLInputElement;
  const param = document.querySelector(".valores")! as HTMLInputElement;

  // va a guardar las instrucciones que se le entregan a la maquina
  let listaDeinstrucciones: [string, string[]][] = [];

  // Lista de instrucciones html
  let listaInsHtml = document.querySelector("#listaIns")! as HTMLElement;

  //Divisiones de instrucciones individuales y en lista
  const divInstruccionesLista = document.querySelector(
    ".lista"
  )! as HTMLElement;
  //Botones para ir cambiando de menu
  const btnIndividual = document.querySelector(
    "#btnIndividual"
  )! as HTMLButtonElement;
  const btnLista = document.querySelector("#btnLista")! as HTMLButtonElement;
  // Boton para agregar o ejectuar instrucciones
  const btnIns = document.querySelector("#agregar")! as HTMLButtonElement;

  // Botones de la lista
  const btnReset = document.querySelector("#reset")! as HTMLButtonElement;
  const btnEjecutar = document.querySelector(
    "#ejecutar-ins"
  )! as HTMLButtonElement;

  // El boton de Inicio va a escuchar si es clikiado para activar la data incicial y hacer visible la tabla si es el caso
  btnInicio.addEventListener("click", () => {
    // Se definen variables para este scope
    let sizeInputscope = sizeInput.value;
    let numDeRegistros = numeroDeRegistros.value;

    // Se revisa que el input no este vacio, sea entero y que no tenga caracteres inapropiados
    if (isEmpty(sizeInputscope) || isEmpty(numDeRegistros)) {
      alert("Alguno de sus inputs esta vacio");
    } else if (isNaN(Number(sizeInputscope)) || isNaN(Number(numDeRegistros))) {
      alert("Contiene algun caracter invalido");
    } else if (!isInt(sizeInputscope) || !isInt(numDeRegistros)) {
      alert("Contiene algun valor no entero");
    } else {
      // Se bloque que el boton pueda ser apretado denuevo para que no se sobreescriban las variables, se muestra la division maquina y se fijan el numero de registrso y el size input a un number
      btnInicio.disabled = true;
      maquina.classList.remove("invisible");
      numDeReg = Number(numeroDeRegistros.value);
      sizeIn = Number(sizeInput.value);
    }
  });

  btnMaquina.addEventListener("click", () => {
    let data = maquinaData.value.split(",");

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
    } else {
      alert(
        "Algun dato esta mal implementado revise si todos sus valores son enteros"
      );
    }
  });

  function initMaquina(data: string[]) {
    data.forEach((value, index) => {
      // se crea una fila de tabla
      let tableRow = document.createElement("tr");

      // se crean los elementos y se le asignan valores y al valor un id
      let numRegistro = document.createElement("td");
      numRegistro.innerText = String(index);
      let valorRegistro = document.createElement("td");
      valorRegistro.innerHTML = String(value);
      valorRegistro.setAttribute("id", String(index));

      // Se agregan a la fila
      tableRow.appendChild(numRegistro);
      tableRow.appendChild(valorRegistro);

      // se agrega a la maquina
      maquinaTabla.appendChild(tableRow);
    });
  }

  btnLista.addEventListener("click", () => {
    // Se desabilita el boton actual se habilita el otro y se cambian que div esta escondida y cual no
    instruccion.classList.remove("invisible");
    divInstruccionesLista.classList.remove("invisible");
    btnLista.disabled = true;
    btnIndividual.disabled = false;
    let btnInscont = btnIns.firstChild! as HTMLElement;
    btnInscont.textContent = "Agregar Instruccion";
    modo = "lista";
  });

  btnIndividual.addEventListener("click", () => {
    instruccion.classList.remove("invisible");
    divInstruccionesLista.classList.add("invisible");
    btnLista.disabled = false;
    btnIndividual.disabled = true;
    let btnInscont = btnIns.firstChild! as HTMLElement;
    btnInscont.textContent = "Ejecutar Instruccion";
    modo = "Ind";
  });

  // Escucha el boton que revisa el input de las instrucciones
  btnIns.addEventListener("click", () => {
    let parametros = param.value.split(",");
    let ins = instruccionVal.value;
    if (instruccionesValidas(ins, parametros, numDeReg)) {
      if (modo == "lista") {
        agregarInstruccion(ins, parametros);
      } else {
        btnEjecutar.disabled = true;
        btnIns.disabled = true;
        partirMaquina(
          [
            [ins, parametros],
            ["halt", [""]],
            ["", [""]],
          ],
          false
        );
      }
    } else {
      alert("Sus parametros tienen algun error");
    }
  });
  btnReset.addEventListener("click", () => resetInstrucciones());

  btnEjecutar.addEventListener("click", () => {
    if (checkearInstrucciones(listaDeinstrucciones)) {
      partirMaquina(listaDeinstrucciones, true);
      btnEjecutar.disabled = true;
      btnIns.disabled = true;
    } else {
      alert("Hay algun error es sus instrucciones, cuidado con sus dec");
    }
  });
  function agregarInstruccion(ins: string, param: string[]): void {
    // Se agrega al htlm
    let listItem = document.createElement("li");
    listItem.setAttribute("id", "0" + listaDeinstrucciones.length);
    listItem.textContent =
      ins.toUpperCase() + "(" + param.reduce((acum, x) => acum + "," + x) + ")";
    listaInsHtml.appendChild(listItem);
    // Se agrega a la lista interna
    listaDeinstrucciones.push([ins, param]);
  }
  function resetInstrucciones() {
    divInstruccionesLista.removeChild(listaInsHtml);
    let nuevaLista = document.createElement("ol");
    nuevaLista.setAttribute("id", "listaIns");
    nuevaLista.setAttribute("start", "0");
    divInstruccionesLista.appendChild(nuevaLista);
    listaInsHtml = nuevaLista;
    listaDeinstrucciones = [];
  }

  function checkearInstrucciones(instrucciones: [string, string[]][]) {
    let pc = 0;
    // Funcion que revisa que el pc no pase el largo de la lista
    // falla en el caso dec halt ..... ya que siempre asume que el dec es mayor que 0
    for (let i = 0; i < instrucciones.length; i++) {
      if (instrucciones[i][0] == "goto") {
        pc = Number(instrucciones[i][1][0]) - 1;
      } else if (instrucciones[i][0] == "dec") {
        pc += 2;
        i++;
      } else if (instrucciones[i][0] == "halt") {
        return true;
      } else {
        pc += 1;
      }
      if (pc >= instrucciones.length) {
        return false;
      }
    }
    return true;
  }

  function partirMaquina(
    instrucciones: [string, string[]][],
    isLista: boolean
  ) {
    // Instancia maquina y parte los procesos
    let maquina = procesos(instrucciones, true, isLista);
    maquina.correr();
  }
  function sleep(ms: number) {
    // Corta una funcion await en x ms
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const procesos = (
    instrucciones: [string, string[]][],
    primario: boolean,
    isLista: boolean
  ) => {
    return {
      instrucciones,
      primario,
      isLista,

      tiempoEspera: 250,
      pc: 0,
      // Se hizo una funcion async para que pudieran hacerse tiempos de espera entre las instrucciones y asi poder captarlas
      correr: async function correr() {
        while (this.instrucciones[this.pc][0] !== "halt") {
          if (this.primario && this.isLista) {
            let instruccionEnLista = document.getElementById(
              "0" + this.pc
            )! as HTMLElement;
            instruccionEnLista.classList.add("bold");
          }
          let accion = this.instrucciones[this.pc][0];
          let param = this.instrucciones[this.pc][1];
          if (accion == "inc") {
            this.inc(param);
          } else if (accion == "dec") {
            this.dec(param);
          } else if (accion == "goto") {
            this.goto(param);
          } else if (accion == "clear") {
            let espera = this.clear(param);
            let esperaPaso = await sleep(espera);
          } else if (accion == "move") {
            let espera = this.move(param);
            let esperaPaso = await sleep(espera);
          } else if (accion == "add") {
            let espera = this.add(param);
            let esperaPaso = await sleep(espera);
          } else if (accion == "copy") {
            let espera = this.copy(param);
            let esperaPaso = await sleep(espera);
          }
          let espera = await sleep(this.tiempoEspera);
          // Pone en bold la instruccion que se esta ejectuando en este momento
          if (this.primario && accion == "dec" && this.isLista) {
            let numreg = String(Number(param[0]));
            let registro = document.getElementById(numreg)! as HTMLElement;
            if (registro.textContent == "0") {
              let pcAnterior = Number(this.pc - 1);
              let instruccionEnLista = document.getElementById(
                "0" + pcAnterior
              )! as HTMLElement;
              instruccionEnLista.classList.remove("bold");
            } else {
              let pcAnterior = String(Number(this.pc - 2));
              let instruccionEnLista = document.getElementById(
                "0" + pcAnterior
              )! as HTMLElement;
              instruccionEnLista.classList.remove("bold");
            }
          } else if (this.primario && accion == "goto" && this.isLista) {
            for (let i = 0; i < this.instrucciones.length; i++) {
              let instruccionEnLista = document.getElementById(
                "0" + i
              )! as HTMLElement;
              instruccionEnLista.classList.remove("bold");
            }
          } else if (this.primario && this.isLista) {
            let pcAnterior = Number(this.pc - 1);
            let instruccionEnLista = document.getElementById(
              "0" + pcAnterior
            )! as HTMLElement;
            instruccionEnLista.classList.remove("bold");
          }
        }
        if (this.primario) {
          this.halt();
        }
      },
      halt() {
        // Rehabilita los botones que antes estaban desabilitados y muestra el resultado
        btnEjecutar.disabled = false;
        btnIns.disabled = false;
        let res = document.getElementById("resultado")! as HTMLElement;
        let r0 = document.getElementById("0")! as HTMLElement;
        res.classList.remove("invisible");
        res.innerHTML = `Resultado: ${r0?.innerHTML}`;
      },
      inc(r: string[]) {
        // sube en uno el valor del registro r, cambia la instruccion en uno
        let numRegistro = String(Number(r[0]));
        let registro = document.getElementById(numRegistro)! as HTMLElement;
        registro.textContent = String(Number(registro.textContent) + 1);
        this.pc += 1;
      },

      dec(r: string[]) {
        // baja en uno el valor del registro r, cambia la instruccion en dos o uno dependiendo
        // del valor del registro
        let numRegistro = String(Number(r[0]));
        let registro = document.getElementById(numRegistro)! as HTMLElement;
        let valorRegistro = Number(registro.innerText);
        if (valorRegistro > 0) {
          registro.innerHTML = String(valorRegistro - 1);
          this.pc += 2;
        } else {
          this.pc += 1;
        }
      },

      goto(r: string[]) {
        // Mueve que instruccion se esta leyendo
        this.pc = Number(r[0]);
      },

      clear(r: string[]) {
        let numRegistro = String(Number(r[0]));

        let instrucciones: [string, string[]][] = [
          ["dec", [numRegistro]],
          ["halt", [""]],
          ["goto", ["0"]],
        ];
        let registro = document.getElementById(numRegistro)! as HTMLElement;
        let numInicial = Number(registro.innerHTML);
        let fase = procesos(instrucciones, false, true);
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

      move(arr: string[]) {
        // Se aplica string number para que no salgan resultados como 00 o 03 que retornarian nulo
        let r = String(Number(arr[0]));
        let s = String(Number(arr[1]));
        let instrucciones: [string, string[]][] = [
          ["clear", [s]],
          ["dec", [r]],
          ["halt", [""]],
          ["inc", [s]],
          ["goto", ["1"]],
        ];
        let registroFinal = document.getElementById(s)! as HTMLElement;
        let registroInicial = document.getElementById(r)! as HTMLElement;
        let numRegistroObjetivo = Number(registroFinal.innerHTML);
        let numRegistroAMover = Number(registroInicial.innerHTML);
        let fase = procesos(instrucciones, false, true);
        fase.tiempoEspera = 100;
        fase.correr();
        this.pc += 1;

        let tiempoClear = 2 * fase.tiempoEspera * (numRegistroObjetivo + 2);
        let tiempoCambios = 3 * fase.tiempoEspera * (numRegistroAMover + 2);
        // para que el programa no avanze mientras se ejectua este comando
        return tiempoClear + tiempoCambios;
      },
      add(param: string[]) {
        let r = String(Number(param[0]));
        let s = String(Number(param[1]));
        let t = String(Number(param[2]));
        let instrucciones: [string, string[]][] = [
          ["dec", [r]],
          ["halt", [""]],
          ["inc", [s]],
          ["inc", [t]],
          ["goto", ["0"]],
        ];
        let registroInicial = document.getElementById(r)! as HTMLElement;
        let numRegistroASumar = Number(registroInicial.innerHTML);
        let fase = procesos(instrucciones, false, true);
        fase.tiempoEspera = 100;
        fase.correr();
        this.pc += 1;
        // se hacen 4 operaciones cada turno
        let tiempo = 4 * fase.tiempoEspera * (numRegistroASumar + 2);
        return tiempo;
      },

      copy(param: string[]) {
        let r = String(Number(param[0]));
        let s = String(Number(param[1]));
        let t = String(Number(param[2]));
        let instrucciones: [string, string[]][] = [
          ["clear", [s]],
          ["move", [r, t]],
          ["add", [t, r, s]],
          ["halt", [""]],
        ];
        //data para tiempo clear s
        let registroACopiar = document.getElementById(s)! as HTMLElement;
        let numInicial = Number(registroACopiar.innerHTML);
        //data para tiempo move r,t
        let registroFinalMove = document.getElementById(t)! as HTMLElement;
        let registroInicialMove = document.getElementById(r)! as HTMLElement;
        let numRegistroObjetivoMove = Number(registroFinalMove.innerHTML);
        let numRegistroAMover = Number(registroInicialMove.innerHTML);

        let fase = procesos(instrucciones, false, true);
        fase.tiempoEspera = 100;
        fase.correr();
        this.pc += 1;

        // tiempos
        //clear
        let tiempoCLear = 2 * fase.tiempoEspera * (numInicial + 2);
        //move
        let tiempoClearMove =
          2 * fase.tiempoEspera * (numRegistroObjetivoMove + 2);
        let tiempoCambiosMove = 3 * fase.tiempoEspera * (numRegistroAMover + 2);
        //add
        //Como t tiene el valor de el registro r inicial se utiliza ese
        let tiempoAdd = 4 * fase.tiempoEspera * (numRegistroAMover + 2);
        // se suman todos los tiempos y el halt final
        return (
          tiempoCLear +
          tiempoClearMove +
          tiempoCambiosMove +
          tiempoAdd +
          fase.tiempoEspera
        );
      },
    };
  };
});
