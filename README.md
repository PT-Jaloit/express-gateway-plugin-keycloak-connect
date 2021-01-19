# express-gateway-plugin-keycloak-connect
Keycloak wrapper plugin for [Express Gateway](http://www.express-gateway.io/)


### Getting Started: 

```bash
$ eg plugin install keycloak-connect

```

### Usage:

You can use the default keycloak-connect config method with a 'keycloak.json' file at the root directory or you can specify the config under the system config variable.

* add to `system.config.yml`

```yaml
plugins:
    keycloak-connect:
        kcConfigParams:
            realm: "my-realm"
            auth-server-url: "https://kc-server.kc-domain.com/auth/"
            ssl-required: "external"
            bearer-only: true
            resource: "client-id"
            confidential-port: 0
            realm-public-key: "G5w44344..."
```

* add to `gateway.config.yml`

```yaml
policies:
  - keycloak-protect
...
pipelines:
  my-awesome-api:
    apiEndpoints:
      - api
    policies:
      - keycloak-protect:
        - action:
            roles: 'admin' #optional
```

### Detailed documentation:

[Express Gateway Overview](http://www.express-gateway.io/about/)

Express Gateway plugin explanation:
[Plugin Documentation](http://www.express-gateway.io/docs/plugins/)

Guidlines how to write your custom plugin:
[Plugin Development Guide](http://www.express-gateway.io/docs/plugins/development-guide)

[Keycloak Connect - Node.js Keycloak Adapter](https://www.keycloak.org/docs/latest/securing_apps/index.html#_nodejs_adapter) 
