/* eslint-disable quotes */



const familyVariablesResponse = {
  variableFamily: [
    {
      id: "VRF_ADMINISTRACIONES_PUBLICAS",
      urn:
        "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableFamily=VRF_ADMINISTRACIONES_PUBLICAS",
      selfLink: {
        kind: "structuralResources#variableFamily",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variablefamilies/VRF_ADMINISTRACIONES_PUBLICAS"
      },
      name: {
        text: [
          {
            value: "Familia de Variables Administraciones Públicas",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#variableFamily"
    },
    {
      id: "VRF_CARACTERISTICAS_OBS",
      urn:
        "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableFamily=VRF_CARACTERISTICAS_OBS",
      selfLink: {
        kind: "structuralResources#variableFamily",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variablefamilies/VRF_CARACTERISTICAS_OBS"
      },
      name: {
        text: [
          {
            value:
              "Familia de Variables de Características de las Observaciones",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#variableFamily"
    },
    {
      id: "VRF_TRANSVERSALES",
      urn:
        "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableFamily=VRF_TRANSVERSALES",
      selfLink: {
        kind: "structuralResources#variableFamily",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variablefamilies/VRF_TRANSVERSALES"
      },
      name: {
        text: [
          {
            value: "Familia de Variables Transversales",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#variableFamily"
    }
  ],
  kind: "structuralResources#variableFamilies",
  total: 16,
  limit: 1000,
  offset: 0,
  selfLink:
    "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variablefamilies?orderBy=ID ASC&limit=1000&offset=0"
};


const variablesResponse = {
  variable: [
    {
      id: "VR_EDAD",
      urn:
        "urn:siemac:org.siemac.metamac.infomodel.structuralresources.Variable=VR_EDAD",
      selfLink: {
        kind: "structuralResources#variable",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variables/VR_EDAD"
      },
      name: {
        text: [
          {
            value: "Variable Edad",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#variable"
    },
    {
      id: "VR_ESTADO_CIVIL",
      urn:
        "urn:siemac:org.siemac.metamac.infomodel.structuralresources.Variable=VR_ESTADO_CIVIL",
      selfLink: {
        kind: "structuralResources#variable",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variables/VR_ESTADO_CIVIL"
      },
      name: {
        text: [
          {
            value: "Variable Estado civil",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#variable"
    },
    {
      id: "VR_SEXO",
      urn:
        "urn:siemac:org.siemac.metamac.infomodel.structuralresources.Variable=VR_SEXO",
      selfLink: {
        kind: "structuralResources#variable",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variables/VR_SEXO"
      },
      name: {
        text: [
          {
            value: "Variable Sexo",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#variable"
    }
  ],
  kind: "structuralResources#variables",
  total: 3,
  limit: 1000,
  offset: 0,
  selfLink:
    "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variablefamilies/VRF_DEMOGRAFICAS/variables?orderBy=ID ASC&limit=1000&offset=0"
};

const codelistResponse = {
  codelist: [
    {
      id: "CL_AGE",
      urn: "urn:sdmx:org.sdmx.infomodel.codelist.Codelist=ESTAT:CL_AGE(2.0)",
      selfLink: {
        kind: "structuralResources#codelist",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_AGE/2.0"
      },
      name: {
        text: [
          {
            value: "Clasificación de edad",
            lang: "es"
          },
          {
            value: "Age",
            lang: "en"
          }
        ]
      },
      kind: "structuralResources#codelist"
    },
    {
      id: "CL_AGE",
      urn: "urn:sdmx:org.sdmx.infomodel.codelist.Codelist=ISTAC:CL_AGE(01.000)",
      selfLink: {
        kind: "structuralResources#codelist",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ISTAC/CL_AGE/01.000"
      },
      name: {
        text: [
          {
            value: "Clasificación de edad (ISTAC)",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#codelist"
    },
    {
      id: "CL_AGE",
      urn: "urn:sdmx:org.sdmx.infomodel.codelist.Codelist=SDMX:CL_AGE(1.0)",
      selfLink: {
        kind: "structuralResources#codelist",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/SDMX/CL_AGE/1.0"
      },
      name: {
        text: [
          {
            value: "Clasificación de Edad",
            lang: "es"
          },
          {
            value: "Age",
            lang: "en"
          }
        ]
      },
      kind: "structuralResources#codelist"
    }
  ],
  kind: "structuralResources#codelists",
  total: 3,
  limit: 1000,
  offset: 0,
  selfLink:
    'https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists?query=VARIABLE_URN EQ "urn:siemac:org.siemac.metamac.infomodel.structuralresources.Variable&VR_EDAD"&orderBy=ID ASC&limit=1000&offset=0'
};

const specificCodelist = {
  code: [
    {
      variableElement: {
        id: "T_",
        urn:
          "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableElement=VR_SEXO.T_",
        selfLink: {
          kind: "structuralResources#variableElement",
          href:
            "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variables/VR_SEXO/variableelements/T_"
        },
        name: {
          text: [
            {
              value: "Total",
              lang: "es"
            }
          ]
        },
        kind: "structuralResources#variableElement"
      },
      id: "_T",
      urn: "urn:sdmx:org.sdmx.infomodel.codelist.Code=ESTAT:CL_SEX(1.1)._T",
      selfLink: {
        kind: "structuralResources#code",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1/codes/_T"
      },
      name: {
        text: [
          {
            value: "Total",
            lang: "en"
          },
          {
            value: "Ambos sexos",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#code"
    },
    {
      variableElement: {
        id: "U_",
        urn:
          "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableElement=VR_SEXO.U_",
        selfLink: {
          kind: "structuralResources#variableElement",
          href:
            "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variables/VR_SEXO/variableelements/U_"
        },
        name: {
          text: [
            {
              value: "Dato desconocido",
              lang: "es"
            }
          ]
        },
        kind: "structuralResources#variableElement"
      },
      id: "_U",
      urn: "urn:sdmx:org.sdmx.infomodel.codelist.Code=ESTAT:CL_SEX(1.1)._U",
      selfLink: {
        kind: "structuralResources#code",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1/codes/_U"
      },
      name: {
        text: [
          {
            value: "Unknown",
            lang: "en"
          },
          {
            value: "Desconocido",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#code"
    },
    {
      variableElement: {
        id: "X_",
        urn:
          "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableElement=VR_SEXO.X_",
        selfLink: {
          kind: "structuralResources#variableElement",
          href:
            "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variables/VR_SEXO/variableelements/X_"
        },
        name: {
          text: [
            {
              value: "Dato no asignado/no especificado",
              lang: "es"
            }
          ]
        },
        kind: "structuralResources#variableElement"
      },
      id: "_X",
      urn: "urn:sdmx:org.sdmx.infomodel.codelist.Code=ESTAT:CL_SEX(1.1)._X",
      selfLink: {
        kind: "structuralResources#code",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1/codes/_X"
      },
      name: {
        text: [
          {
            value: "Unspecified",
            lang: "en"
          },
          {
            value: "Sin especificar",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#code"
    },
    {
      variableElement: {
        id: "Z_",
        urn:
          "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableElement=VR_SEXO.Z_",
        selfLink: {
          kind: "structuralResources#variableElement",
          href:
            "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variables/VR_SEXO/variableelements/Z_"
        },
        name: {
          text: [
            {
              value: "No aplicable",
              lang: "es"
            }
          ]
        },
        kind: "structuralResources#variableElement"
      },
      id: "_Z",
      urn: "urn:sdmx:org.sdmx.infomodel.codelist.Code=ESTAT:CL_SEX(1.1)._Z",
      selfLink: {
        kind: "structuralResources#code",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1/codes/_Z"
      },
      name: {
        text: [
          {
            value: "Not applicable",
            lang: "en"
          },
          {
            value: "No aplicable",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#code"
    },
    {
      variableElement: {
        id: "FEMALE",
        urn:
          "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableElement=VR_SEXO.FEMALE",
        selfLink: {
          kind: "structuralResources#variableElement",
          href:
            "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variables/VR_SEXO/variableelements/FEMALE"
        },
        name: {
          text: [
            {
              value: "Mujer",
              lang: "es"
            }
          ]
        },
        kind: "structuralResources#variableElement"
      },
      id: "F",
      urn: "urn:sdmx:org.sdmx.infomodel.codelist.Code=ESTAT:CL_SEX(1.1).F",
      selfLink: {
        kind: "structuralResources#code",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1/codes/F"
      },
      name: {
        text: [
          {
            value: "Female",
            lang: "en"
          },
          {
            value: "Mujeres",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#code"
    },
    {
      variableElement: {
        id: "MALE",
        urn:
          "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableElement=VR_SEXO.MALE",
        selfLink: {
          kind: "structuralResources#variableElement",
          href:
            "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variables/VR_SEXO/variableelements/MALE"
        },
        name: {
          text: [
            {
              value: "Hombre",
              lang: "es"
            }
          ]
        },
        kind: "structuralResources#variableElement"
      },
      id: "M",
      urn: "urn:sdmx:org.sdmx.infomodel.codelist.Code=ESTAT:CL_SEX(1.1).M",
      selfLink: {
        kind: "structuralResources#code",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1/codes/M"
      },
      name: {
        text: [
          {
            value: "Male",
            lang: "en"
          },
          {
            value: "Hombres",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#code"
    }
  ],
  kind: "structuralResources#codes",
  total: 6,
  selfLink:
    "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1/codes"
};

const specificCodelist2 = {
  code: [
    {
      variableElement: {
        id: "U_",
        urn:
          "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableElement=VR_SEXO.U_",
        selfLink: {
          kind: "structuralResources#variableElement",
          href:
            "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variables/VR_SEXO/variableelements/U_"
        },
        name: {
          text: [
            {
              value: "Dato desconocido",
              lang: "es"
            }
          ]
        },
        kind: "structuralResources#variableElement"
      },
      id: "0",
      urn:
        "urn:sdmx:org.sdmx.infomodel.codelist.Code=ISTAC:CL_SEX_ISO_5218(01.000).0",
      selfLink: {
        kind: "structuralResources#code",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ISTAC/CL_SEX_ISO_5218/01.000/codes/0"
      },
      name: {
        text: [
          {
            value: "Not known",
            lang: "en"
          },
          {
            value: "Desconocido",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#code"
    },
    {
      variableElement: {
        id: "MALE",
        urn:
          "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableElement=VR_SEXO.MALE",
        selfLink: {
          kind: "structuralResources#variableElement",
          href:
            "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variables/VR_SEXO/variableelements/MALE"
        },
        name: {
          text: [
            {
              value: "Hombre",
              lang: "es"
            }
          ]
        },
        kind: "structuralResources#variableElement"
      },
      id: "1",
      urn:
        "urn:sdmx:org.sdmx.infomodel.codelist.Code=ISTAC:CL_SEX_ISO_5218(01.000).1",
      selfLink: {
        kind: "structuralResources#code",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ISTAC/CL_SEX_ISO_5218/01.000/codes/1"
      },
      name: {
        text: [
          {
            value: "Male",
            lang: "en"
          },
          {
            value: "Hombre",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#code"
    },
    {
      variableElement: {
        id: "FEMALE",
        urn:
          "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableElement=VR_SEXO.FEMALE",
        selfLink: {
          kind: "structuralResources#variableElement",
          href:
            "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variables/VR_SEXO/variableelements/FEMALE"
        },
        name: {
          text: [
            {
              value: "Mujer",
              lang: "es"
            }
          ]
        },
        kind: "structuralResources#variableElement"
      },
      id: "2",
      urn:
        "urn:sdmx:org.sdmx.infomodel.codelist.Code=ISTAC:CL_SEX_ISO_5218(01.000).2",
      selfLink: {
        kind: "structuralResources#code",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ISTAC/CL_SEX_ISO_5218/01.000/codes/2"
      },
      name: {
        text: [
          {
            value: "Female",
            lang: "en"
          },
          {
            value: "Mujer",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#code"
    },
    {
      variableElement: {
        id: "Z_",
        urn:
          "urn:siemac:org.siemac.metamac.infomodel.structuralresources.VariableElement=VR_SEXO.Z_",
        selfLink: {
          kind: "structuralResources#variableElement",
          href:
            "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variables/VR_SEXO/variableelements/Z_"
        },
        name: {
          text: [
            {
              value: "No aplicable",
              lang: "es"
            }
          ]
        },
        kind: "structuralResources#variableElement"
      },
      id: "9",
      urn:
        "urn:sdmx:org.sdmx.infomodel.codelist.Code=ISTAC:CL_SEX_ISO_5218(01.000).9",
      selfLink: {
        kind: "structuralResources#code",
        href:
          "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ISTAC/CL_SEX_ISO_5218/01.000/codes/9"
      },
      name: {
        text: [
          {
            value: "Not applicable",
            lang: "en"
          },
          {
            value: "No aplicable",
            lang: "es"
          }
        ]
      },
      kind: "structuralResources#code"
    }
  ],
  kind: "structuralResources#codes",
  total: 4,
  selfLink:
    "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ISTAC/CL_SEX_ISO_5218/01.000/codes"
};

const metadataResponse = {
  property: [
    {
      key: "metamac.srm.rest.external",
      value:
        "https://datos.canarias.es/api/estadisticas/structural-resources",
      kind: "commonMetadata#property"
    }
  ]
};

const responses = {
  "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variablefamilies.json?limit=1000&orderBy=ID%20ASC%20": familyVariablesResponse,
  "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/variablefamilies/VRF_DEMOGRAFICAS/variables.json?limit=1000&orderBy=ID%20ASC": variablesResponse,
  "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists.json?limit=1000&orderBy=ID%20ASC&query=VARIABLE_URN%20EQ%20%22urn:siemac:org.siemac.metamac.infomodel.structuralresources.Variable=VR_EDAD%22": codelistResponse,
  "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ESTAT/CL_SEX/1.1/codes.json?fields=+variableElement": specificCodelist,
  "https://datos.canarias.es/api/estadisticas/structural-resources/v1.0/codelists/ISTAC/CL_SEX_ISO_5218/01.000/codes.json?fields=+variableElement": specificCodelist2,
  "https://datos.canarias.es/api/estadisticas/cmetadata/v1.0/properties.json": metadataResponse
};


/* global exports */
/* istanbul ignore next */
if (typeof exports !== "undefined") {
  exports["__esModule"] = true;
  exports["default"] = responses;
}

;