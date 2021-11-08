if (typeof require !== "undefined") {
  var DataHelper = require("../src/DataHelper.js")["default"];
  var CacheHelper = require("../src/CacheHelper.js")["default"];
  var CacheServiceMock = require("./mocks/CacheServiceMock.js")["default"];
  var UrlFetchAppMock = require("./mocks/UrlFetchAppMock.js")["default"];
  var apiResponses = require("./helpers/ApiResponses.js")["default"];
  var Utils = require("../src/Utils.js")["default"];
  var UtilitiesMock = require("./mocks/UtilitiesMock.js")["default"];
}

let dataHelper;

beforeEach(() => {
  const urlFetchApp = new UrlFetchAppMock(apiResponses);
  const utils = new Utils();
  dataHelper = new DataHelper({
    UrlFetchApp: urlFetchApp,
    Utils: utils,
    CacheHelper: new CacheHelper(new CacheServiceMock(), utils, urlFetchApp, new UtilitiesMock())
  });
});

var Field = function (id) {
  this.id = id;

  this.getId = function () {
    return this.id;
  }
};

var RequestedFields = function () {
  this.requestedFields = [];

  this.addField = function (field) {
    this.requestedFields.push(field);
  }

  this.asArray = function () {
    return this.requestedFields;
  }
};

test("_processData: without languages nor decode", () => {
    var configParams = {
    clasificatorType: "variableSelector",
    codelist:
      "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1"
    };

  var expectedResult = [{ "values": ["_T", "", "Ambos sexos"] }, { "values": ["_U", "", "Desconocido"] }, { "values": ["_X", "", "Sin especificar"] }, { "values": ["_Z", "", "No aplicable"] }, { "values": ["F", "", "Mujeres"] }, { "values": ["M", "", "Hombres"] }];

    requestedFields = new RequestedFields();
    requestedFields.addField(new Field('Codigo_origen'))
    requestedFields.addField(new Field('Padre_origen'))
    requestedFields.addField(new Field('Nombre_origen'))

    expect(dataHelper._processData(configParams, requestedFields)).toEqual(expectedResult);

});

test("_processData: without decode", () => {
  var configParams = {
    clasificatorType: "variableSelector",
    codelist:
      "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1",
    allLanguages: "true"
  };
  var expectedResult = [{ "values": ["_T", "", "Total", "Ambos sexos"] }, { "values": ["_U", "", "Unknown", "Desconocido"] }, { "values": ["_X", "", "Unspecified", "Sin especificar"] }, { "values": ["_Z", "", "Not applicable", "No aplicable"] }, { "values": ["F", "", "Female", "Mujeres"] }, { "values": ["M", "", "Male", "Hombres"] }];

    requestedFields = new RequestedFields();
    requestedFields.addField(new Field('Codigo_origen'))
    requestedFields.addField(new Field('Padre_origen'))
    requestedFields.addField(new Field('Nombre_origen_en'))
    requestedFields.addField(new Field('Nombre_origen_es'))

  expect(dataHelper._processData(configParams, requestedFields)).toEqual(expectedResult);
});



test("_processData: with everything", () => {
  var configParams = {
    clasificatorType: "variableSelector",
    codelist:
      "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1",
    allLanguages: "true",
    decode: "true",
    decodeCode:
      "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ISTAC/CL_SEX_ISO_5218/01.000"
  };
  var expectedResult = [{ "values": ["0", "", "Not known", "Desconocido", "_U", "", "Unknown", "Desconocido"] }, { "values": ["9", "", "Not applicable", "No aplicable", "_Z", "", "Not applicable", "No aplicable"] }, { "values": ["2", "", "Female", "Mujer", "F", "", "Female", "Mujeres"] }, { "values": ["1", "", "Male", "Hombre", "M", "", "Male", "Hombres"] }];

  requestedFields = new RequestedFields();
  requestedFields.addField(new Field('Codigo_recodificado'))
  requestedFields.addField(new Field('Padre_recodificado'))
  requestedFields.addField(new Field('Nombre_recodificado_en'))
  requestedFields.addField(new Field('Nombre_recodificado_es'))
  requestedFields.addField(new Field('Codigo_origen'))
  requestedFields.addField(new Field('Padre_origen'))
  requestedFields.addField(new Field('Nombre_origen_en'))
  requestedFields.addField(new Field('Nombre_origen_es'))
  

  expect(dataHelper._processData(configParams, requestedFields)).toEqual(expectedResult);
});


test("_processData: without allLanguages", () => {
  var configParams = {
    clasificatorType: "variableSelector",
    codelist:
      "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1",
    decode: "true",
    decodeCode:
      "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ISTAC/CL_SEX_ISO_5218/01.000"
  };
  var expectedResult = [{ "values": ["0", "", "Desconocido", "_U", "", "Desconocido"] }, { "values": ["9", "", "No aplicable", "_Z", "", "No aplicable"] }, { "values": ["2", "", "Mujer", "F", "", "Mujeres"] }, { "values": ["1", "", "Hombre", "M", "", "Hombres"] }];

  requestedFields = new RequestedFields();
  requestedFields.addField(new Field('Codigo_recodificado'))
  requestedFields.addField(new Field('Padre_recodificado'))
  requestedFields.addField(new Field('Nombre_recodificado'))
  requestedFields.addField(new Field('Codigo_origen'))
  requestedFields.addField(new Field('Padre_origen'))
  requestedFields.addField(new Field('Nombre_origen'))

  expect(dataHelper._processData(configParams, requestedFields)).toEqual(expectedResult);
});
