# kashti
This repo holds the work done by the BYU Capstone Team to build the Kashti 2.0 UI which supports the Brigade 2.0 Event-Driven Scripting Platform.

<hr>

## Setting up environment variables
In an effort to prevent sensitive information from being included in Git history, certain values can be stored as environment variables and accessed throughout the application.  To get Kashti working, you must initialize the environment variables with your information.

1. In `src/environments`, create two files: `environment.ts` (for non-prod) and `environment.prod.ts` (for prod).
2. In the appropriate environment file, fill in the information for your environment so that it looks like this (substituting for your information):
```
export const environment = {
  production: <TRUE_OR_FALSE>,
  apiUrl: '<YOUR_API_URL>',
};
```

This will allow Kashti to access your server while protecting your secrets.  These environment files are added to gitignore so they will not be added to Git history.

By default, building the application with `ng build` will build it in the non-production environment.  To specify which environment you want to build the Angular app to use, you can include environment flags when you build the app:

`ng build --prod`

or

`ng build --configuration=production`

This will replace the `environment.ts` file with the target-specific version of the file (i.e. prod).

By default, running the application with `ng serve` will run the non-production environment configuration.  After building the application for your desired environment, run the application with:

`ng serve`

or

`ng serve --open`

To start the application and open it in a browser when it's ready.

To specify that the production version of the application should be run, you can include the `--configuration=production` flag in the `ng serve` command.