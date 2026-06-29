@description('Name of the App Service plan')
param appServicePlanName string = 'insurancePlan'
@description('Name of the Web App')
param webAppName string = 'insurance-api-webapp'
@description('SKU for App Service plan')
param skuName string = 'P1v2'

resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: appServicePlanName
  location: resourceGroup().location
  sku: {
    name: skuName
  }
  kind: 'linux'
}

resource webApp 'Microsoft.Web/sites@2022-03-01' = {
  name: webAppName
  location: resourceGroup().location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|18'
    }
  }
}

output appUri string = webApp.properties.defaultHostName
