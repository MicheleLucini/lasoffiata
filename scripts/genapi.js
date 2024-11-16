// const uniq = require('lodash/uniq');
// const util = require('util');
const axios = require('axios');
const camelCase = require('lodash/camelCase');
const fs = require('fs');
const groupBy = require('lodash/groupBy');
const last = require('lodash/last');
const reduce = require('lodash/reduce');

const URL_SWAGGER_JSON = 'https://penitentrealms.simply-winspace.it/swagger/v1/swagger.json';
const PATH_DIR_API = './src/api';

function getUrlPartByIndex(str, index) {
  const strArr = str.split('/');
  return strArr[strArr.length - index];
}

function replacePathWithModel(swaggerEndpointObj, swaggerModelSchema, level) {
  if (level === 4) {
    return swaggerEndpointObj;
  }
  const swaggerEndpointObjStringified = JSON.stringify(swaggerEndpointObj);
  const refMatches = swaggerEndpointObjStringified.match(/"\$ref"[^}]+/g);
  if (!refMatches) {
    return swaggerEndpointObj;
  }
  const newSwaggerEndpointObjStringified = reduce(
    refMatches,
    (acc, match) => {
      const serverModelPath = last(match.split('/')).replaceAll('"', '');
      let replacer = '';
      if (serverModelPath.includes('Enums')) {
        const [enumModelName, enumModelRoot] = serverModelPath.split('.').reverse();
        const newEnumModelName = `${enumModelRoot}_${enumModelName}`;
        replacer = JSON.stringify({
          ...swaggerModelSchema[serverModelPath],
          enumModelName: newEnumModelName,
        });
      } else {
        replacer = JSON.stringify(swaggerModelSchema[serverModelPath]);
      }
      return acc.replaceAll(`{${match}}`, replacer);
    },
    swaggerEndpointObjStringified,
  );
  return replacePathWithModel(JSON.parse(newSwaggerEndpointObjStringified), swaggerModelSchema, level + 1);
}

function getFormattedRequestBodyFromSwaggerObj(schemasRequestBody, swaggerEndpointObj) {
  if (swaggerEndpointObj.requestBody) {
    if (swaggerEndpointObj.requestBody.content['multipart/form-data']) {
      return swaggerEndpointObj.requestBody.content['multipart/form-data'].schema;
    }
    if (swaggerEndpointObj.requestBody.content['application/json']) {
      const methodObjCurrent = swaggerEndpointObj.requestBody.content['application/json'].schema;
      return replacePathWithModel(methodObjCurrent, schemasRequestBody, 0);
    }
  }
  return null;
}

function processSwaggerJson(swaggerResult) {
  const result = [];
  const schemasRequestBody = swaggerResult.data.components.schemas;
  Object.entries(swaggerResult.data.paths).forEach(([path, pathObj]) => {
    Object.entries(pathObj).forEach(([requestMethod, swaggerEndpointObj]) => {
      const endpointTag = swaggerEndpointObj.tags[0].substring(2);
      result.push({
        pageName: camelCase(endpointTag),
        requestMethod,
        actionName: getUrlPartByIndex(path, 1),
        url: path,
        // cleanUrl: path.replace(/^\/api\/v\d+/i, ''),
        // parameters: swaggerEndpointObj.parameters,
        requestBody: getFormattedRequestBodyFromSwaggerObj(schemasRequestBody, swaggerEndpointObj),
      });
    });
  });
  return result;
}

function getRowsEndpointProperties(properties, level = 1) {
  if (!properties) return [];
  console.log(properties);
  return Object.entries(properties)
    .flatMap(([propName, propData]) => ([
      `  //${level === 1 ? " " : "   "}${propName} - ${!!propData.enum ? "enum " : ""}${propData.type} ${propData.nullable ? "nullable" : ""}`,
      ...(propData.items ? getRowsEndpointProperties(propData.items.properties, 2) : []),
    ]));
}

function getRowsEndpoint(endpoint) {
  if (endpoint.requestMethod !== "post") return [];
  console.log(endpoint.requestBody.properties);
  return [
    `export async function ${endpoint.actionName}(body) {`,
    ...getRowsEndpointProperties(endpoint.requestBody.properties, 1),
    `  return await ${endpoint.requestMethod}("${endpoint.url}", body);`,
    `}`,
  ];
}

const main = async () => {
  // Get swagger JSON
  let swaggerResult;
  try {
    swaggerResult = await axios.get(URL_SWAGGER_JSON);
  } catch (error) {
    console.error(error);
  }
  // Mappa json swagger to dati azioni api
  const serverApis = processSwaggerJson(swaggerResult);
  // Crea cartella api vuota
  fs.rmSync(PATH_DIR_API, { force: true, recursive: true });
  fs.mkdirSync(PATH_DIR_API);
  // Scrivi file uno per uno
  Object.entries(groupBy(serverApis, 'pageName'))
    .forEach(([pageName, endpoints]) => {
      // console.log(pageName, endpoints);
      const contentRows = ['import { post } from "../logic/api";'];
      endpoints.map((endpoint) => contentRows.push(...['', ...getRowsEndpoint(endpoint)]));
      // console.log(contentRows);
      fs.writeFileSync(`${PATH_DIR_API}/${pageName}.js`, contentRows.join('\n'));
    });
};

main();
