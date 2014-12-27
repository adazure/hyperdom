# plastiq

Plastiq is based on a simple architecture for single page applications:

1. There is one model for the whole page, this model is stateful, object-oriented and free of framework elements.
2. The view is re-rendered fresh each time the model changes, but only the differences are applied to the DOM.

This architecture is largely influenced by Facebook's [React](http://facebook.github.io/react/) and uses [virtual-dom](https://github.com/Matt-Esch/virtual-dom) for the DOM patching.

## Why?

React.js carried inside it an amazing idea: re-render the page anew every time the model changes, but only apply the differences since the last render. This is not only very efficient, but also affords a very simple programming model for user interfaces. The user interface is created from a function that takes only the model as input - it's essentially purely functional.

However, React's implementation of this idea is somewhat more complicated than that simple idea. The component model, with its many lifecycle events such as `componentDidMount` and `componentWillReceiveProps` adds to a confusing landscape of options and implementation choices. Furthermore, each React component carries two kinds of state: `props` and `state`. Many people are confused as to where to keep the model, in the `props` or in the `state`? If you have several components in the page, we have several different places to store state, how do we reconcile them?

Other frameworks such as [mithril](http://lhorie.github.io/mithril/) and [mercury](https://github.com/Raynos/mercury) try to get back to a simpler component model, but force the framework into the model for event handling and form input binding.

Plastiq tries to be much simpler: there is no "component model", but components are easily created by extracting or creating a new render function. There is only one model to store state. The model can easily be bound onto form inputs, but without forcing the framework into the model.

# Example

    var plastiq = require('plastiq');
    var h = plastiq.html;
    var bind = plastiq.bind;

    function render(model) {
      return h('div',
        h('label', "what's your name?"),
        h('input', {type: 'text', model: bind(model, 'name')}),
        h('span', 'hi ', model.name)
      );
    }

    plastiq.attach(document.body, render, {name: ''});

Try it on [requirebin](http://requirebin.com/?gist=1980d666f79b4a78f035).
