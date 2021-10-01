//Transponer matriz
function transpose(a) {
    var w = a.length || 0;
    var h = a[0] instanceof Array ? a[0].length : 0;
    if (h === 0 || w === 0) {
        return [];
    }
    var i, j, t = [];
    for (i = 0; i < h; i++) {
        t[i] = [];
        for (j = 0; j < w; j++) {
            t[i][j] = a[j][i];
        }
    }
    return t;
}

//Eliminar datos duplicados en arreglo
Array.prototype.unique = function (a) {
    return function () {
        return this.filter(a)
    }
}(function (a, b, c) {
    return c.indexOf(a, b + 1) < 0
});

//Devuelve los valores que no coinciden con respecto al primer  arreglo
function diferenciar(array1, array2) {
    return array1.filter(value => -1 == array2.indexOf(value));
}

function data_to_text(array) {
    return array.map((data) => (data + "\n")).join("");
}

function filtro_numeros(data) {
    return data.filter((numero => numero != "" && !isNaN(numero) && numero.length == 8));
}

function filtro_email(data){
  data = data.map((email)=> email.replace(',', '.'));
  data = data.filter((email)=> validateEmail(email));
  return data;
}

function convertToArrayOfObjects(data) {
    var keys = data.shift(),
      i = 0,
      k = 0,
      obj = null,
      output = [];
    for (i = 0; i < data.length; i++) {
      obj = {};

      for (k = 0; k < keys.length; k++) {
        obj[keys[k]] = data[i][k];
      }
      output.push(obj);
    }
    return output;
  }

  function array_to_object(arr) {
    return arr.map((val) => val = {
      "Data": val
    });
  }

  //Obtiene el objeto de un arreglo de objetos a partir del nombre
  function get_obj(name){
      let res = elementos.filter((obj) =>  obj.name == name );
    return  (res.length > 0) ? res[0] : null;
  }


  