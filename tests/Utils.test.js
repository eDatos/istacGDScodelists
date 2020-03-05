if (typeof require !== "undefined") {
  var Utils = require("../src/Utils.js")["default"];
}

let utils;

beforeEach(() => {
  utils = new Utils();
});


test("getUrl - get the url for a configParams with variable", () => {
  var configParamsWithVariable = {
    clasificatorType: "variableSelector",
    codelist: "http://mockurl.com"
  };
 
  expect(utils.getUrl(configParamsWithVariable)).toBe(
    "http://mockurl.com/codes.json?fields=+variableElement"
  );
});

test("getUrl - get the url for a configParams with URL", () => {
  var configParamsWithVariable = {
    clasificatorType: "inputUrlSelector",
    inputUrl: "http://mockurl.com"
  };

  expect(utils.getUrl(configParamsWithVariable)).toBe(
    "http://mockurl.com/codes.json?fields=+variableElement"
  );
});


test("getLanguages - get the languages returned from the server response", () => {
  var exampleResponse = {
    "code": [
        {
            "id": "_T",
            "urn": "urn:sdmx:org.sdmx.infomodel.codelist.Code=ESTAT:CL_AGE(2.0)._T",
            "selfLink": {
                "kind": "structuralResources#code",
                "href": "https://www3.gobiernodecanarias.org/istac/api/structural-resources/v1.0/codelists/ESTAT/CL_AGE/2.0/codes/_T"
            },
            "name": {
                "text": [
                    {
                        "value": "Total",
                        "lang": "en"
                    },
                    {
                        "value": "Total",
                        "lang": "es"
                    }
                ]
            },
            "kind": "structuralResources#code"
        },
        {
            "id": "LFD",
            "urn": "urn:sdmx:org.sdmx.infomodel.codelist.Code=ESTAT:CL_AGE(2.0).LFD",
            "selfLink": {
                "kind": "structuralResources#code",
                "href": "https://www3.gobiernodecanarias.org/istac/api/structural-resources/v1.0/codelists/ESTAT/CL_AGE/2.0/codes/LFD"
            },
            "name": {
                "text": [
                    {
                        "value": "Late foetal death",
                        "lang": "en"
                    },
                    {
                        "value": "Muerte fetal tardía",
                        "lang": "es"
                    }
                ]
            },
            "kind": "structuralResources#code"
        }
    ]
  };

  expect(utils.getLanguages(exampleResponse)).toEqual(["en", "es"]);


});

