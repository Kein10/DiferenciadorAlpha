let elementos = [{
        name: "txt_ma",
        contador: "txt_total_ma"
    },
    {
        name: "txt_mit",
        contador: "txt_total_mit"
    },
    {
        name: "txt_lista_negra",
        contador: "txt_total_lista_negra"
    },
    {
        name: "txt_data",
        contador: "txt_total_data"
    }
];


//Valoda Email
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Encargada del filtrado de los dato (funcion principal)
function filtrar() {

    console.time("Filtrar: ");
    $("#btn_filtrar").removeClass("btn btn-primary");
    $("#btn_filtrar").addClass("btn btn-warning");

    if (!element("txt_data").value == "") {
        let data, sms;
        let cb_file_val = get_select_value("cb_file");


        data = text_to_data((cb_file_val=="MA")?"txt_ma":"txt_mit");

        //Asignar valores, dar formato arreglo y ordenar
        sms = text_to_data("txt_data");
        lista_negra = text_to_data("txt_lista_negra");



        //Filtrar datos según tipo
        if (radio_button_value("rb_tipo") == "sms_") {
            sms = filtro_numeros(sms);
        } else {
            sms = filtro_email(sms);
        }

        data = diferenciar(sms, data)
        data = diferenciar(data, lista_negra);

        element("txt_data").value = data.join("\n"); //Limpiar duplicados y Enviar datos 
        actualizar_conteo();
    }

    $("#btn_filtrar").removeClass("btn btn-warning");
    $("#btn_filtrar").addClass("btn btn-success");

    alert("El filtrado ha finalizado.");

    console.timeEnd("Filtrar: ");
    setTimeout(function () {
        $("#btn_filtrar").removeClass("btn btn-success");
        $("#btn_filtrar").addClass("btn btn-primary");
    }, 2000);
}


//LIMPIEZA DE FORMULARIO
function limpiar(limpiar_todo) {
    
    if (limpiar_todo) {
        elementos.forEach(elemento => {
            element(elemento["name"]).value = "";
        });
    } else {
        element("txt_data").value = ""
        element("txt_datos_filtrados").value = ""
    }
    // actualizar_conteo();
}


function importar_todo() {
    importar('txt_matricula_actual', '');
}