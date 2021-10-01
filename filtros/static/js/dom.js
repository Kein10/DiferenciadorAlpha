

//Obtener elemento por ID
function element(id) {
    return document.getElementById(id);
}

function radio_button_value(name) {
   
    return $(":radio[name="+name+"]:checked").val();;
}

//Agrega u na funcion al evento del elemento dado
function attachEvent(elemento, event, callbackFunction) {
    if (elemento.addEventListener) {
        elemento.addEventListener(event, callbackFunction, false);
    } else if (elemento.attachEvent) {
        elemento.attachEvent('on' + event, callbackFunction);
    }
};

//Trasladar valores como resultado de formato listas
function trasladar_data(data) {
    element("txt_datos_filtrados").value = data.join("\n");
}

//  Obtiene el texto de un input Text y lo convierte 
//  en un arreglo separado por saltos de linea 
function text_to_data(txt_name, duplicados = false) {
    let data = [];
    if (duplicados) {
        data = element(txt_name).value.split("\n");

    } else {
        data = element(txt_name).value.split("\n").unique();
    }

    return data;
}

//  ACTUALIZACION DE CONTEO DE VALORES
function contar_datos(name, saltos_linea = false) {
    let i = 0;
    let data = text_to_data(name, true);

    if (saltos_linea) data = data.filter((value) => value != "");
    if (data.length == 1 && data[0] == "") i = 0;
    else i = data.length;

    element(get_obj(name)["contador"]).value = i;
}


function actualizar_conteo() {
    elementos.forEach(e => {
        contar_datos(e["name"]);
    });
}

function get_select_value(id){
    let e = element("cb_file");
    return e.options[e.selectedIndex].text;
}

function nombre_archivo() {
    let grado, tipo,  file_name;
    grado = radio_button_value("rb_grado");
    tipo =  radio_button_value("rb_tipo");
    file_name = grado + tipo ;
    return file_name;
}