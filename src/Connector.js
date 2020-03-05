if (typeof require !== "undefined") {
  var ConfigHelper = require("./ConfigHelper.js")["default"];
  var DataHelper = require("./DataHelper.js")["default"];
  var SchemaHelper = require("./SchemaHelper.js")["default"];
}

function Connector(services) {
  const configHelper = new ConfigHelper(services);
  const dataHelper = new DataHelper(services);
  const schemaHelper = new SchemaHelper(services);

  /* istanbul ignore next */
  /**
   * Builds the Community Connector fields object.
   * @return {Fields} The Community Connector fields.
   * @see https://developers.google.com/apps-script/reference/data-studio/fields
   */
  this.getFields = function (request) {
        const cc = DataStudioApp.createCommunityConnector();
        const fields = cc.getFields();
        const types = cc.FieldType;
        const columns = schemaHelper.getColumns(request.configParams);
  
        
        for(let column of columns) {
            fields
              .newDimension()
              .setId(column.id)
              .setType(types.TEXT);
        }
  
        return fields;
  }
  
  /* istanbul ignore next */
  /**
   * Builds the Community Connector schema.
   * @param {object} request The request.
   * @return {object} The schema.
   */
  this.getSchema = function (request) {
        const fields = this.getFields(request).build();
        return { schema: fields };
  }
  
  /* istanbul ignore next */
  /**
   * Builds the Community Connector config.
   * @return {Config} The Community Connector config.
   * @see https://developers.google.com/apps-script/reference/data-studio/config
   */
  this.getConfig = function (request) {
      const cc = DataStudioApp.createCommunityConnector();
      const configParams = request.configParams;
      const isFirstRequest = typeof configParams == "undefined";
      let config = cc.getConfig();
      if (isFirstRequest) {
        config.setIsSteppedConfig(true);
      } else if (!isFirstRequest && this.checkIfEndConfiguration(configParams)) {
        config.setIsSteppedConfig(true);
      }
  
      config = configHelper.getConfig(config, configParams);
  
  
      return config.build();
  }
  
  
  this.checkIfEndConfiguration = function(configParams) {
      let result = false;
      if (configParams.clasificatorType == "inputUrlSelector") {
        result =  false;
      } else if (configParams.clasificatorType == "variableSelector" &&
               (!configParams.codelist || configParams.codelist == 'undefined' || typeof configParams.codelist == 'undefined' ||
                  (configParams.codelist && 
                    configParams.decode === "true" &&
                    !configParams.decodeCode))
        ){
          result = true;
      } 
      return result;
  }
  
  
  /**
   * Gets the Auth type.
   * @return {object} The auth type.
   */
  this.getAuthType = function () {
      const response = { type: "NONE" };
      return response;
  }
  
  /* istanbul ignore next */
  /**
   * Gets the data for the community connector
   * @param {object} request The request.
   * @return {object} The data.
   */
  this.getData = function (request) {
      const requestedFieldIds = request.fields.map(field => field.name);
      const requestedFields = this.getFields(request).forIds(requestedFieldIds);
      const rows = dataHelper.getRows(request.configParams, requestedFields);
      return {
        schema: requestedFields.build(),
        rows: rows
      };
  }
  
  this.isAdminUser = function () {
      return true;
  }
}

/* global exports */

if (typeof exports !== "undefined") {
    exports["__esModule"] = true;
    exports["default"] = Connector;
}
