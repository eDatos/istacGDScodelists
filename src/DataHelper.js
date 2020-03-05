
function DataHelper(services) {
  const cacheHelper = services.CacheHelper;
  const utils = services.Utils;
  
  const _mergeRows = function(destination, origin) {
    for(let key of Object.keys(origin)) {
      destination[key] = origin[key];
    }
    return destination;
  }

  /* istanbul ignore next */
  /**
   * Function that gets and process all the data from the ISTAC API minding the given configParams and requested fields
   * @param {object} configParams The configParams of the request.
   * @param {object} requestedFields The requested Fields to get the data from.
   * @return {list} The list with the rows of data.
   */
  
  this.getRows = function(configParams, requestedFields) {
      const requestedFieldsArray = requestedFields.asArray().map(i => i.getId());
      const cachedCode = cacheHelper.getHash(
          "configParams_" + cacheHelper.getObjectHash({'params': configParams, 'fields': requestedFieldsArray})
      );
      let processedRows = cacheHelper.get(cachedCode);
      if (!processedRows) {
          processedRows = this._processData(configParams, requestedFields);
          // ~ 2MB (65000 fields * 32 bytes)
          if (processedRows.length * requestedFieldsArray.length < 65000) {
            cacheHelper.put(cachedCode, processedRows);
          }
      }
      return processedRows;
  }
  
  this._processData = function(configParams, requestedFields) {
    const url = utils.getUrl(configParams);
    let codelistResponse = cacheHelper.fetchJsonUrl(url);  
    
    const requestedFieldsArray = requestedFields.asArray().map(i => i.getId());
    let tableData = {};
  
    const codelistLanguages = utils.getLanguages(codelistResponse);
    
    for (let codeListResponseCode of codelistResponse.code) {
      let row = {};
      row.id = "code" + codeListResponseCode.id;
      row.Codigo_origen = codeListResponseCode.id;
      row.Padre_origen = codeListResponseCode.parent ? codeListResponseCode.parent.substring(codeListResponseCode.parent.lastIndexOf(".") + 1): '';
      codeListResponseCode.parent ? codeListResponseCode.parent.substring(codeListResponseCode.parent.lastIndexOf(".") + 1) : '';
      
      const langValues = utils.keyBy(codeListResponseCode.name.text, "lang");
      
      if (configParams.allLanguages === "true") {
        for (let codelistLanguage of codelistLanguages) {
          row["Nombre_origen_" + codelistLanguage] = (langValues[codelistLanguage] && langValues[codelistLanguage].value) || "";
        }
      } else {
        row.Nombre_origen = (langValues.es && langValues.es.value) || "";
      }
      
      tableData[row.id] = row;
    }
  
  
    if (configParams.decode === "true") {
      const decodeUrl = configParams.decodeCode + "/codes.json?fields=+variableElement";
      const codelistDecodeResponse = cacheHelper.fetchJsonUrl(decodeUrl);
      const decodeLanguages = utils.getLanguages(codelistDecodeResponse);
      
      for (let codelistDecodeResponseCode of codelistDecodeResponse.code) {
        let row = {};
        row.id = "decode" + codelistDecodeResponseCode.id;
        row.Codigo_recodificado = codelistDecodeResponseCode.id;
        row.Padre_recodificado = codelistDecodeResponseCode.parent ? codelistDecodeResponseCode.parent.substring(codelistDecodeResponseCode.parent.lastIndexOf(".") + 1): '';
        
        const langValues = utils.keyBy(codelistDecodeResponseCode.name.text, "lang");
        
        if (configParams.allLanguages === "true") {
          for (let decodeLanguage of decodeLanguages) {
            row["Nombre_recodificado_" + decodeLanguage] = (langValues[decodeLanguage] && langValues[decodeLanguage].value) || "";
          }
        } else {
          row.Nombre_recodificado = (langValues.es && langValues.es.value) || "";
        }
        
        tableData[row.id] = row;
        
        
      }
  
      for (let codeListResponseCode of codelistResponse.code) {
        
        const variableElementId = codeListResponseCode.variableElement.id;
        Codigo_origen = codeListResponseCode.id;
        const recodedCode = codelistDecodeResponse.code.filter(item => item.variableElement.id == variableElementId);
        if (recodedCode.length > 0) {
          Codigo_recodificado = recodedCode[0].id;
          _mergeRows(tableData["code" + Codigo_origen], tableData["decode" + Codigo_recodificado]);
          delete tableData[Codigo_recodificado];
        } else {
          tableData["code" + Codigo_origen]['Codigo_recodificado'] = '';
        }
        
        
      }
    }
  
    let result = []
    for(let key of Object.keys(tableData)) {
      const tableDataItem = tableData[key];
      const rowValues = requestedFieldsArray.map(i => (tableDataItem[i] === null || typeof tableDataItem[i] !== 'undefined') ? tableDataItem[i] : null);
      if(rowValues.every(i => i !== null)) {
        result.push({values: rowValues});
      }
    }
    return result;
  }
}

/* global exports */
/* istanbul ignore next */
if (typeof exports !== "undefined") {
  exports["__esModule"] = true;
  exports["default"] = DataHelper;
}
