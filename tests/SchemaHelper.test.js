if (typeof require !== "undefined") {
  var SchemaHelper = require("../src/SchemaHelper.js")["default"];
  var CacheHelper = require("../src/CacheHelper.js")["default"];
  var CacheServiceMock = require("./mocks/CacheServiceMock.js")["default"];
  var UrlFetchAppMock = require("./mocks/UrlFetchAppMock.js")["default"];
  var apiResponses = require("./helpers/ApiResponses.js")["default"];
  var Utils = require("../src/Utils.js")["default"];
  var UtilitiesMock = require("./mocks/UtilitiesMock.js")["default"];
}

let schemaHelper;

beforeEach(() => {
  const urlFetchApp = new UrlFetchAppMock(apiResponses);
  const utils = new Utils();
  schemaHelper = new SchemaHelper({
    UrlFetchApp: urlFetchApp,
    Utils: utils,
    CacheHelper: new CacheHelper(new CacheServiceMock(), utils, urlFetchApp, new UtilitiesMock())
  });

});

test("getColumns: without languages nor decode", () => {
  var configParams = {
    clasificatorType: "variableSelector",
    codelist:
      "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1"
  };
  var expectedResult = [
    { columnRole: "dimension", dataType: "string", id: "Codigo_origen" },
    { columnRole: "dimension", dataType: "string", id: "Padre_origen" },
    { columnRole: "dimension", dataType: "string", id: "Nombre_origen" }
  ];


  expect(schemaHelper.getColumns(configParams)).toEqual(expectedResult);
  
});

test("getColumns: without decode", () => {
  var configParams = {
    clasificatorType: "variableSelector",
    codelist:
      "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1",
    allLanguages: "true"
  };
  var expectedResult = [
    { columnRole: "dimension", dataType: "string", id: "Codigo_origen" },
    { columnRole: "dimension", dataType: "string", id: "Padre_origen" },
    { columnRole: "dimension", dataType: "string", id: "Nombre_origen_en" },
    { columnRole: "dimension", dataType: "string", id: "Nombre_origen_es" }
  ];

  expect(schemaHelper.getColumns(configParams)).toEqual(expectedResult);

});

test("getColumns: with everything", () => {
  var configParams = {
    clasificatorType: "variableSelector",
    codelist:
      "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1",
    allLanguages: "true",
    decode: "true",
    decodeCode: "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ISTAC/CL_SEX_ISO_5218/01.000"
  };
  var expectedResult = [
    { columnRole: "dimension", dataType: "string", id: "Codigo_recodificado" },
    { columnRole: "dimension", dataType: "string", id: "Padre_recodificado" },
    {
      columnRole: "dimension",
      dataType: "string",
      id: "Nombre_recodificado_en"
    },
    {
      columnRole: "dimension",
      dataType: "string",
      id: "Nombre_recodificado_es"
    },
    { columnRole: "dimension", dataType: "string", id: "Codigo_origen" },
    { columnRole: "dimension", dataType: "string", id: "Padre_origen" },
    { columnRole: "dimension", dataType: "string", id: "Nombre_origen_en" },
    { columnRole: "dimension", dataType: "string", id: "Nombre_origen_es" }
  ];

  expect(schemaHelper.getColumns(configParams)).toEqual(expectedResult);
});

test("getColumns: without allLanguages", () => {
  var configParams = {
    clasificatorType: "variableSelector",
    codelist:
      "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1",
    decode: "true",
    decodeCode:
      "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ISTAC/CL_SEX_ISO_5218/01.000"
  };
  var expectedResult = [
    { columnRole: "dimension", dataType: "string", id: "Codigo_recodificado" },
    { columnRole: "dimension", dataType: "string", id: "Padre_recodificado" },
    { columnRole: "dimension", dataType: "string", id: "Nombre_recodificado" },
    { columnRole: "dimension", dataType: "string", id: "Codigo_origen" },
    { columnRole: "dimension", dataType: "string", id: "Padre_origen" },
    { columnRole: "dimension", dataType: "string", id: "Nombre_origen" }
  ];

  expect(schemaHelper.getColumns(configParams)).toEqual(expectedResult);
});