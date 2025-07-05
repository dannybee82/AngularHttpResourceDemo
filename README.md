### **Angular 20 HttpResource Avatars Demo + .NET/C# WebAPI + PostgreSQL database**

A demo that demonstrates the new experimental **Angular 20** _HttpResource_ function.  
It uses a simple .NET/C# WebAPI as Backend and a PostgreSQL database.  
The .NET/C# WebAPI stores Avatars/images in the database as base64-strings.

The Angular application uses interfaces and abstract classes to reduce the amount of code.  
And the Angular application can fetch, filter, create, update and delete Avatars/images.  
The Angular application is _Zoneless_ (no Zone.js) and without _RxJs_.  
See the images in the root of this project for examples.

### **PostgreSQL database:**

See the folder: _Docker\_PostgreSQL\_database_ with the docker-compose file.

Command to add the _docker container_:

**docker-compose up --build -d**

### **Add database migrations**

Install the **dotnet ef-tool** - version: 8.0.11 or above

When the tool is installed, run the command for a _database migration:_

**dotnet ef database update**

For more information see the link below:

[https://learn.microsoft.com/en-us/ef/core/cli/dotnet](https://learn.microsoft.com/en-us/ef/core/cli/dotnet)

### **Angular application (with** [**Angular CLI**](https://github.com/angular/angular-cli) **version 20.0.5) installation**

**Command to install**

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_

### **Changelog:**

_July 2025_

**Backend change:**

\- use explicit _StopTracking_ when deleting records.

**Frontend changes:** 

\- Upgrade to Angular 20.

\- Using the keyword **readonly** for properties initialized by Angular (input(), output(), model()).

\- Using the keyword **protected** for properties that are only accessible in the template.

\- Removed the unnecessary package _@angular/platform-browser-dynamic_.

\- _ResourceStatus_ of the _httpResource_ function is in Angular 20 a **type** (was in Angular 19 an _enum_).

\- Removed _Zone.js_, removed _RxJS_ and removed polyfills from _angular.json_.

_\- Various other small changes._