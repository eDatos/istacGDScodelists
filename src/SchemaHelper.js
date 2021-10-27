
function SchemaHelper(services) {
  const cacheHelper = services.CacheHelper;
  const utils = services.Utils;
  
  /**
   * Function that generates the correct Schema minding the given configParams.
   * @param {object} configParams The configParams of the request.
   * @return {list} The list with the Schema.
   */
  this.getColumns = function(configParams) {
    if (configParams.clasificatorType == "inputUrlSelector") {
      this._checkInputURL(configParams);
    }
  
    const url = utils.getUrl(configParams);
    const code = cacheHelper.getHash("schema_data_" + url + cacheHelper.getObjectHash(configParams));
    let mainCols = cacheHelper.get(code);
    if (!mainCols) {
      mainCols = this._processColumns(url, configParams);
      cacheHelper.put(code, mainCols);
    }
  
    return mainCols;
  }
  
  this._processColumns = function(url, configParams) {
    const codelistResponse = cacheHelper.fetchJsonUrl(url);
    
    let colsToReturn = [];    
    const languages = utils.getLanguages(codelistResponse);
    
    if(configParams.decode === "true") {
      colsToReturn.push({id: "Codigo_recodificado", columnRole: "dimension", dataType: "string"});
      colsToReturn.push({id: "Padre_recodificado", columnRole: "dimension", dataType: "string"});
      
      if (configParams.allLanguages === "true") {
        for (let language of languages) {
          colsToReturn.push({id: "Nombre_recodificado_" + language, columnRole: "dimension", dataType: "string"});
        }
      } else {
        colsToReturn.push({id: "Nombre_recodificado", columnRole: "dimension", dataType: "string"});
      }
    }
    
    colsToReturn.push({id: "Codigo_origen", columnRole: "dimension", dataType: "string"});
    colsToReturn.push({id: "Padre_origen", columnRole: "dimension", dataType: "string"});
    if (configParams.allLanguages === "true") {
      for (let language of languages) {
        colsToReturn.push({id: "Nombre_origen_" + language, columnRole: "dimension", dataType: "string"});
      }
    } else {
      colsToReturn.push({id: "Nombre_origen", columnRole: "dimension", dataType: "string"});
    }
    return colsToReturn;
  }
  
  this._checkInputURL = function(configParams) {
    let error = undefined;
    if (!configParams.inputUrl) {
      error = "URL field must not be empty";
    } else if (
      configParams.inputUrl.indexOf(
        "https://datos.canarias.es/api/estadisticas/api/structural-resources/v1.0/codelists/ISTAC/"
      ) !== 0
    ) {
      error = "URL field entered is not correct for this connector";
    }
    if (error) {
      let message = "Por favor, asegúrese de que el campo URL no está vacío y que la URL tiene el siguiente formato: " +
              "https://datos.canarias.es/api/estadisticas/api/structural-resources/v1.0/codelists/ISTAC/CL_CNAE_2009_GRUPOS_VENTA/01.000";
      utils.throwConectorError(error, message);
    }
  }
}

/* global exports */
/* istanbul ignore next */
if (typeof exports !== "undefined") {
  exports["__esModule"] = true;
  exports["default"] = SchemaHelper;
}

