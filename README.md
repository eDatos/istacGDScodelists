# Google Data Studio Connector for Recursos Estructurales ISTAC

This is the Google Data Studio Connector implemented to retrieve data from the ISTAC API (Recursos Estructurales).

The connector is written in [Apps Script](https://developers.google.com/apps-script/ "Google documentation").

## Development environmet

To be able to work in this project you just need to pull the code from the repository and have [Clasp](https://developers.google.com/apps-script/Google Clouddes/clasp "Google documentation") installed on your system.

### How to work in this project

#### _Authenticate with Clasp_

Once you have installed Clasp from the `src` directory you have to run:

```clasp login```

Now you can push code with your changes to Google by running:

```clasp push```

### How to try the connector

Once you have develop something and you want to try it you have to push it and the connector will be in the [Latest Version(Head)](https://datastudio.google.com/datasources/create?connectorId=AKfycbwH5EJuXyGG3_9Hyqjw5xDFLQR29WRGFOElo9qJDw "Latest Version").

When the development version is ready for release, the production deployment will be in the [Production deployment](https://datastudio.google.com/datasources/create?connectorId=AKfycbzIw6QGYQas83YwTsyn2Q98gyYFHqBWSK1yUDI8OminzsiUYl42Dp1oO0pIwDYSDDo "Prodction deployment")

You could also get this url by editing the [project](https://script.google.com/home) in the G Suite Developer Hub. Then click in `Publish --> Publish from manifest`. You can check the [documentation](https://developers.google.com/datastudio/connector/use).

### Debugging

To debug the connector you can put console.logs in the code, then you can see the logs in https://script.google.com/home/projects/ID_OF_THE_SCRIPT/executions (that's all I got for the moment), for example, you can see the logs for this connector in [here](https://script.google.com/home/projects/1VwcyXDA-F9_mmBDaXKqkKUxsklNJQRX4rXZ4HnhE86JjtGas-ntAkN7D/executions).

## Production environment

### How to deploy an versioned deployment

In Google Data Studio you can create version of your coda that consists in numbered shanpshots of your code. Which allows users to continue using the versioned connector while developers can keep coding. You can see more information in the [documentation](https://developers.google.com/apps-script/concepts/deployments).

To create a version you have to go to `File --> Manage versions` and create a new one with a descriptive name. You could also create a new version with clasp by running from `src/`:

```clasp version NAME_OF_THE_VERSION```

You can list all the versions with:

```clasp versions```

Once you have the version you can make a versioned deployment. You can do it with clasp or with the Google Cloud.

#### _With Clasp_

You can deploy the new connector with:

```clasp deploy [version] [description]```

And list the deployments with:

 ```clasp deployments```

You can find out more information about this in the [clasp documentation](https://developers.google.com/apps-script/guides/clasp)

#### _With the Google Cloud_

To deploy a new version from the Google Cloud you have to go to edit the script. Then you go to `Publish --> Publish from manifest` and Create a new one. You give it a name and a version and save it. Then you will have the new url.

You can find out more information in the [documentation](https://developers.google.com/datastudio/connector/deploy).

## Testing

This project is configured with the Jest framework for testing. You can execute the test by running:

```yarn test```

The project is also configured to see the coverage of the testing. You can see it by running:

```yarn coverage```
