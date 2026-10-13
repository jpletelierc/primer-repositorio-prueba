function obtenerICT(anio, mes) {

    return baseICT.find(
        fila =>
            fila.Glosa === "ICT GENERAL" &&
            fila["Año"] == anio &&
            fila["Mes"] == mes
    );

}

function obtenerSerieOficial(
    anioIni,
    mesIni,
    anioFin,
    mesFin
){

    const fechaIni =
        Number(
            `${anioIni}${String(mesIni)
            .padStart(2,"0")}`
        );

    const fechaFin =
        Number(
            `${anioFin}${String(mesFin)
            .padStart(2,"0")}`
        );

    return baseICT.filter(fila => {

        if(
            fila.Glosa !==
            "ICT GENERAL"
        ){
            return false;
        }

        const periodo =
            Number(
                `${fila["Año"]}${String(
                    fila["Mes"]
                ).padStart(2,"0")}`
            );

        return (
            periodo >= fechaIni &&
            periodo <= fechaFin
        );

    });

}