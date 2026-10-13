let baseICT = [];

async function cargarDatos() {

    const response =
        await fetch("./base_ict.json");

    baseICT =
        await response.json();


}