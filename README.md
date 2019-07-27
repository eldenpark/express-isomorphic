# Express Isomorphic
A web server designed to deliver isomorphic applications, built on top of express.js

## Inspiration
For the past couple of years, web applications have evolved to gain versatility that contain one or more interactive layers. They tend to have become client-side heavy in order that they can run dynamically rather than repeatedly render a series of static pages.

*Client side rendering (CSR)* is good, and we love that. However, those client-side rendered applications are hard to analyze by machines. It is quite uneasy for traditional bots to walk through all the different stages of state transitions of an application, let alone to see the initial landing page.

That is where *server side rendering (SSR)* kicks in. The technique claims that we first stringify web applications on the server side, then serve it to the client. Once the initial fetch that comes together with the script, the application runs dynamically just as it would be rendered solely on the client-side.

The beauty of SSR is that it gives bots, most prominently search engines, the ease of parsing the content, (see *search engine optimization*, [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization) to learn more) as well as it provides the best user experience with a good degree of interactivity.

**Express Isomorphic** is born to facilitate server side rendering. It is designed to be as minimal as possible, and be expanded through modules. It is agnostic of third-party frameworks such as React.js, meaning it can serve any JavaScript web application to run both on the server and the client sides. Look [express-isomorphic-extension](https://github.com/eldeni/express-isomorphic/tree/master/packages/express-isomorphic-extension), to get the glimpse of how modules can be implemented to enhance the functionality.

## Scripts
```
initial-install   yarn install && yarn run lerna exec yarn install
build             yarn run build [-p package]
launch            yarn run launch -p [package]
```

For example,
```
yarn run build && yarn run launch -p example-react
```

## Markup Generation
Function `makeHtml` generates web document that needs to be delivered to the client side. Developers are expected to stringify the application in this `makeHtml()` and return the plain string that contains also the script to run in client side.

### Why makeHtml via filepath, not the module
In local development environment, Express Isomorphic watches changes in files in order to update the application dynamically. When an option `watchPaths` is not given, it by default is expected to watch every loaded module starting from makeHtml(). This is why it takes `makeHtml` as filepath, not as a module.

## Local v. Production
Express Isomorphic supports two different development environments. Unlike `production` mode, where everything runs as we expect it to do, `local` dev environment supports several functionalities that helps seamless development.

### Local Development Environment
In `local` dev mode, Express Isomorphic watches designated files and keeps synchronizing with the current codebase, so the developers do not need to reboot the whole every once in a while.

## API
### development
```typescript
const { app } = await ExpressIsomorphic.createDev({
  extend,
  makeHtmlPath: path.resolve(__dirname, './makeHtml.js'),
  watchExt: 'js,jsx,ts,tsx,html,others',
  watchPaths: [
    path.resolve(__dirname, 'somePath'),
    path.resolve(__dirname, 'otherPath'),
  ],
});
```

### prod
```typescript
const { app } = await ExpressIsomorphic.createDev({
  extend,
  makeHtmlPath: path.resolve(__dirname, './makeHtml.js'),
});
```
