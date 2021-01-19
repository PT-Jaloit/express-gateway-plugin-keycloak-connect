const egLogger = require('express-gateway/lib/logger')
const session = require('express-session')
const Keycloak = require('keycloak-connect')

module.exports = {
  version: '1.2.0',
  init: function (pluginContext) {

    const memoryStore = new session.MemoryStore()
    const kcConfig = pluginContext.settings.kcConfigParams
    const keycloak = new Keycloak({ store: memoryStore }, kcConfig || null )
    const logger = egLogger.createLoggerWithLabel('[EG:plugins:keycloak]')  

    pluginContext.registerGatewayRoute((app)=>{
      logger.debug('Register',pluginContext)
      logger.info('Registering keycloak middleware')
      app.use(keycloak.middleware())
    })

    pluginContext.registerPolicy({
      name: 'keycloak-protect',
      schema: {
        $id: 'http://express-gateway.io/schemas/policy/keycloak-protect-policy.json',
        type: 'object',
        properties: {
          roles: {
            type: 'string'
          }
        }
      },
      policy: (actionParams)=>{
        return keycloak.protect(actionParams.roles || null)
      }
    })

  },
  policies:['keycloak-protect'], 
  schema: {
    $id: 'http://express-gateway.io/schemas/plugin/keycloak-connect.json',
    kcConfigParams: {
      title: 'keycloak-connect config parameters',
      description: 'Parameters in case no config file exists',
      type: 'object'
    },
    required:[]
  }
};
