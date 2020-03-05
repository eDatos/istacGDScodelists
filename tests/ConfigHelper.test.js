if (typeof require !== "undefined") {
  var ConfigHelper = require("../src/ConfigHelper.js")["default"];
  var CacheHelper = require("../src/CacheHelper.js")["default"];
  var CacheServiceMock = require("./mocks/CacheServiceMock.js")["default"];
  var UrlFetchAppMock = require("./mocks/UrlFetchAppMock.js")["default"];
  var apiResponses = require("./helpers/ApiResponses.js")["default"];
  var Utils = require("../src/Utils.js")["default"];
  var UtilitiesMock = require("./mocks/UtilitiesMock.js")["default"];
}

let configHelper;

beforeEach(() => {
  const urlFetchApp = new UrlFetchAppMock(apiResponses);
  const utils = new Utils();
  configHelper = new ConfigHelper({
    UrlFetchApp: urlFetchApp,
    Utils: utils,
    CacheHelper: new CacheHelper(new CacheServiceMock(), utils, urlFetchApp, new UtilitiesMock())
  });
});

test("getFamilyOfVariables", () => {
    var expectedResponse = [
      {
        id: "VRF_ADMINISTRACIONES_PUBLICAS",
        kind: "structuralResources#variableFamily",
        name: {
          text: [
            {
              lang: "es",
              value: "Familia de Variables Administraciones Públicas"
            }
          ]
        },
        selfLink: {
          href:
            "https://www3.gobiernodecanarias.org/istac/api/structural-resources/v1.0/variablefamilies/VRF_ADMINISTRACIONES_PUBLICAS",
          kind: "structuralResources#variableFamily"
        },
        urn:
          "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableFamily=VRF_ADMINISTRACIONES_PUBLICAS"
      },
      {
        id: "VRF_TRANSVERSALES",
        kind: "structuralResources#variableFamily",
        name: {
          text: [{ lang: "es", value: "Familia de Variables Transversales" }]
        },
        selfLink: {
          href:
            "https://www3.gobiernodecanarias.org/istac/api/structural-resources/v1.0/variablefamilies/VRF_TRANSVERSALES",
          kind: "structuralResources#variableFamily"
        },
        urn:
          "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableFamily=VRF_TRANSVERSALES"
      },
      {
        id: "VRF_CARACTERISTICAS_OBS",
        kind: "structuralResources#variableFamily",
        name: {
          text: [
            {
              lang: "es",
              value:
                "Familia de Variables de Características de las Observaciones"
            }
          ]
        },
        selfLink: {
          href:
            "https://www3.gobiernodecanarias.org/istac/api/structural-resources/v1.0/variablefamilies/VRF_CARACTERISTICAS_OBS",
          kind: "structuralResources#variableFamily"
        },
        urn:
          "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableFamily=VRF_CARACTERISTICAS_OBS"
      }
    ];


  expect(configHelper.getFamilyOfVariables()).toEqual(expectedResponse);
});


test("getVariables", () => {
    var expectedVariables = [{"id": "VR_EDAD", "kind": "structuralResources#variable", "name": {"text": [{"lang": "es", "value": "Variable Edad"}]}, "selfLink": {"href": "https://www3.gobiernodecanarias.org/istac/api/structural-resources/v1.0/variables/VR_EDAD", "kind": "structuralResources#variable"}, "urn": "urn:siemac:org.siemac.metamac.infomodel.structuralresources.Variable=VR_EDAD"}, {"id": "VR_ESTADO_CIVIL", "kind": "structuralResources#variable", "name": {"text": [{"lang": "es", "value": "Variable Estado civil"}]}, "selfLink": {"href": "https://www3.gobiernodecanarias.org/istac/api/structural-resources/v1.0/variables/VR_ESTADO_CIVIL", "kind": "structuralResources#variable"}, "urn": "urn:siemac:org.siemac.metamac.infomodel.structuralresources.Variable=VR_ESTADO_CIVIL"}, {"id": "VR_SEXO", "kind": "structuralResources#variable", "name": {"text": [{"lang": "es", "value": "Variable Sexo"}]}, "selfLink": {"href": "https://www3.gobiernodecanarias.org/istac/api/structural-resources/v1.0/variables/VR_SEXO", "kind": "structuralResources#variable"}, "urn": "urn:siemac:org.siemac.metamac.infomodel.structuralresources.Variable=VR_SEXO"}];
    expect(configHelper.getVariables("VRF_DEMOGRAFICAS")).toEqual(expectedVariables);

});

