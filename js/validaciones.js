export function valida(input){
    const tipoDeInput = input.dataset.tipo; //dataset para obtenemos la coleccion de todos los DATAS, y con el .tipo es para obtener el data que queremos
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    };
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorDeEdad(fechaCliente)){
        mensaje = 'Debes tener al menos 18 años de edad'
    }
    input.setCustomValidity(mensaje);//funcion que recibe un mensaje
};

function mayorDeEdad(fecha){
    const fechaActual = new Date(); //No se especifica nada porque lo hace automaticamente con la actual
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear()+18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
};