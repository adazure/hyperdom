# hyperdom [![npm version](https://img.shields.io/npm/v/hyperdom.svg)](https://www.npmjs.com/package/hyperdom) [![npm](https://img.shields.io/npm/dm/hyperdom.svg)](https://www.npmjs.com/package/hyperdom) [![Build Status](https://travis-ci.org/featurist/hyperdom.svg?branch=master)](https://travis-ci.org/featurist/hyperdom)

A fast, feature rich virtual-dom framework for building dynamic browser applications.

Hyperdom applications are made of regular JavaScript objects that represent application state with `render()` methods that define how that state is represented in HTML. Hyperdom supports a simple event-update-render cycle, promises for asynchronous operations, JSX, non-JSX, client-side routing, SVG, two-way data binding, and optimises for performance, developer usability and simplicity of application architecture.

Hyperdom includes Typescript type definitions.

Hyperdom is influenced by Facebook's [React](http://facebook.github.io/react/) and uses [virtual-dom](https://github.com/Matt-Esch/virtual-dom) for the DOM patching.

Sponsored by:

[![Browserstack](https://www.browserstack.com/images/mail/newsletter-bs-logo.png)](https://www.Browserstack.com/).

## Table of Contents

* [An Example](#an-example)
* [Install](#install)
  * [New project](#new-project)
  * [Add to existing project](#add-to-existing-project)
  * [Size](#size)
  * [Browser Support](#browser-support)
* [Usage](#usage)
    * [Hyperdom Applications](#hyperdom-applications)
    * [The Render Method](#the-render-method)
      * [JS](#js)
      * [JSX](#jsx)
      * [SVG (or XML more generally)](#svg-or-xml-more-generally)
    * [Events](#events)
      * [Re-rendering the view](#re-rendering-the-view)
      * [Bindings](#bindings)
    * [Routing](#routing)
      * [Component Methods](#component-methods)
      * [Route Definitions](#route-definitions)
          * [isActive](#isactive)
          * [url](#url)
          * [params](#params)
          * [push](#push)
          * [replace](#replace)
      * [Route Options](#route-options)
      * [Router Options](#router-options)
      * [Not Found](#not-found)
    * [Virtual Dom API](#virtual-dom-api)
      * [Selectors (hyperdom.html only)](#selectors-hyperdomhtml-only)
      * [Add HTML Attributes](#add-html-attributes)
      * [Keys](#keys)
      * [Raw HTML](#raw-html)
      * [Classes](#classes)
      * [Joining VDOM Arrays](#joining-vdom-arrays)
      * [Data Attributes](#data-attributes)
      * [Responding to Events](#responding-to-events)
      * [Binding the Inputs](#binding-the-inputs)
      * [Radio Buttons](#radio-buttons)
      * [Select Dropdowns](#select-dropdowns)
      * [File Inputs](#file-inputs)
      * [Window Events](#window-events)
      * [Mapping the model to the view](#mapping-the-model-to-the-view)
    * [Components](#components)
      * [Model Components](#model-components)
      * [View Components](#view-components)
    * [Caching](#caching)
    * [Not Refreshing](#not-refreshing)
    * [Refreshing the view explicitly](#refreshing-the-view-explicitly)
    * [Refreshify](#refreshify)
    * [Binding](#binding)
    * [Server-side Rendering](#server-side-rendering)
    * [Using with Typescript](#using-with-typescript)
      * [Router based components](#router-based-components)
      * [Render based components](#render-based-components)
* [API](#api)
    * [Rendering the Virtual DOM](#rendering-the-virtual-dom)
      * [The binding Attribute](#the-binding-attribute)
      * [Event Handler on* Attributes](#event-handler-on-attributes)
      * [Promises](#promises)
    * [Raw HTML](#raw-html-1)
    * [Attaching to the DOM](#attaching-to-the-dom)
      * [Detach](#detach)
      * [Remove](#remove)
* [Performance](#performance)
* [Debugging](#debugging)
    * [Chrome Plugin](#chrome-plugin)
    * [File Names and Line Numbers](#file-names-and-line-numbers)
* [Production Build](#production-build)
* [Common Errors](#common-errors)
    * [Outside Render Cycle](#outside-render-cycle)
    * [Refresh Outside Render Cycle](#refresh-outside-render-cycle)
* [Development](#development)
    * [Building](#building)
    * [Automated Testing](#automated-testing)
    * [Manual Testing](#manual-testing)
* [Sister Projects](#sister-projects)
* [We're Hiring!](#were-hiring)

## An Example

```jsx {"codeExample": {"project": "docs/codesandbox/demo-js", "file": "src/index.jsx"}}
import * as hyperdom from "hyperdom";

class App {
  render() {
    return <div>
      <label>what's your name? </label>
      <input type="text" binding="this.name" />
      <div>hi {this.name}</div>
    </div>;
  }
}

hyperdom.append(document.body, new App());
```
<a href="https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKAdAIwIZplATgYyVHwHsA7AFxkqRGAB0yACJ-kAB13hgrjcSYBtRixZtqANzYAaEaLYALAJ7sYuACYkAtmzkBdRgF8Qh6SAhl1MAB4oFFLVCIhSlahVoAeAIQARAPIAwgAqAJoACgCiTPaOAHyMnrFQCWSJCjAY6qn0FJ4UEBSwceEYBDhMAMoYlmgk1p4A9AVFMDl5WjwYTPgKZXA8ALxsAKrBAGIAtAAcbEyNqU0ZWTlknnXqSu2e6hASTBDqwyAY7OxscU27Equ5nnD4uBDsFExwBMfv-I0WVrYAVnBrBdGHdGg8ni9Fo0NltQWtGslUiYzOwMPgANYYADmMBQgPIzlcVBoiDocjYZAwnX4rBAylUGm0kxs1PYsBkFJAEjUcAg5FpbAAjCgAAxiznMOlWCHPAoCpB0gASKjUmi0TF8MC0JCYAClKpKxCAtBgLILzJYbHYHFAjXTZS8-IqGFLjXAKGUKBa0eUoAcrbZkkxJpMSKo0iBZG66WgAK7QdQ-sr4CrxxMBv42xy6KWmLlWCNWMj4CDwWmu0SxrA4SacbgUSYMtXaC0igAsEqjcmNzaZOkVbCgGCoHtzLHzUrYVgkWqL1FL5ZdPbpvtTUEm8cssFwFuHo-9IDkk-NGJgSgA7iQNM6BIIDGRDIwUSAvj9A_igUTyCSPGSIFo7DXq8ABUTAYHAMSqv2TBgLg2h0n26psAA3PC-DDnAkEAIJnEwlZMFwVq4AAFAAlPhK5cBQca4MwOx7KkVYsJ4w7YCkF59BQADkkFKCQtFMFSnQAPxME0bE4ExzGeBY7Bxq8FCqscVDWIeTBoL8FjYipCgQHAKDCTAcwLCuLHXHEen4RQekGUZhhXIxK6OTcaF5kY8JIdoKCnEWJGaPgcadJQ6AkJs0hCTAF5MLh7DkWRKEmIYhhAA&query=module%3Dsrc%2Findex.jsx" target="_blank" rel="noopener noreferrer">Run this example</a>

Same example in Typescript:

```typescript {"codeExample": {"project": "docs/codesandbox/demo-ts", "file": "src/index.tsx"}}
import * as hyperdom from "hyperdom";

class App extends hyperdom.RenderComponent {
  private name: string;

  public render() {
    return (
      <div>
        <label>what's your name? </label>
        <input type="text" binding={[this, "name"]} />
        <div>hi {this.name} </div>
      </div>
    );
  }
}

hyperdom.append(document.body, new App());
```
<a href="https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPISQHwA6qABF8zAIboO3HrwIQCsVgAV-AJ3IwoXAMr8MAI0pZGAenGSYw0byIwC_LuTzy45gLzsQAVQAqAMQC0ADidddxry6eAJCnJw8jFroAJ6BkegQAG5cEOiOIPwADllOrHqJScIRooxw5HIQWQRccAoZdeS6aJi4BHBYeXrlldWBetFxnHosUMIgAL4ANCBZ_OQA1vwA5jA4AFZw1GQgVDR0BAzAJU6o_GZOiFxOeDFZMHLolESeBHfwFVUEntjnWbBOKYnEBJB5wCDUS7XEAARhwAAYEYDgZgel8IagoU5kSInER-GgsSAWth8MQoDieE40dU4FDjiIqSA4BY5AQiXMFEpUhhSaMuJ5PJR7piQEDGdCNABXaDoDnyRTKaWynmtMkkbEiaYomAizCocgQeD0kpM273R7PImImEAViRYtN0Le9xp7KQ0IAzDhvZ6_Z7NTxtbiQJgkgARXV0fWG40ehkmJycxWeaUYWByIkAPThADYcDDA1xg0yFjAYgB3SiPOkegDaAF1OBNOJMZu09pBlhstqgdntaPRECAE9CqEQstAHgB5aoY2tXUdMrZSrkAWWyUIIcilMHFiZAUAgGihdac8FzgOhTyITgb-9ETk2nQ9TjkAnI7ofTOf7nmBGrGIiXNB4bx7F9v2hORKEoAhwwgTNX2ZBQixbVA0LbZCmhJNoOn7ahB0OYcIAnasagAKi4fg4C4EDLSILgwGghibneeinAAbnCA0oGomiAEEci4bBB3QGi6LAgAlaMHgAYWeLJqAOLhRyySokn4WguDOMwrhZSpUGWLjMRELIpQ0I9yC4d9eTkAAKABKFSnXfAhV24OynQSZJ4hMXheI0JRWArGwCAAchomJKFXbTzhgAB-IIAqCrzSjQMyahdGAMloLB3S4DQWjQZZ7GAOsCDwCA4CmaEdJgO8Jn8XyTEYQpWEqlSKqqnA6sagofNS_qiidBzjKDZtuIk54cGyPU7KecgpTMGgcEGGrUBgCsuEErJHNGyYJgmIA&query=module%3Dsrc%2Findex.tsx" target="_blank" rel="noopener noreferrer">Run this example</a>

## Install

### New project

Create a skeleton appilcation with express backend:

```bash
npx create-hyperdom-app my-app # yarn create hyperdom-app my-app
```

### Add to existing project

    npm install hyperdom

Use with browserify or webpack:

```javascript
const hyperdom = require('hyperdom');
```

### Size

* `hyperdom.js`: 77K
* `hyperdom.min.js`: 29K
* `hyperdom.min.js.gz`: 9.4K

### Browser Support

* IE 9, 10, 11
* Edge
* Safari
* Safari iOS
* Firefox
* Chrome

Other browsers are likely to work but aren't routinely tested.

## Usage

### Hyperdom Applications

A Hyperdom application is simply an object that contains a `render()` method which returns the desired HTML for your application in its current state. This HTML can contain event handlers which modify the application state, after which `render()` is called again to reflect the new HTML. Underneath we use virtual-dom, which ensures that the DOM is updated incrementally, applying only the changes since the last render so it's incredibly fast.

The result is that we can write applications that have a simple relationship between our application data, the HTML on the page and how the page changes when the user interacts with it.

Here's an example:

```jsx {"codeExample": {"project": "docs/codesandbox/demo-js", "file": "src/index.jsx"}}
const hyperdom = require('hyperdom');

class App {
  constructor() {
    this.name = 'Sally'
  }

  render() {
    return <div>
      <label>what's your name?</label>
      <input type="text" binding="this.name" />
      <div>hi {this.name}</div>
    </div>;
  }
}

hyperdom.append(document.body, new App());
```
<a href="https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKAdAIwIZplATgYyVHwHsA7AFxkqRGAB0yACJ-kAB13hgrjcSYBtRixZtqANzYAaEaLYALAJ7sYuACYkAtmzkBdRgF8Qh6SAhl1MAB4oFFLVCIhSlahVoAeAIQARAPIAwgAqAJoACgCiTPaOAHyMnrFQCWSJCjAY6qn0FJ4UEBSwceEYBDhMAMoYlmgk1p4A9AVFMDl5WjwYTPgKZXA8ALxsAKrBAGIAtAAcbEyNqU0ZWTlknnXqSu2e6hASTBDqwyAY7OxscU27Equ5nnD4uBDsFExwBMfv-I0WVrYAVnBrBdGHdGg8ni9Fo0NltQWtGslUiYzOwMPgANYYADmMBQgPIzlcVBoiDocjYZAwnX4rBAylUGm0kxs1PYsBkFJAEjUcAg5FpbAAjCgAAxiznMOlWCHPAoCpB0gASKjUmi0TF8MC0JCYAClKpKxCAtBgLILzJYbHYHFAjXTZS8-IqGFLjXAKGUKBa0eUoAcrbZkkxJpMSKo0iBZG66WgAK7QdQ-sr4CrxxMBv42xy6KWmLlWCNWMj4CDwWmu0SxrA4SacbgUSYMtXaC0igAsEqjcmNzaZOkVbCgGCoHtzLHzUrYVgkWqL1FL5ZdPbpvtTUEm8cssFwFuHo-9IDkk-NGJgSgA7iQNM6BIIDGRDIwUSAvj9A_igUTyCSPGTXB6MSqv2TCDEwXAAI4JlwAAUADkfbqnBACUADc8L4MOcBwEwACCZxMJWPTkB6uBxvgFDXjByGESuFAKBAcAoFSnSgUwcHVFAUBKHBx7wiwXBWrg1G0TGXAUHGuDMDseypFWLCeMO2ApBefQUHBOFKCQklMCxMAAPxNEpOByfJngWOwcavBQqrHFQ1iHkwaC_BY2J2QxTF6XMCwrgp1xxAxhH0YxzHUjAhhXLJK6RTc6F5kY8KIdoKCnEWMGaPgcadJQ6AkJs0i6TAF54Wc1FoSYhiGEAA&query=module%3Dsrc%2Findex.jsx" target="_blank" rel="noopener noreferrer">Run this example</a>

This works with [babel-preset-hyperdom](https://github.com/featurist/babel-preset-hyperdom), see [JSX](#jsx) for more details.

Here we have a class `App`, that contains a `render()` method. We define the HTML (or virtual-dom), including an `input` element that is bound onto the model with `binding="this.name"`, this means that the app's `name` property is used to populate the `<input>`, and conversely, whenever the user types something into the `<input>`, they change `name`. The name is constantly rendered into the HTML with `hi {this.name}`.

Finally, we attach the application onto the DOM using `hyperdom.append`, which appends the application's top-level DOM element to the HTML document's body.

Larger applications will typically have several classes or objects like this in a hierarchical structure to handle different parts of the page, or to encapsulate different application logic. Here we have an application that shows an article and a login component:

```jsx
const hyperdom = require('hyperdom');
const httpism = require('httpism');

class App {
  constructor() {
    this.article = new Article()
    this.login = new Login()
  }

  render() {
    return <div>
      {this.login}
      {this.article}
    </div>
  }
}

class Article {
  onload() {
    return httpism.get('/content').then(content => {
      this.content = content
    })
  }

  render() {
    if (this.content) {
      return <div class="article">{this.content}</div>
    } else {
      return <div class="article loading"></div>
    }
  }
}

class Login {
  login() {
    ...
  }

  logout() {
    ...
  }

  render() {
    if (this.user) {
      <div class="user">
        <div class="user_name">{this.user.name}</div>
        <button onclick={() => this.logout()}>logout</button>
      </div>
    } else {
      return <div>
        <input type="text" binding={[this, 'username']} />
        <input type="password" binding={[this, 'password']} />
        <button onclick={() => this.login()}>login</button>
      </div>
    }
  }
}

hyperdom.append(document.body, new App());
```

This works with [babel-preset-hyperdom](https://github.com/featurist/babel-preset-hyperdom), see [JSX](#jsx) for more details.

### The Render Method

The `render` method returns a virtual DOM fragment. As a general rule, the render method does not modify the state of the model and returns the same VDOM fragment for the same model state.

The virtual-dom can be generated using regular JavaScript or JSX

#### JS

The JavaScript virtual-dom API has some niceties for generating classes and IDs.

```js {"codeExample": {"project": "docs/codesandbox/demo-no-jsx", "file": "src/index.js", "line": 2}}
const h = require('hyperdom').html

class App {
  render() {
    return h('div.content',
      h('h1', 'hello!')
    )
  }
}
```
<a href="https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPAIQAiA8gMIAqAmgAoBRAASESAPgA6qRmKhTU02TACG6BZIKMCEArHH8VAJ3IwowgMoqMAI0pZGAeh16YGrURgEVw8nmNwXgC8kiAAqtwAYgC0AByhwo4KTniq6tJKdugAnu6M6BAAbsIQ6CEgKgAOlaHiTgWFGopacORGEJUEwnAm5T3kjmiYuABWcLUZWo6t7Z3Jjlm5GTKOcgogAL4ANCCVKuQA1ioA5jA4Y9RkIFQ0dAQMwNLCwqGoKp6hiC8geNmVMEZ0JQiNFsO9KrBQlsnt9CgC4BBqJ9vgBGHAABgxUJhoUwMw6OiRSG-AAk_gCgURhKwYERKMIAFIWbGoZ6hIgqNDI0JDbD4YhQFlskD4zrjYmPVnPb5wbxGAjc3bGUzmXm4OTCaLRSj_RQgaFS4U2ACu0HQir2JjMwhNZpKGD5clCMO2OJAmF1mFQ5Ag8GRkul31-_0BwMVUBUtFlzqlrqluJghRpnroPr9EphwstKuiJowsCM4cj8AVIBdBuFBxg2QA7pRAeKvgBtAC60g20k2O36gwdowQyGu1Fo9EQQ9QstE5NDVKCwiMMAAjqaFwAKADkwYpwPXAEpljdJ3hhHOF8uIGvN9PKXv-SQDxG4HBhABBarCAPzuiYIyr3cfzMvwIY0jFZPANwaHAbhHAh1wrF4umecDNxRODhE3MwoEoZg90A_dY3baQtxnHAqk9VcgXIY1PBoHBFi2YRUBgGtX2qP9dwAbk7DYeKAA&query=module%3Dsrc%2Findex.js" target="_blank" rel="noopener noreferrer">Run this example</a>

#### JSX

You can write JSX using [babel](https://babeljs.io/) with [babel-preset-hyperdom](https://github.com/featurist/babel-preset-hyperdom). This uses `hyperdom.jsx` as the JSX pragma and [babel-plugin-transform-jsx-hyperdom-binding](https://github.com/featurist/babel-plugin-transform-jsx-hyperdom-binding) for binding syntax. JSX actually performs faster than `hyperdom.html` because JSX is a slightly less flexible form of virtual-dom.

```jsx
const hyperdom = require('hyperdom');

class App {
  render() {
    return <div class="content">
      <h1>hello!</h1>
    </div>
  }
}
```

#### SVG (or XML more generally)

Hyperdom will interpret XML if it contains an `xmlns` attribute. This includes regular XML behaviour like declaring and using namespaces. Note that JSX itself doesn't support `namespace:tag` syntax, so you can use an alternative syntax with `--` instead, for e.g. `namespace--tag`.

```jsx
const hyperdom = require('hyperdom')

class Circle {
  render() {
    return <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" stroke="red" stroke-width="4" fill="yellow" />
    </svg>
  }
}
```

Rendering SVG supports all the same DOM events and interaction you'd expect from hyperdom.

### Events

There are two primary ways to respond to user events in Hyperdom, the first most basic form is to set an `on*` event handler such as `onclick` on a VDOM element, just as you would in HTML. For example, to handle a button click, you can write:

```jsx
<button onclick={() => this.doSomething()}>do something</button>
```

The event handler can then modify the model, or start an AJAX download, or whatever is required to respond to the user. Immediately after the event handler has run, the page is re-rendered to reflect the new state of the application. In the case of asynchronous operations, like AJAX, you can return a promise from the event handler, and the page will re-render once more when the promise is resolved.

A common scenario works like this:

1. Render the VDOM with an event handler on `onclick`
2. The VDOM is patched into the HTML
3. The user clicks on the element
4. The event handler is executed, modifies the model as necessary and optionally returns a promise of an asynchronous operation (for example, if the event handler performs AJAX)
5. The view is re-rendered reflecting the new changes to the model
6. If the event handler returns a promise, wait for it to resolve
7. Re-render the model once more to reflect the changes from the asynchronous operation

#### Re-rendering the view

Notice that the whole view is re-rendered after each event. This is because it's common for one part of the page to modify the model in such a way that other parts of the page change too, and you shouldn't have to think about which parts of the view need to be re-rendered after a model change. It's possible to do this because Hyeprdom is extremely quick and it's very rare for this approach to cause performance issues, even on mobile, and even for large complex applications, but for some types of application where there is a lot of data on a page, it can be useful to look for performance optimisations, see [performance](#performance) for details.

#### Bindings

The second mechanism for handling events is more specialised and represents a very typical usecase for `<input>` elements. You want the input's value to represent the model, but you also want to change the model if the user interacts with the input. For this we introduce a `binding` attribute:

```jsx
<input type="text" binding="this.name"/>
```

which is shorthand for:

```jsx
<input type="text" binding={[this, 'name']}/>
```

The binding attribute does two things, it allows the VDOM to get the current value of the model (the model's `name` in this case), but also set it when the user types something in the text box. Both of these syntaxes above actually end up resolving to an object with two methods: `set` and `get`, and so are equivalent to:

```jsx
<input type="text" binding={
  {
    get: () => this.name,
    set: (value) => this.name = value
  }
}/>
```

This binding object with `set` and `get` can be used to to handle additional logic when the model is read or written to by a binding. The `get` method is called when rendering the VDOM, the `set` method is called with the new value when the user interacts with the input.

Alternatively you can implement the binding logic yourself, by setting the input's value and responding to `onchange` event:

```jsx
<input type="text" value={this.name} onchange={e => this.name = e.target.value}/>
```

Hyperdom bindings handle `onchange` events like this of course, but also other events such as those for copy and paste, and work across a constiety of browsers, so it's recommended to use bindings where possible.

### Routing

The router for Hyperdom supports History API or Hash URLs, and is capable of two-way binding with route parameters, and supports nesting of views.

First we define some routes:

```js
const router = require('hyperdom/router')

const routes = {
  home: router.route('/'),
  posts: router.route('/posts'),
  post: router.route('/posts/:id')
}
```

These routes can be used in constious places, including as `hrefs` in anchors:

```jsx
<a href={routes.post.href({id: post.id})}>{post.title}</a>
```

The application can render the routes by implementing a `routes()` function, which returns an array of route definitions:

```jsx
class App {
  routes() {
    return [
      home({
        render: () => <h2>home</h2>
      })
    ]
  }
}
```

And finally start the application with the router:

```js
hyperdom.append(document.body, new App(), {router: router})
```

Here's a slightly more realistic application that renders all three routes:

```jsx
class App {
  constructor() {
    this.posts = new Posts()
  }

  routes() {
    return [
      home({
        render: () => <h2>home</h2>
      }),

      this.posts
    ]
  }

  renderLayout(content) {
    return <div>
      <h1>our app</h1>
      {content}
    </div>
  }
}
```

When we're on `/` we render `<h2>home</h2>`, but nest it in a div with `<h1>our app</h1>`. This way we can have a consistent page layout no matter what route we're on. Finally, `App` defers to `Posts` for the remaining routes:

```jsx
class Posts {
  constructor() {
    this.posts = []
  }

  async onload() {
    this.posts = await httpism.get('/posts')
  }

  routes() {
    return [
      posts({
        render: () => <div>
          {
            this.posts.map(post => (
              <a href={routes.post.href({id: post.id})}>{post.title}</a>
            ))
          }
        </div>
      }),

      post({
        bindings: {
          id: [this, 'postId']
        },

        render: () => {
          const post = this.posts[this.postId]

          if (post) {
            return <article>
              <h1>{post.title}</h1>
              {post.content}
            </article>
          } else {
            <div>loading...</div>
          }
        }
      })
    ]
  }
}
```

Here `Posts` defines two routes, the first one simply lists the posts available with links, the second displays the post selected. We use `bindings` to define how the route parameter in `/posts/:id` is mapped onto the model as `this.postId`. We also have some conditional logic to render either a loading page or the article itself.

#### Component Methods

* `routes()` returns an array of routes or components. Routes define how the route is rendered, components can themselves have `routes()` methods defining more routes.
* `renderLayout(content)` - can be used to wrap HTML around what is returned by the rendered route, such as headers and footers. `content` is the VDOM returned by rendering the route.

#### Route Definitions

##### isActive

You can check whether the current URL is on a route by using `route.isActive(params)`. This comes in two forms: if you pass parameters to `isActive()` then those parameters must match the current URL, if you don't pass params then any URL that matches the route's pattern is considered active.

```js
const article = router.route('/article/:id')
const home = router.route('/')

// while on /article/5
article.isActive() === true
article.isActive({id: 5}) === true

article.isActive({id: 10}) === false
home.isActive() === false
```

##### url

```js
const article = router.route('/article/:id')
article.url({id: 5, page: 3}) === '/article/5?page=3'
```

##### params

```js
const article = router.route('/article/:id')

// when on /article/5?page=3
article.params() === {id: '5', page: '3'}

// when on /elsewhere
article.params() === undefined

article.params('/article/10') === {id: '10'}
```

##### push

```js
const article = router.route('/article/:id')

// push history, resetting scroll to 0, 0
article.push({id: 5})

// push history, without scroll reset
article.push({id: 5}, {resetScroll: false})
```

##### replace

```js
const article = router.route('/article/:id')

// replace history, only in push state
article.replace({id: 5})
```

#### Route Options

```js
const article = router.route('/article/:id')

class App {
  routes() {
    return [
      article({
        render: () => ...,
        onload: (params) => ...,
        push: { ... },
        push: (oldParams, newParams) => ...,
        bindings: { ... },
        redirect: (params) => ...,
      })
    ]
  }
}
```

Each route definition can contain the following methods:

* `render()` - renders the route. If the component contains `renderLayout(content)`, then the output from the route `render()` will be passed as `content` to the component's `renderLayout(content)` method.
* `onload(params)` - is called when the user navigates to the route, `params` is an object containing the parameters extracted from the route.
* `bindings` - an object containing bindings keyed on the parameter names in the route. These two-way bindings are used to update the URL when the model changes, or to change the model if the URL changes.
* `push` - an object containing parameter names set to `true` if changes to those parameters should cause a new URL to be set using `history.pushState`, otherwise the new URL is set using `history.replaceState`.

    For example: `push: {id: true}` would cause a new URL to be pushed on to history if the model changes in such a way that `:id` changes in the route.

* `push(oldParams, newParams)` - a function that is called if any of the bindings cause the URL to change, if the function returns true, then the new URL is set using `history.pushState`, otherwise the new URL is set using `history.replaceState`.
* `redirect(params)` - return a URL to redirect to, `params` is an object containing the parameters extracted from the route.

#### Router Options

You can create new router with different options:

```js
const hyperdomRouter = require('hyperdom/router')
const router = hyperdomRouter.router(options)
```

Where `options` can contain:

* `querystring` - an object that contains `stringify(params)` and `parse(querystring)` methods, the `qs` module or Node's `querystring` module are good options. By default Hyperdom uses a very simple (and small) query string parser and stringifier that works for basic values like strings and numbers, but for complex objects you'll see `%5Bobject%20Object%5D` in your query string.
* `history` - can be either `router.hash()` for hash-style routing, or `router.pushState()` for regular History API routing.
* `baseUrl` - can be used to make all routes relative to this base URL path

#### Not Found

You can render something if none of the routes match the URL by using `router.notFound()`:

```jsx
class App {
  routes() {
    return [
      routes ...

      router.notFound((path, routes) => ...)
    ]
  }
}
```

Where

* `path` - the current path as found in the address bar
* `routes` - the list of routes found in the application, these can be used to show which routes are available

### Virtual Dom API

#### Selectors (`hyperdom.html` only)

Use `tagname`, with any number of `.class` and `#id`.

```js
h('div.class#id', 'hi ', model.name);
```

Spaces are taken to be small hierarchies of HTML elements, this will produce `<pre><code>...</code></pre>`:

```js
h('pre code', 'hi ', model.name);
```

#### Add HTML Attributes

JS

```js
h('span', { style: { color: 'red' } }, 'name: ', this.name);
```

JSX

```jsx
<span style={{color: 'red'}}>name: {this.name}</span>
<span style="color: red">name: {this.name}</span>
```

[virtual-dom](https://github.com/Matt-Esch/virtual-dom) uses JavaScript names for HTML attributes like `className`, `htmlFor` and `tabIndex`. Hyperdom supports these, but also allows regular HTML names so you can use `class`, `for` and `tabindex`. These are much more familiar to people and you don't have to learn anything new.

Non-standard HTML attribtes can be placed in the `attributes` key:

```js
h('span', {attributes: {'my-html-attribute': 'stuff'}}, 'name: ', model.name);
```

#### Keys

Hyperdom (or rather [virtual-dom](https://github.com/Matt-Esch/virtual-dom)) is not clever enough to be able to compare lists of elements. For example, say you render the following:

```jsx
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
</ul>
```

And then, followed by:

```jsx
<ul>
  <li>zero</li>
  <li>one</li>
  <li>two</li>
  <li>three</li>
</ul>
```

The lists will be compared like this, and lots of work will be done to change the DOM:

```html
<li>one</li>   => <li>zero</li>  (change)
<li>two</li>   => <li>one</li>   (change)
<li>three</li> => <li>two</li>   (change)
                  <li>three</li> (new)
```

If we put a unique `key` (String or Number) into the attributes, then we can avoid all that extra work, and just insert the `<li>zero</li>`.

```jsx
<ul>
  <li key="one">one</li>
  <li key="two">two</li>
  <li key="three">three</li>
</ul>
```

And:

```jsx
<ul>
  <li key="zero">zero</li>
  <li key="one">one</li>
  <li key="two">two</li>
  <li key="three">three</li>
</ul>
```

It will be compared like this, and is much faster:

```html
                  <li>zero</li>  (new)
<li>one</li>   => <li>one</li>
<li>two</li>   => <li>two</li>
<li>three</li> => <li>three</li>
```

Its not all about performance, there are other things that can be affected by this too, including CSS transitions when CSS classes or style is changed.

#### Raw HTML

Insert raw unescaped HTML. Be careful! Make sure there's no chance of script injection.

```js
hyperdom.rawHtml('div',
  {style: { color: 'red' } },
  'some dangerous <script>doTerribleThings()</script> HTML'
)
```

This can be useful for rendering HTML entities too. For example, to put `&nbsp;` in a table cell use `hyperdom.rawHtml('td', '&nbsp;')`.

#### Classes

Classes have some additional features:

* a string, e.g. `'item selected'`.
* an array - the classes will be all the items space delimited, e.g. `['item', 'selected']`.
* an object - the classes will be all the keys with truthy values, space delimited, e.g. `{item: true, selected: item.selected}`.

JS

```js
this.items.map(item => {
  return h('span', { class: { selected: item == this.selectedItem } }, item.name)
})
```

JSX

```jsx
this.items.map(item => {
  return <li class={{ selected: item == this.selectedItem }}>{item.name}</li>
})
```

#### Joining VDOM Arrays

You may have an array of vdom elements that you want to join together with a separator, something very much like `Array.prototype.join()`, but for vdom.

```jsx
const items = ['one', 'two', 'three']
hyperdom.join(items.map(i => <code>{i}</code>), ', ')
```

Will produce this HTML:

```html
<code>one</code>, <code>two</code>, <code>three</code>
```

#### Data Attributes

You can use either `data-*` attributes or set the `data` attribute to an object:

```jsx
h('div', {'data-stuff': 'something'})
h('div', {dataset: {stuff: 'something'}})
<div data-stuff="something"/>
<div data={{stuff: 'something'}}/>
```

#### Responding to Events

Pass a function to any regular HTML `on*` event handler in, such as `onclick`. That event handler can modify the state of the application, and once finished, the HTML will be re-rendered to reflect the new state.

If you return a promise from your event handler then the HTML will be re-rendered twice: once when the event handler initially returns, and again when the promise resolves.

```jsx
class App {
  constructor() {
    this.people = []
  }

  addPerson() {
    this.people.push({name: 'Person ' + (this.people.length + 1)})
  }

  render() {
    return <div>
      <ul>
        {
          this.people.map(person => <li>{person.name}</li>)
        }
      </ul>
      <button onclick={() => this.addPerson()}>Add Person</button>
    </div>
  }
}

hyperdom.append(document.body, new App())
```

#### Binding the Inputs

This applies to `textarea` and input types `text`, `url`, `date`, `email`, `color`, `range`, `checkbox`, `number`, and a few more obscure ones. Most of them.

The `binding` attribute can be used to bind an input to a model field. You can pass either an array `[model, 'fieldName']`, or an object containing `get` and `set` methods: `{get(), set(value)}`. See [bindings](#the_binding_attribute) for more details.

```jsx
class App {
  render() {
    return <div>
      <label>what's your name?</label>
      <input type="text" binding={[this, 'name']} />
      <div>hi {this.name}</div>
    </div>
  }
}
```

#### Radio Buttons

Bind the model to each radio button. The buttons can be bound to complex (non-string) values, such as the `blue` object below.

```jsx
const blue = { name: 'blue' };

class App {
  constructor() {
    this.colour: blue
  }

  render() {
    return <div>
      <input class="red" type="radio" name="colour" binding="this.colour" value="red" />
      <input class="blue" type="radio" name="colour" binding="this.colour" value={blue} />
      <div>
        colour: {JSON.stringify(this.colour)}
      </div>
    </div>
  }
}

hyperdom.append(document.body, new App());
```

#### Select Dropdowns

Bind the model onto the `select` element. The `option`s can have complex (non-string) values.

```jsx
const blue = { name: 'blue' };

class App {
  constructor() {
    this.colour = blue
  }

  render() {
    return <div>
      <select binding="this.colour">
        <option value="red">red</option>
        <option value={blue}>blue</option>
      </select>
      <code>{JSON.stringify(this.colour)}</code>
    </div>
  }
}

hyperdom.append(document.body, new App());
```

#### File Inputs

The file input is much like any other binding, except that only the binding's `set` method ever called, never the `get` method - the file input can only be set by a user selecting a file.

```js
class App {
  constructor () {
    this.filename = '(no file selected)'
    this.contents = ''
  }

  render() {
    return <div>
      <input type="file" binding={ { set(file) => this.loadFile(file) } }>
      <h1>{this.filename}</h1>
      <pre>
        <code>{this.contents}</code>
      </pre>
    </div>
  }

  loadFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onloadend = () => {
        this.filename = file.name;
        this.contents = reader.result;
        resolve();
      };
    });
  }
}

hyperdom.append(document.body, new App())
```

#### Window Events

You can attach event handlers to `window`, such as `window.onscroll` and `window.onresize`. Return a `windowEvents()` from your render function passing an object containing the event handlers to attach. When the window vdom is shown, the event handlers are added to `window`, when the window vdom is not shown, the event handlers are removed from `window`.

E.g. to add an `onresize` handler:

```js
const windowEvents = require('hyperdom/windowEvents');

class App {
  render() {
    return <div>
      width = {window.innerWidth}, height = {window.innerHeight}
      {
        windowEvents({
          onresize: () => console.log('resizing')
        })
      }
    )
  }
}
```

#### Mapping the model to the view

Sometimes you have an input that doesn't map cleanly to a view, this is often just because the HTML input element represents a string value, while the model represents something else like a number or a date.

For this you can use a `mapBinding`, found in `hyperdom/mapBinding`.

```jsx
const mapBinding = require('hyperdom/mapBinding')

const integer = {
  view (model) {
    // convert the model value to a string for the view
    return model.toString()
  },

  model (view) {
    // convert the input value to an integer for the model
    return Number(view)
  }
}

<input binding={mapBinding(this, 'age', integer)}>
```

As is often the case, it's possible that the user enters an invalid value for the model, for example they type `xyz` into a field that should be a number. When this happens, you can throw an exception on the `model(value)` method. When this happens, the model is not modified, and so keeps the old value, but also, crucially, the view continues to be rendered with the invalid value. This way, the user can go from a valid value, they can pass through some invalid values as they type in finally a valid value. For example, when typing the date `2020-02-04`, it's not until the date is fully typed that it becomes valid.

```js
const mapBinding = require('hyperdom/mapBinding')

const date = {
  view (date) {
    // convert the model value into the user input value
    return `${date.getFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
  },
  model (view) {
    // test the date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(view)) {
      // not correct, keep typing
      throw new Error('Must be a date of the format YYYY-MM-DD');
    } else {
      // correct format, set the model
      return new Date(view);
    }
  }
}

<input binding={mapBinding(this, 'dateOfBirth', date)}>
```

Under the hood, hyperdom stores the intermediate value and the exception in the model's [meta](#meta) area. You can get the exception by calling `hyperdom.meta(model, field).error`.

### Components

Components are the basic building blocks of a Hyperdom application. The simplest component is an object that contains just a `render()` method. However, components can be used to interact with HTML at a more basic level, such as when using jQuery plugins, or to cache rendering output for performance.

There are two types of components in Hyperdom, with the only difference being where they store their state. The first type, and by far the most common, are **model components** and store their state in the model, or quite often, they _are_ the model. The point of **model components** is that the lifetime of their state is completely independent of whether those components are rendered or not. With **model components** the application is entirely in control of its state.

The other type are **view components** and keep their state in the view only, this means that if the component disappears from view, the state is lost and you'll have to rebuild it again when the component comes back into view. This is advantageous for some types of UI components that need to store state as the user interacts with them, like menus or tabs for example, but don't really affect the underlying model or state of the application itself.

Nevertheless, the API for view and model components is almost entirely the same. They both respond to the same rendering cycle events and have the same rendering and caching logic.

Components allow the following:

1. **Rendering VDOM** - essential to any Hyperdom application
2. **Model Loading** - asynchronously loading model resources
3. **HTML rendering events** - useful for low-level HTML hacking, including jQuery plugins
4. **VDOM caching** - useful in apps that render very large amounts of HTML

Components can implement these methods:

* `render()` - returns the VDOM representation of the component, called on each rendering cycle
* `onload()` (optional) - called when the component is first rendered, this can be used to setup the component, or load resources from AJAX. If this returns a promise, the view will be re-rendered again after the promise is resolved.
* `renderKey` (optional) - used for efficient diffing of virtual-dom elements, see [keys](#keys).
* `renderCacheKey()` (optional) - returns the cache key for the component. If the cache key hasn't changed since the last render, then the VDOM from the last render is used, otherwise, if the cache key has changed, `render()` is called for the latest VDOM.
* `onbeforeadd()` (optional) - called before the component is first added to the VDOM tree
* `onadd(element)` (optional) - called after the component is first added to the VDOM tree. `element` is the top-most HTML element of the component (the one returned from `render()`).
* `onbeforeupdate(element)` (optional) - called before the component is updated with new VDOM. `element` is the top-most HTML element of the component (the one returned from `render()`).
* `onupdate(element, oldElement)` (optional) - called after the component is updated with new VDOM. `element` is the top-most HTML element of the component (the one returned from `render()`). `oldElement` is the previous element represented by the component, and could be the same as `element`.
* `onbeforerender([element])` (optional) - called before the component is added to the VDOM tree, or updated with new VDOM. `element`, present only on update, is the top-most HTML element of the component (the one returned from `render()`).
* `onrender(element, [oldElement])` (optional) - called after the component is added to the VDOM tree, or updated with new VDOM. `element`, present only on update, is the top-most HTML element of the component (the one returned from `render()`). `oldElement` is the previous element represented by the component, and could be the same as `element`.

#### Model Components

Model components are simply just plain objects that implement `render()` and some of the methods above. They are rendered by simply placing them in the VDOM:

```jsx
const component = {
  render() {
    return <h1>model component</h1>
  }
}

<div>{component}</div>
```

#### View Components

View models are rendered by passing an object that implements `render()` to `hyperdom.viewComponent()`. You can also declare a class containing a `render()` method, and refer to it in JSX.

Using `hyperdom.viewComponent()`:

```jsx
<div>{
  hyperdom.viewComponent({
    render() {
      return <h1>view component</h1>
    }
  })
}</div>
```

Using a view component class in JSX:

```jsx
class MyComponent {
  constructor(properties, children) {
    this.title = properties.title
    this.children = children
  }

  render() {
    return <div>
      <h1>{this.title}</h1>
      {this.children}
    </div>
  }
}

<div>
  <MyComponent title="value">
    <div>child element</div>
  </MyComponent>
</div>
```

If you define fields on the object, these fields are present on each render: `this.name` is the latest value of `name`.

```jsx
<div>{
  hyperdom.viewComponent({
    name: name,
    render() {
      return <h1>view component {this.name}</h1>
    }
  })
}</div>
```

However, if you want to initialise some state once when the component is first rendered, then use it and update it during the lifetime of the component, use `onload()`, in this case `this.name` is the value of `name` when the component was first rendered.

```jsx
<div>{
  hyperdom.viewComponent({
    onload() {
      this.name = name
    },

    render() {
      return <h1>view component {this.name}</h1>
    }
  })
}</div>
```

### Caching

To cache the output from `render()`, return a non-undefined cache key from `renderCacheKey()`. This is useful if the component renders something large, for example, in the 10s of thousands of HTML nodes. For example, the following will only re-render when `this.version` changes:

```jsx
const component = {
  constructor () {
    this.version = 0
  }

  renderCacheKey () {
    return this.version
  }

  render () {
    return <div>
      ...
    </div>
  }
}
```

### Not Refreshing

By default the view will refresh after an event handler has run, however you can return `hyperdom.norefresh()` from an event handler to prevent this.

### Refreshing the view explicitly

Sometimes you want to refresh the view but not just after a UI event. For this, a component has a small handful of methods

* `component.refresh()` - can be called to queue up a refresh of the entire view. Calling this multiple times will only invoke one refresh, normally on the next animation frame.
* `component.refreshImmediately()` - can be called to refresh the view immediately.
* `component.refreshComponent()` - can be called to queue up a refresh of just this component.

### Refreshify

Sometimes you have an event handler in another framework (e.g. jQuery) that modifies the model. You want to refresh the page after that event handler has executed. You can use `hyperdom.html.refreshify(handler)` to return a new handler that refreshes the page after your event handler has run.

```js
const refreshHandler = h.refreshify(handler, [options]);
```

* `handler` - a function that handles some event, can return a promise.
* `options.refresh` - one of these values:
  * `true` - (the default) `refreshHandler` will refresh on return, and on promise fulfil if it returns a promise.
  * `false` - `refreshHandler` will be just `handler` so no refresh will happen if you call it.
  * `'promise'` - `refreshHandler` will only refresh if it returns a promise and only after the promise is fulfilled.
* `options.component` - only refresh this [component](#components)

### Binding

You can customise how bindings refresh the page by using `hyperdom.html.binding()`.

```js
const binding = hyperdom.html.binding(binding, options);
```

* `binding` - an array [model, 'property'], or a binding object {get(), set(value)}.
* `options` - options that are passed directly to [refreshify](#refreshify).

### Server-side Rendering

You can render HTML as text, for example on the server, by using `toHtml`:

```js
const hyperdom = require('hyperdom')
const h = hyperdom.html;
const toHtml = require('hyperdom/toHtml');

const vdom = h('html',
  h('head',
    h('link', {rel: 'stylesheet', href: '/style.css'})
  ),
  h('body',
    h('h1', 'hyperdom!')
  )
);

const html = toHtml(vdom);
console.log(html);
```

### Using with Typescript

All of the above functionality (with the exception of string bindings - e.g. `binding="this.name"`) is available and is reasonably well typed. Type definitions come bundled with hyperdom npm package - there is no need to install a separate types package.

In order to plug in hyperdom into the typescirpt tsx compilation, the following settings need to be present in the `compilerOptions` section of `tsconfig.json`:

```json
{
  "compilerOptions": {
    "lib": ["dom"],
    "jsx": "react",
    "jsxFactory": "hyperdom.jsx"
  }
}
```

#### Router based components

```typescript
import * as hyperdom from 'hyperdom'
import * as router from 'hyperdom/router'

const home = router.route('**')

class Thing extends hyperdom.RoutesComponent {
  public title = 'hello'

  public routes () {
    return [
      home({
        render: () => {
          return <div>{this.title}</div>
        },
      }),
    ]
  }
}
```

#### Render based components

```typescript
import * as hyperdom from 'hyperdom'

class Thing extends hyperdom.RenderComponent {
  public title = 'hello'

  public render () {
    return <div>{this.title}</div>
  }
}
```

## API

### Rendering the Virtual DOM

```js
const vdomFragment = hyperdom.html(selector, [attributes], children, ...);
```

* `vdomFragment` - a virtual DOM fragment. This will be compared with the previous virtual DOM fragment, and the differences applied to the real DOM.
* `selector` - (almost) any selector, containing element names, classes and ids: `tag.class#id`, or small hierarchies `pre code`.
* `attributes` - (optional) the attributes of the HTML element, may contain `style`, event handlers, etc.
* `children` - any number of children, which can be arrays of children, strings, or other vdomFragments.

#### The `binding` Attribute

Form input elements can be passed a `binding` attribute, which is expected to be either:

* An array with two items, the first being the model and second the field name, the third being an optional function that is called when the binding is set, for examle, you can initiate some further processing when the value changes.

  ```js
  [object, fieldName, setter(value)]
  ```

* `object` - an object
* `fieldName` - the name of a field on `object`
* `setter(value)` (optional) - a function called with the value when setting the model.

* An object with two methods, `get` and `set`, to get and set the new value, respectively.

  ```js
  {
    get: function () {
      return model.property;
    },
    set: function (value) {
      model.property = value;
    },
    options: {
      // options passed directly to `hyperdom.binding()`
    }
  }
  ```

#### Event Handler `on*` Attributes

Event handlers follow the same semantics as normal HTML event handlers. They have the same names, e.g. `onclick`, `onchange`, `onmousedown` etc. They are passed an `Event` object as the first argument.

When event handlers complete, the entire page's virtual DOM is re-rendered. Of course only the differences will by applied to the real DOM.

#### Promises

If the event handler returns a [Promise](https://promisesaplus.com/), then the view is re-rendered after the promise is fulfilled or rejected.

### Raw HTML

**Careful of script injection attacks!** Make sure the HTML is trusted or free of `<script>` tags.

```js
const vdomFragment = hyperdom.html.rawHtml(selector, [attributes], html);
```

* `selector` - (almost) any selector, containing element names, classes and ids. E.g. `tag.class#id`
* `attributes` - (optional) the attributes of the HTML element, may contain `style`, event handlers, etc.
* `html` - the element's inner HTML.

### Attaching to the DOM

```js
const attachment = hyperdom.append(element, component, [options]);
const attachment = hyperdom.replace(element, component, [options]);
```

* `attachment` - the instance of the hyperdom attachment, see below.
* `element` - any HTML element.
  * in the case of `hyperdom.append` the view is added as a child via `element.appendChild(view)`
  * in the case of `hyperdom.replace` the view replaces `element` via `element.parentNode.replaceChild(view, element)`
* `component` - a component: an object with a `.render()` method.
* `options`
  * `requestRender` - function that is passed a function that should be called when the rendering should take place. This is used to batch several render requests into one at the right time.

    For example, immediately:

    ```js
    function requestRender(render) {
      render();
    }
    ```

    Or on the next tick:

    ```js
    function requestRender(render) {
      setTimeout(render, 0);
    }
    ```

    Or on the next animation frame:

    ```js
    function requestRender(render) {
      requestAnimationFrame(render);
    }
    ```

    The default is `requestAnimationFrame`, falling back to `setTimeout`.

    For testing with [karma](http://karma-runner.github.io/) you should pass `setTimeout` because `requestAnimationFrame` is usually not called if the browser is out of focus for too long.

#### Detach

```js
attachment.detach();
```

Detaches the rendering engine from the DOM. Note that this doesn't remove the DOM, just prevents any hyperdom rendering events from modifying the DOM.

#### Remove

```js
attachment.remove();
```

Destroys the DOM, running any `onremove` handlers found in components. This will remove the DOM element.

## Performance

Hyperdom is usually very fast. It's based on [virtual-dom](https://github.com/Matt-Esch/virtual-dom) which has excellent performance, several times faster than React. See [these benchmarks](http://vdom-benchmark.github.io/vdom-benchmark/). However, if you have very large and interactive pages there are several strategies you can employ to speed things up.

* Consider only rendering a part of the page on certain events. For this, you can use a [component](#components) for the portion of the page you want to refresh, then return a component or an array of components from the event handler.
* Consider using [key](#keys) attributes for large dynamic lists of elements. Key attributes allow the diffing engine to spot differences inside lists of elements in some cases massively reducing the amount of DOM changes between renders.
* For form inputs with bindings, especially text inputs that can refresh the page on each keypress, consider using `hyperdom.html.binding()` to not refresh, or only refresh a component.
* Consider using a component with a `renderCacheKey()` method, to have finer control over when the component re-renders. You can reduce the total render time by not rendering portions of the page that don't change very often. When the `renderCacheKey()` result changes from one render to the next, the component will be re-rendered. When it doesn't change, the component won't be re-rendered.
* For parts of the page that don't ever change, you can pre-render the VDOM statically once and return the same VDOM on each render.

## Debugging

### Chrome Plugin

[https://chrome.google.com/webstore/detail/hyperdom-inpector/pggnlghflkefenflladfgkbcmfnjkcle](https://chrome.google.com/webstore/detail/hyperdom-inpector/pggnlghflkefenflladfgkbcmfnjkcle)

### File Names and Line Numbers

By using [transform-react-jsx-source](http://babeljs.io/docs/plugins/transform-react-jsx-source/) hyperdom will generate `data-file-name` and `data-line-number` attributes pointing to the file that generated the DOM.

```jsx
render() {
  return <h1>{this.title}</h1>
}
```

Will generate

```html
<h1 data-file-name="/full/path/to/file.jsx" data-line-number="40">Title</h1>
```

## Production Build

Debugging features and deprecation warnings can be turned off for production builds. Hyperdom source code checks the `NODE_ENV` environment constiable, and when set to `production` will turn these features off.

To make a production build with webpack, use `webpack -p`.

To make a production build with browserify, use [envify](https://github.com/hughsk/envify) and ensure `NODE_ENV=production`, for e.g. `browserify -t [ envify --NODE_ENV production  ] ...` and then use a minifier like [uglify](https://github.com/mishoo/UglifyJS2) to strip the disabled code.

## Common Errors

### Outside Render Cycle

> You cannot create virtual-dom event handlers outside a render function

This usually happens when you try to create virtual dom outside of a render function, which is ok, but if you try to add event handlers (`onclick` etc, or otherwise have attributes set to functions) then you'll see this error. This is because outside of the render cycle, there's no way for the event handlers to know which attachment to refresh - you could have several on a page at once.

Another cause of this error is if you have more than one instance of the hyperdom module loaded. This can occur if you have an NPM listing like this:

```
my-app@1.0.0 /Users/bob/dev/my-app
├── hyperdom@1.19.1
├── my-hyperdom-component@1.0.0
│ ├── hyperdom@1.19.1
```

With `my-hyperdom-component` depending on another `hyperdom`. Better to have `my-hyperdom-component` have a `peerDependency` on hyperdom, allowing it to use the `hyperdom` under `my-app`.

### Refresh Outside Render Cycle

> Please assign hyperdom.html.refresh during a render cycle if you want to use it in event handlers

This can occur if you use `hyperdom.html.refresh`, or `h.refresh` outside of a render cycle, for example, in an event handler or after a `setTimeout`. This is easily fixed, take a look at [Refresh Function](#refresh-function).

## Development

To get started:

```js
git clone https://github.com/featurist/hyperdom.git
cd hyperdom
npm install
```

Some of the scripts below assume that you have `node_modules/.bin` in your `$PATH`.

### Building

`hyperdom.js` and `hyperdom.min.js` can be build using `npm run build`, these can then be used in a `<script src="..."></script>` tag.

### Automated Testing

Hyperdom is almost 100% tested with karma and mocha. If you're planning to submit a pull request, we kindly ask that you write a test that demonstrates that it works. Without tests, we can't guarantee that your feature will continue to work as we refactor the codebase.

Tests can be found in [test/browser/hyperdomSpec.js](https://github.com/featurist/hyperdom/blob/master/test/browser/hyperdomSpec.js).

You can run karma by running `karma start`, it will watch your files and rerun the tests every time they change.

Server-side tests can be found in [test/server](https://github.com/featurist/hyperdom/tree/master/test/server). You can use `mocha test/server` to run these.

To run all tests use `npm test`.

### Manual Testing

As much as automated testing is amazing, it can never really replace manual or exploratory testing. You may want to experiment with an API or see how hyperdom performs in a real project, while making changes to hyperdom as you go.

To do this, first go to the `hyperdom` directory and run `npm link`. This will make hyperdom available to other projects.

Then inside your other project run `npm link hyperdom`. When your project has `require('hyperdom')` it will be referring to your local version.

You can then use [browserify](https://github.com/substack/node-browserify): `browserify myapp.js > myappbundle.js` or [watchify](https://github.com/substack/watchify): `watchify myapp.js -dvo myappbundle.js`, or [amok](https://github.com/caspervonb/amok): `amok --compiler babel --browser chrome myapp.js`, or [beefy](https://github.com/chrisdickinson/beefy): `beefy myapp.js`. [browserify-middleware](https://github.com/ForbesLindesay/browserify-middleware) is worth a look too.

Alternatively, if you just want to compile `hyperdom.js` and reference it in a `<script src="..."></script>`, you can by running `npm run prepublish` in the hyperdom directory.

## Sister Projects

* [hyperdom-ace-editor](https://github.com/featurist/hyperdom-ace-editor)
* [hyperdom-draggabilly](https://github.com/featurist/hyperdom-draggabilly)
* [hyperdom-medium-editor](https://github.com/featurist/hyperdom-medium-editor)
* [hyperdom-ckeditor](https://github.com/featurist/hyperdom-ckeditor)
* [hyperdom-semantic-ui](https://github.com/featurist/hyperdom-semantic-ui)
* [hyperdom-sortable](https://github.com/featurist/hyperdom-sortable)
* [hyperdom-zeroclipboard](https://github.com/featurist/hyperdom-zeroclipboard)

## We're Hiring!

Join our remote team and help us build amazing software. Check out [our career opportunities](https://www.featurist.co.uk/careers/).
