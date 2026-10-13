function calcularVariacion(
    indiceInicial,
    indiceFinal
) {

    return (
        (indiceFinal / indiceInicial - 1)
        * 100
    );

}

function calcularReajuste(
    valor,
    indiceInicial,
    indiceFinal
){

    return valor *
        (indiceFinal / indiceInicial);

}