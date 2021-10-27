function ConfigHelper(services) {
  const METADATA_ENDPOINT = "https://datos.canarias.es/api/estadisticas/api/cmetadata/v1.0/properties.json";
  const ENDPOINT_KEY = "metamac.srm.rest.external";
  const END_OF_ENDPOINT = "/v1.0/variablefamilies.json?limit=1000&orderBy=ID%20ASC%20";
  const END_OF_VARIABLES_ENDPOINT = "/v1.0/variablefamilies/FAMILY_OF_VARIABLE/variables.json?limit=1000&orderBy=ID%20ASC"
  const END_OF_CODELIST_ENDPOINT = "/v1.0/codelists.json?limit=1000&orderBy=ID%20ASC&query=VARIABLE_URN%20EQ%20%22URN_OF_VARIABLE%22";

  const urlFetchApp = services.UrlFetchApp;
  const cacheHelper = services.CacheHelper;
  const utils = services.Utils;
  
  const sortByTitle = function(array) {
    return array.sort((a, b) => {
      const x = a.name.text[0].value;
      const y = b.name.text[0].value;
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  const chooseListToSort = function(response) {
      if (response.variableFamily) {
          return response.variableFamily;
      } else if (response.variable) {
          return response.variable;
      } else if (response.codelist) {
          return response.codelist;
      } else if (response.total == 0) {
          return [];
      } else {
          throw ("Error: the response from the API wasn't one accepted by the connector");
      }
  }
  
  const getEndpoint = function(key, addedString) {
    const parsedResponse = cacheHelper.fetchJsonUrl(METADATA_ENDPOINT);
    return utils.keyBy(parsedResponse.property, "key")[key].value + addedString;
  }
  
  const getAndProcessData = function(url) {
    try {
      const dataResponse = cacheHelper.fetchJsonUrl(url);
      const dataToSort = chooseListToSort(dataResponse);
      const sortedData = sortByTitle(dataToSort);
      return sortedData;
    } catch(e) {
      utils.throwConectorError(e, e);
    }
    return null;
  }
  
  const getProcessAndCacheData = function(cachePrefix, url) {
    const cacheKey = cacheHelper.getHash(cachePrefix + "_" + url);
    let cached = cacheHelper.get(cacheKey);
    if(!cached) {
       cached = getAndProcessData(url);
       if(cached) {
         cacheHelper.put(cacheKey, cached);
       }
    }
    return cached;
  }
  
  this.getDecodeCodelist = function(variable, codelist) {
    const decodeCodelist = this.getCodelist(variable);
    return decodeCodelist.filter(codelistElement => codelistElement.selfLink.href !== codelist);
  }

  /* istanbul ignore next */
  this.getConfig = function (config, configParams) {
    const isFirstRequest = typeof configParams == "undefined";
    let codelistsList;
    config
      .newInfo()
      .setId("info1")
      .setText("Seleccione los datos que desea obtener");
  
    config
      .newSelectSingle()
      .setId("clasificatorType")
      .setName("Seleccione un tipo")
      .setIsDynamic(true)
      .addOption(
        config
          .newOptionBuilder()
          .setLabel("URL de la clasificación")
          .setValue("inputUrlSelector")
      )
      .addOption(
        config
          .newOptionBuilder()
          .setLabel("Seleccionar variable")
          .setValue("variableSelector")
      );
  
    if (
      !isFirstRequest &&
      configParams.clasificatorType === "variableSelector"
    ) {
      let familiesOfVariables = config
          .newSelectSingle()
          .setId("variableFamily")
          .setName("Familias de variables")
          .setIsDynamic(true)
          .setAllowOverride(false);
  
        let familiesOfVariablesList = this.getFamilyOfVariables();
        for(let variableFamily of familiesOfVariablesList) {
          const code = variableFamily.id;
          const title = variableFamily.name.text[0].value;
          familiesOfVariables.addOption(
            config
              .newOptionBuilder()
              .setLabel(title)
              .setValue(code)
          );
        }
  
        if (!isFirstRequest && configParams.variableFamily) {
          let variables = config
            .newSelectSingle()
            .setId("variable")
            .setName("Variables")
            .setIsDynamic(true)
            .setAllowOverride(false);
  
          let variablesList = this.getVariables(
            configParams.variableFamily
          );
  
          if (variablesList.length != 0) {
            for(let variable of variablesList) {
              const code = variable.urn;
              const title = variable.name.text[0].value;
              variables.addOption(
                config
                  .newOptionBuilder()
                  .setLabel(title)
                  .setValue(code)
              );
            }
          } else {
            variables.addOption(
              config
                .newOptionBuilder()
                .setLabel(
                  "No hay Variables para esta familia. Selecciona otra"
                )
                .setValue('undefined')
            );
          }
          
          if (
            !isFirstRequest &&
            configParams.variableFamily &&
            configParams.variable
          ) {
            let codelists = config
              .newSelectSingle()
              .setId("codelist")
              .setName("Clasificaciones")
              .setIsDynamic(true)
              .setAllowOverride(false);
  
            codelistsList = this.getCodelist(configParams.variable);
            if (codelistsList.length != 0) {
              for(let codelist of codelistsList) {
                const code = codelist.selfLink.href;
                const urn = codelist.urn;
                // var idAndVersion = urn.substring(urn.lastIndexOf(":")+1);
                const idAndVersion = urn.substring(urn.lastIndexOf("=")+1);
                const title = codelist.name.text[0].value + " [" + idAndVersion + "]";
                codelists.addOption(
                  config
                    .newOptionBuilder()
                    .setLabel(title)
                    .setValue(code)
                );
              }
            } else {
              codelists.addOption(
                config
                  .newOptionBuilder()
                  .setLabel("No hay clasificaciones para esta variable. Selecciona otra")
              );
            }
          }
        }
        if (!isFirstRequest && configParams.codelist && codelistsList.length > 1) {
          config
            .newInfo()
            .setId("info2")
            .setText("Formato de respuesta:");
  
          config
            .newSelectSingle()
            .setId("decode")
            .setName("¿Desear realizar alguna recodificación?")
            .setIsDynamic(true)
            .addOption(
              config
                .newOptionBuilder()
                .setLabel("Sí, deseo realizar una recodificación")
                .setValue(true)
            )
            .addOption(
              config
                .newOptionBuilder()
                .setLabel("No, no deseo realizar una recodificación")
                .setValue(false)
            );
  
          if (!isFirstRequest && configParams.decode === "true") {
            const decodeCode = config
              .newSelectSingle()
              .setId("decodeCode")
              .setName("Clasificación a recodificar")
              .setIsDynamic(true)
              .setAllowOverride(false);
  
            let decodeCodeList = [];
            if (configParams.variable) {
              decodeCodeList = this.getDecodeCodelist(
                configParams.variable,
                configParams.codelist
              );
            }
  
            if (decodeCodeList.length != 0) {
              for(let codelist of decodeCodeList) {
                const code = codelist.selfLink.href;
                const urn = codelist.urn;
                const idAndVersion = urn.substring(urn.lastIndexOf(":") + 1);
                const title = codelist.name.text[0].value + " [" + idAndVersion + "]";
                decodeCode.addOption(
                  config
                    .newOptionBuilder()
                    .setLabel(title)
                    .setValue(code)
                );
              }
            } else {
              decodeCode.addOption(
                config
                  .newOptionBuilder()
                  .setLabel(
                    "No hay ninguna clasificación de destino a la que poder recodificar"
                  )
                  .setValue(false)
              );
            }
          }
          config
            .newCheckbox()
            .setId("allLanguages")
            .setName("Añadir todos los idiomas");
        } else if (!isFirstRequest && configParams.codelist && codelistsList.length <= 1) {
          config
            .newInfo()
            .setId("info2")
            .setText("Formato de respuesta:");
          config
            .newInfo()
            .setId("info3")
            .setText("No hay recodificación disponible para esta variable");
          config
            .newCheckbox()
            .setId("allLanguages")
            .setName("Añadir todos los idiomas");
  
          configParams.decode = false;
        }
      }
  
      if (
        !isFirstRequest &&
        configParams.clasificatorType === "inputUrlSelector"
      ) {
        config
          .newTextInput()
          .setId("inputUrl")
          .setName("URL")
          .setHelpText("Esta URL debe ser una petición de la API. Por ejemplo: https://datos.canarias.es/api/estadisticas/api/structural-resources/v1.0/codelists/ISTAC/CL_CNAE_2009_GRUPOS_VENTA/01.000")
          .setPlaceholder("Introducir url de la petición");
  
        config
          .newInfo()
          .setId("info2")
          .setText("Formato de respuesta:");
  
        config
          .newCheckbox()
          .setId("allLanguages")
          .setName("Añadir todos los idiomas");
      }
  
      config.setDateRangeRequired(true);
  
      return config;
  }
  
  
  this.getFamilyOfVariables = function() {
    return getProcessAndCacheData("familyOfVariables", getEndpoint(ENDPOINT_KEY, END_OF_ENDPOINT));
  }
  
  this.getVariables = function(familyOfVariable) {
    return getProcessAndCacheData("variables", getEndpoint(ENDPOINT_KEY, END_OF_VARIABLES_ENDPOINT).replace("FAMILY_OF_VARIABLE", familyOfVariable));
  }
  
  this.getCodelist = function(variable) {
    return getProcessAndCacheData("variables", getEndpoint(ENDPOINT_KEY, END_OF_CODELIST_ENDPOINT).replace("URN_OF_VARIABLE", variable));
  }
}

/* global exports */
/* istanbul ignore next */
if (typeof exports !== "undefined") {
  exports["__esModule"] = true;
  exports["default"] = ConfigHelper;
}

