function importar(nombre) {
    let nombre_bl = "txt_lista_negra"
    let file, destino_data;
    let cb_file_val = get_select_value("cb_file");
    file = nombre + cb_file_val + ".dt";

    if (cb_file_val == "MA") destino_data = "txt_ma";
    if (cb_file_val == "MIT") destino_data = "txt_mit";
 
    try {
        console.time("importar: " + file);
        console.log("Nombre del archivo a importar: ", file)
        let archivo = localStorage.getItem(file);
        let archivo_bl = localStorage.getItem("lista_negra.dt");
        if (archivo == null) {
            guardar(nombre, destino_data);
        }

        element(destino_data).value = archivo;
        console.log(archivo_bl);
        element(nombre_bl).value = archivo_bl;
        actualizar_conteo();
    } catch (err) {
        alert(err.message);
    }

    console.timeEnd("importar: " + file);
}

function guardar(archivo, origen_data = "") {

    if (origen_data!="txt_lista_negra"){
        let e = element("cb_file");
        if (origen_data == "txt_ma") {
            archivo += "MA"
        } else {
            archivo += "MIT"
        }
    }
  
    archivo += ".dt";

    console.time("guardar: " + archivo);
    if (storageAvailable('localStorage')) {
        console.log("Nombre del archivo de guardado: ", archivo)
        if (origen_data == "") localStorage.setItem(archivo, "");
        else localStorage.setItem(archivo, element(origen_data).value);
    } else {
        alert("El almacenamiento de datos está completo. \nPor favor, proceda a presionar el botón <Limpiar Data> y registre los datos necesarios\n[La data maxima es 25Mb.]");
    }
    console.timeEnd("guardar: " + archivo);
}




function depurar(nombre) {
    console.time("DEPURAR: " + nombre);
    let data = text_to_data(nombre);

    if (radio_button_value("rb_tipo") == "sms_") {
        data = filtro_numeros(data);
    } else {
        data = filtro_email(data);
    }
    element(nombre).value = data_to_text(data);
    actualizar_conteo();
    console.timeEnd("DEPURAR: " + nombre);
}

function exportar_excel(txt_id) {
    let arr = text_to_data(txt_id);
    let data = array_to_object(arr);
    const xls = new XlsExport(data);
    let file_name = nombre_archivo() + get_select_value("cb_file");  
    xls.exportToXLS("Datos Filtrados - " + file_name + '.xls');
}

function limpiar_data() {
    if (confirm('¿Proceder a limpiar la base de datos?')) {
        localStorage.clear();
        alert("Se ha vacíado la base de dato exitosamente.");
    }
    location.reload();
}

function eliminar_archivo(txt_m) {
    if (confirm('¿Proceder limpiar los datos del archivo?')) {
        let file_name = nombre_archivo();
        
        file_name += txt_m;
        file_name+= ".dt";
        console.log("Archivo eliminado: ", file_name);
        localStorage.removeItem(file_name);
    }
   // location.reload();
}

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}