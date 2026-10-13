function calcularIndiceAlternativo(
    anio,
    mes,
    ponderadores
){

    const gruposMes =
    baseICT.filter(
        fila =>

            fila["Año"] == anio &&

            fila["Mes"] == mes &&

            fila["Grupo"] != "" &&

            fila["Clase"] == ""
    );

    let suma = 0;

    gruposMes.forEach(fila => {

        const glosa =
            fila.Glosa;

        const indice =
            Number(
                fila["Índice"]
            );

        const pond =
            ponderadores[
                glosa
            ] || 0;


        suma +=
            indice * pond;

    });


    return suma;

}

function crearSerieAlternativa(
    anioIni,
    mesIni,
    anioFin,
    mesFin,
    ponderadores
){

    const fechaIni =
        Number(
            `${anioIni}${String(
                mesIni
            ).padStart(2,"0")}`
        );

    const fechaFin =
        Number(
            `${anioFin}${String(
                mesFin
            ).padStart(2,"0")}`
        );

    const periodos =
        [...new Set(

            baseICT.map(
                fila =>
                `${fila["Año"]}-${fila["Mes"]}`
            )

        )];

    return periodos.map(

        periodo => {

            const partes =
                periodo.split("-");

            const anio =
                Number(
                    partes[0]
                );

            const mes =
                Number(
                    partes[1]
                );

            const periodoNum =
                Number(
                    `${anio}${String(
                        mes
                    ).padStart(2,"0")}`
                );

            if(
                periodoNum <
                fechaIni
            ){
                return null;
            }

            if(
                periodoNum >
                fechaFin
            ){
                return null;
            }

            if(anio < 2024){
                
                return {

                    anio,

                    mes,

                    indice: null

                };

            }

            return {

                anio,

                mes,

                indice:
                calcularIndiceAlternativo(

                    anio,

                    mes,

                    ponderadores

                )

            };

        }

    ).filter(Boolean);

}