test("getCodelist", () => {
    var urn =
      "urn:siemac:org.siemac.metamac.infomodel.structuralresources.Variable=VR_EDAD";
    var expectedCodelist = [
      {
        id: "CL_AGE",
        kind: "structuralResources#codelist",
        name: {
          text: [
            { lang: "es", value: "Clasificación de Edad" },
            { lang: "en", value: "Age" }
          ]
        },
        selfLink: {
          href:
            "https://www3.gobiernodecanarias.org/istac/api/structural-resources/v1.0/codelists/SDMX/CL_AGE/1.0",
          kind: "structuralResources#codelist"
        },
        urn: "urn:sdmx:org.sdmx.infomodel.codelist.Codelist=SDMX:CL_AGE(1.0)"
      },
      {
        id: "CL_AGE",
        kind: "structuralResources#codelist",
        name: {
          text: [
            { lang: "es", value: "Clasificación de edad" },
            { lang: "en", value: "Age" }
          ]
        },
        selfLink: {
          href:
            "https://www3.gobiernodecanarias.org/istac/api/structural-resources/v1.0/codelists/ESTAT/CL_AGE/2.0",
          kind: "structuralResources#codelist"
        },
        urn: "urn:sdmx:org.sdmx.infomodel.codelist.Codelist=ESTAT:CL_AGE(2.0)"
      },
      {
        id: "CL_AGE",
        kind: "structuralResources#codelist",
        name: {
          text: [{ lang: "es", value: "Clasificación de edad (ISTAC)" }]
        },
        selfLink: {
          href:
            "https://www3.gobiernodecanarias.org/istac/api/structural-resources/v1.0/codelists/ISTAC/CL_AGE/01.000",
          kind: "structuralResources#codelist"
        },
        urn:
          "urn:sdmx:org.sdmx.infomodel.codelist.Codelist=ISTAC:CL_AGE(01.000)"
      }
    ];
    expect(configHelper.getCodelist(urn)).toEqual(expectedCodelist);
});


test("getDecodeCodelist", () => {
  var urn =
    "urn:siemac:org.siemac.metamac.infomodel.structuralresources.Variable=VR_EDAD";
    var codelist =
      "https://www3.gobiernodecanarias.org/istac/api/structural-resources/v1.0/codelists/ESTAT/CL_AGE/2.0";
  var expectedCodelist = [
    {
      id: "CL_AGE",
      kind: "structuralResources#codelist",
      name: {
        text: [
          { lang: "es", value: "Clasificación de Edad" },
          { lang: "en", value: "Age" }
        ]
      },
      selfLink: {
        href:
          "https://www3.gobiernodecanarias.org/istac/api/structural-resources/v1.0/codelists/SDMX/CL_AGE/1.0",
        kind: "structuralResources#codelist"
      },
      urn: "urn:sdmx:org.sdmx.infomodel.codelist.Codelist=SDMX:CL_AGE(1.0)"
    },
    {
      id: "CL_AGE",
      kind: "structuralResources#codelist",
      name: {
        text: [{ lang: "es", value: "Clasificación de edad (ISTAC)" }]
      },
      selfLink: {
        href:
          "https://www3.gobiernodecanarias.org/istac/api/structural-resources/v1.0/codelists/ISTAC/CL_AGE/01.000",
        kind: "structuralResources#codelist"
      },
      urn: "urn:sdmx:org.sdmx.infomodel.codelist.Codelist=ISTAC:CL_AGE(01.000)"
    }
  ];
  expect(configHelper.getDecodeCodelist(urn, codelist)).toEqual(expectedCodelist);
});


