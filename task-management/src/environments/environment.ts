// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl:'http://172.17.80.1:8098/taskManagement/api',
  apiUrl:'http://localhost:8055/taskManagement/api',
  // apiUrl:'http://localhost:8098/taskManagement/api',
  gatewayUrl:'http://localhost:8055',
  // apiUrl: 'http://host.docker.internal:8055/taskManagement/api',
  // gatewayUrl: 'http://host.docker.internal:8055',

  // apiUrl:'http://10.2.6.142:8092/taskManagement/api'
  // loginUrl: 'http://localhost:4200',
  // taskUrl: 'http://localhost:4201'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
