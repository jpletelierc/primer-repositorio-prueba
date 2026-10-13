let graficoICT = null;

let autoValor;

let autoCombustible;
let autoRRHH;
let autoCirculacion;
let autoFinancieros;
let autoRepuestos;
let autoMantencion;


document.addEventListener(
    "DOMContentLoaded",
    async () => {

        [
            "pondCombustible",
            "pondRRHH",
            "pondCirculacion",
            "pondFinancieros",
            "pondRepuestos",
            "pondMantencion"
        ]
        .forEach(id => {
            document
            .getElementById(id)
            .addEventListener(
                "input",
                actualizarPorcentajes
            );
        });

        autoValor =
        new AutoNumeric(
            "#valorBase",
            {
                digitGroupSeparator: ".",
                decimalCharacter: ",",
                decimalPlaces: 0
            }
        );
        
        autoCombustible =
        new AutoNumeric(
            "#pondCombustible",
            {
                digitGroupSeparator: ".",
                decimalCharacter: ",",
                decimalPlaces: 0
            }
        );
        
        autoRRHH =
        new AutoNumeric(
            "#pondRRHH",
            {
                digitGroupSeparator: ".",
                decimalCharacter: ",",
                decimalPlaces: 0
            }
        );
        autoCirculacion =
        new AutoNumeric(
            "#pondCirculacion",
            {
                digitGroupSeparator: ".",
                decimalCharacter: ",",
                decimalPlaces: 0
            }
        );
        
        autoFinancieros =
        new AutoNumeric(
            "#pondFinancieros",
            {
                digitGroupSeparator: ".",
                decimalCharacter: ",",
                decimalPlaces: 0
            }
        );
        
        autoRepuestos =
        new AutoNumeric(
            "#pondRepuestos",
            {
                digitGroupSeparator: ".",
                decimalCharacter: ",",
                decimalPlaces: 0
            }
        );
        
        autoMantencion =
        new AutoNumeric(
            "#pondMantencion",
            {
                digitGroupSeparator: ".",
                decimalCharacter: ",",
                decimalPlaces: 0
            }
        );

        await cargarDatos();

        const ictGeneral =
            baseICT.filter(
                fila =>
                    fila.Glosa === "ICT GENERAL"
            );

        const anios =
            [...new Set(
                ictGeneral.map(
                    x => x["Año"]
                )
            )];

        const selectInicio =
            document.getElementById(
                "anioInicial"
            )
            ;

        const selectFin =
            document.getElementById(
                "anioFinal"
            );

        anios.forEach(anio => {

            selectInicio.innerHTML +=
                `<option>${anio}</option>`;

            selectFin.innerHTML +=
                `<option>${anio}</option>`;

        });
        document
        .getElementById(
            "anioInicial"
        )
        .value = 2024;

        const meses = {
            1:"Enero",
            2:"Febrero",
            3:"Marzo",
            4:"Abril",
            5:"Mayo",
            6:"Junio",
            7:"Julio",
            8:"Agosto",
            9:"Septiembre",
            10:"Octubre",
            11:"Noviembre",
            12:"Diciembre"
        };
        for(let i=1;i<=12;i++){
            document
            .getElementById("mesInicial")
            .innerHTML +=
            `<option value="${i}">
               ${meses[i]}
               </option>`;

            document
            .getElementById("mesFinal")
            .innerHTML +=
            `<option value="${i}">
               ${meses[i]}
            </option>`;

        }
        
        const ultimoRegistro =
            ictGeneral
            .sort((a,b) => {
                const fechaA =
                    Number(
                        `${a["Año"]}${String(a["Mes"])
                        .padStart(2,"0")}`
                    );

                const fechaB =
                    Number(
                        `${b["Año"]}${String(b["Mes"])
                        .padStart(2,"0")}`
                    );

                return fechaB - fechaA;

            })[0];

document
.getElementById(
    "anioFinal"
)
.value =
ultimoRegistro["Año"];

document
.getElementById(
    "mesFinal"
)
.value =
ultimoRegistro["Mes"];

        document
        .getElementById("btnCalcular")
        .addEventListener(
            "click",
            calcularICT
        );

    }
);



