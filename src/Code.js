/* istanbul ignore file */
/* global CacheService, UrlFetchApp */
if (typeof require !== "undefined") {
  const Connector = require("./Connector.js")["default"];
  const CacheHelper = require("./CacheHelper.js")["default"];
  const Utils = require("./Utils.js")["default"];
}

/* global CacheService, UrlFetchApp, Utilities */
function getConnector() {
  const utils = new Utils();
  const urlFetchApp = UrlFetchApp;
  return new Connector({
    Utils: utils,
    CacheService: CacheService,
    UrlFetchApp: urlFetchApp,
    CacheHelper: new CacheHelper(CacheService, utils, urlFetchApp, Utilities)
  });
}

function getConfig(request) {
  return getConnector().getConfig(request);
}

function getSchema(request) {
  return getConnector().getSchema(request);
}

function getData(request) {
  return getConnector().getData(request);
}

function getAuthType() {
  return getConnector().getAuthType();
}

function isAdminUser() {
  return getConnector().isAdminUser();
}
