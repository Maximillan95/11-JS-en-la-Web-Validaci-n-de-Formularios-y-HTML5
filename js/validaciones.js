export function valida(input){
    const tipoDeInput = input.dataset.tipo; //dataset para obtenemos la coleccion de todos los DATAS, y con el .tipo es para obtener el data que queremos
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    };

    //console.log(input.parentElement);
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    };
};


const tipoDeErrores = [
    'valueMissing',
    'typeMissing',
    'patterMismatch',
    'customError',
];

const mensajesDeError = {
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacío',
    },
    email:{
        valueMissing: 'El campo correo no puede estar vacío',
        typeMissing: 'El correo no es válido',
    },
    password:{
        valueMissing: 'El campo contraseña no puede estar vacío',
        patternMismatch: 'Al menos 6 caracteres, maximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.',
    },
    nacimiento:{
        valueMissing: 'El campo nacimiento no puede estar vacío',
        customError: 'Debes tener al menos 18 años',
    },
    numero:{
        valueMissing: 'El campo numero no puede estar vacío',
        patternMismatch: 'Ingresa tú número telefónico.',
    },
    direccion:{
        valueMissing: 'El campo dirección no puede estar vacío',
        patternMismatch: 'La direccion debe tener entre 10 a 40 caracteres.',
    },
    ciudad:{
        valueMissing: 'El campo ciudad no puede estar vacío',
        patternMismatch: 'La ciudad debe tener entre 10 a 40 caracteres.',
    },
    provincia:{
        valueMissing: 'El campo provincia no puede estar vacío',
        patternMismatch: 'La provincia debe tener entre 10 a 40 caracteres.',
    },
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = '';
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        };
    });
    return mensaje;
};


function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorDeEdad(fechaCliente)){
        mensaje = 'Debes tener al menos 18 años de edad'
    };
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