function formatoIndice(valor){

    return Number(valor)
    .toLocaleString(
        "es-CL",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

}

function formatoPorcentaje(valor){

    return Number(valor)
    .toLocaleString(
        "es-CL",
        {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }
    );

}



function actualizarPorcentajes(){

    const valores = {

        combustible:
            Number(
                autoCombustible.getNumericString()
            ),

        rrhh:
            Number(
                autoRRHH.getNumericString()
            ),

        circulacion:
            Number(
                autoCirculacion.getNumericString()
            ),

        financieros:
            Number(
                autoFinancieros.getNumericString()
            ),

        repuestos:
            Number(
                autoRepuestos.getNumericString()
            ),

        mantencion:
            Number(
                autoMantencion.getNumericString()
            )

    };

    const total =
        Object.values(
            valores
        ).reduce(
            (a,b)=>a+b,
            0
        );

    const pct = valor =>
        
        Number(
            valor /
            total *
            100
        )
        
        .toLocaleString(
            "es-CL",
            {
                minimumFractionDigits:1,
                maximumFractionDigits:1
            }
        );

    document.getElementById(
        "pctCombustible"
    ).textContent =
        pct(valores.combustible)
        + "%";

    document.getElementById(
        "pctRRHH"
    ).textContent =
        pct(valores.rrhh)
        + "%";

    document.getElementById(
        "pctCirculacion"
    ).textContent =
        pct(valores.circulacion)
        + "%";

    document.getElementById(
        "pctFinancieros"
    ).textContent =
        pct(valores.financieros)
        + "%";

    document.getElementById(
        "pctRepuestos"
    ).textContent =
        pct(valores.repuestos)
        + "%";

    document.getElementById(
        "pctMantencion"
    ).textContent =
        pct(valores.mantencion)
        + "%";

    document.getElementById(
        "sumaValor"
    ).textContent =
        total.toLocaleString(
            "es-CL"
        );

    const pctTotal =
    document.getElementById(
        "sumaPorcentaje"
    );
    
    pctTotal.textContent =
    total > 0
    ? "100%"
    : "0%";
    
    pctTotal.style.color =
    total > 0
    ? "#43A047"
    : "#FF9800";
}

const nombresMeses = {

    1: "Ene",
    2: "Feb",
    3: "Mar",
    4: "Abr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Ago",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dic"

};

function calcularICT(){

    const valor =
    Number(
        autoValor.getNumericString()
    );

    const anioIni =
        Number(
            document.getElementById(
                "anioInicial"
            ).value
        );

    const mesIni =
        Number(
            document.getElementById(
                "mesInicial"
            ).value
        );

    const anioFin =
        Number(
            document.getElementById(
                "anioFinal"
            ).value
        );

    const mesFin =
        Number(
            document.getElementById(
                "mesFinal"
            ).value
        );

    const inicial =
        obtenerICT(
            anioIni,
            mesIni
        );

    const final =
        obtenerICT(
            anioFin,
            mesFin
        );

    if(!inicial || !final){

        alert(
            "No existe información para ese período."
        );

        return;
    }

    const indiceInicial =
        inicial["Índice"];

    const indiceFinal =
        final["Índice"];

    const variacionExacta =
    (
        (indiceFinal / indiceInicial)
        - 1
    ) * 100;

    const variacion =
    Number(
        variacionExacta.toFixed(1)
    );

    const reajustado =
        valor *
        (
            1 +
            variacion / 100
        );

    const ponderadoresUsuario = {
        "COMBUSTIBLES":
        Number(
            autoCombustible
            .getNumericString()
        ),

        "RECURSOS HUMANOS":
        Number(
            autoRRHH
            .getNumericString()

            ),

        "SERVICIOS RELACIONADOS A LA CIRCULACIÓN DEL TRANSPORTE":
        Number(
            autoCirculacion
            .getNumericString()
            ),

        "SERVICIOS FINANCIEROS":
        Number(
            autoFinancieros
            .getNumericString()
            ),

        "REPUESTOS Y ACCESORIOS PARA EL FUNCIONAMIENTO Y MANTENCIÓN DEL VEHÍCULO":
        Number(
            autoRepuestos
            .getNumericString()
            ),

        "SERVICIO DE MANTENIMIENTO Y REPARACIÓN DEL VEHÍCULO":
            Number(
            autoMantencion
            .getNumericString()
            )

    };

const sumaPonderadores =
Object
.values(
    ponderadoresUsuario
)
.reduce(
    (a,b)=>a+b,
    0
);


if(sumaPonderadores > 0){

    Object.keys(
        ponderadoresUsuario
    ).forEach(grupo => {

        ponderadoresUsuario[
            grupo
        ] =
        ponderadoresUsuario[
            grupo
        ] /
        sumaPonderadores;

    });

}

const altInicial =
    calcularIndiceAlternativo(
        anioIni,
        mesIni,
        ponderadoresUsuario
    );

const altFinal =
    calcularIndiceAlternativo(
        anioFin,
        mesFin,
        ponderadoresUsuario
    );


const sinDatosAjustado =

    !altInicial ||

    altInicial <= 0 ||

    isNaN(altInicial);

const variacionAltExacta =
(
    (altFinal / altInicial)
    - 1
) * 100;

const variacionAlt =
Number(
    variacionAltExacta.toFixed(1)
);

const reajusteAlt =
valor *
(
    1 +
    variacionAlt / 100
);

const diferenciaPP =
    variacionAlt -
    variacion;

const diferenciaMonto =
    reajusteAlt -
    reajustado;

const serieOficial =
    obtenerSerieOficial(
        anioIni,
        mesIni,
        anioFin,
        mesFin
    );

const serieAlternativa =
    crearSerieAlternativa(
        anioIni,
        mesIni,
        anioFin,
        mesFin,
        ponderadoresUsuario
    );

document
.getElementById(
    "resultado"
)
.innerHTML = `

<div class="row">
    <div class="col-md-6 panel-resultado-individual">
        <h4 class="titulo-comparacion">            ICT Oficial
        </h4>
        <div class="linea-resultado">            Índice Inicial:
            <strong>                ${formatoIndice(indiceInicial)}
            </strong>        </div>
        <div class="linea-resultado">            Índice Final:
            <strong>                ${formatoIndice(indiceFinal)}
            </strong>        </div>
        <div class="linea-resultado">            Variación:
            <strong>                ${formatoPorcentaje(variacion)} %
            </strong>        </div>
        <div class="caja-reajuste">
            <div class="caja-reajuste-label">                Valor reajustado
            </div>
            <div class="caja-reajuste-valor reajuste-oficial">
                $
                ${Math.round(reajustado)
                .toLocaleString("es-CL")}

            </div>
        </div>
    </div>
    <div class="col-md-6 panel-resultado-individual">

        <h4 class="titulo-comparacion">

            ICT de estructura ajustada

        </h4>

        ${
        sinDatosAjustado
        ?
        `

        <div class="mensaje-sin-datos">
            <br><br>
            
            No existen datos disponibles para el
            ICT de estructura ajustada para el período
            seleccionado.

            <br><br>

            La serie ajustada se encuentra disponible
            desde enero de 2024.

        </div>

        `
        :
        `

        <div class="linea-resultado">

            Índice Inicial:

            <strong>

               ${formatoIndice(altInicial)}

            </strong>

        </div>

        <div class="linea-resultado">

            Índice Final:

            <strong>

                ${formatoIndice(altFinal)}

            </strong>

        </div>

        <div class="linea-resultado">

            Variación:

            <strong>

                ${formatoPorcentaje(variacionAlt)} %

            </strong>

        </div>

        <div class="caja-reajuste">

            <div class="caja-reajuste-label">

                Valor reajustado

            </div>

            <div class="caja-reajuste-valor reajuste-alt">

                $

                ${Math.round(reajusteAlt)
                .toLocaleString("es-CL")}

            </div>

        </div>
  
        `
        }

    </div>
    </div>
    `;


document
.getElementById(
    "comparacion"
)
.innerHTML = `

    <div
        class="titulo-comparacion">

        Comparación

    </div>

    <div
        class="comparacion-dato">

        Diferencia Variación:

        ${formatoPorcentaje(diferenciaPP)}
        p.p.

    </div>

    <div
        class="comparacion-dato">

        Diferencia Reajuste:

        $

        ${Math.round(
            diferenciaMonto
        ).toLocaleString("es-CL")}

    </div>

`;

const etiquetas =
    serieOficial.map(

        fila =>

        `${nombresMeses[
            fila["Mes"]
        ]}/${
            fila["Año"]
        }`

    );

if(graficoICT){

    graficoICT.destroy();

}

document
.getElementById(
    "panelGrafico"
)
.innerHTML = `

<div class="titulo-comparacion">

    Evolución de los Índices

</div>

<div
    class="contenedor-grafico">

    <canvas
        id="graficoICT">

    </canvas>

</div>

`;

graficoICT =
new Chart(

    document
    .getElementById(
        "graficoICT"
    ),

    {

        type:"line",

        data:{

            labels:
                etiquetas,

            datasets:[

                {

                    label:
                    "ICT Oficial",

                    data:
                    serieOficial.map(
                        x =>
                        x["Índice"]
                    ),

                    borderColor:
                    "#003366",

                    backgroundColor:
                    "#003366",

                    tension:0.2

                },

                {

                    label:
                    "ICT de estructura ajustada",

                    data:
                    serieAlternativa.map(
                        x =>
                        x.indice
                    ),

                    borderColor:
                    "#D95F02",

                    backgroundColor:
                    "#D95F02",

                    tension:0.2

                }

            ]

        },

        options:{
            
            responsive:true,
            maintainAspectRatio:false,
            plugins:{
                legend:{
                    position:"top"
                }
            }
        }
    }

);




}