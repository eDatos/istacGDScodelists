function Utils() {

  this.getUrl = function(configParams) {
    const switchUrl = {
      variableSelector: configParams.codelist,
      inputUrlSelector: configParams.inputUrl
    };
  
    return switchUrl[configParams.clasificatorType] + "/codes.json?fields=+variableElement"
  }

  this.getLanguages = function(response) {
    let languages = [];
    for (let language of response.code[0].name.text) {
      languages.push(language.lang);
    }
    return languages;
  }

  /*
  * Function that make an object from an array of objects using one of the attrs as the key
  */
  this.keyBy = function(object, property) {
    const newObject = {};
    for (let rowItem of Object.values(object)) {
      newObject[rowItem[property]] = rowItem;
    }
    return newObject;
  }

  this.throwConectorError = function(exception, message) {
     DataStudioApp.createCommunityConnector()
       .newUserError()
       .setDebugText("Error while fetching data from API. Exception details: " + exception)
       .setText(message)
       .throwException();
  }

 
}


/* global exports */
/* istanbul ignore next */
if (typeof exports !== "undefined") {
  exports["__esModule"] = true;
  exports["default"] = Utils;
}