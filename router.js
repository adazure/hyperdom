var plastiq = require('.');
var h = plastiq.html;

var routism = require('routism');

var loadingModel;
var state;

router.page = function () {
  if (arguments.length == 3) {
    var url = arguments[0];
    var loadModel = arguments[1];
    var render = arguments[2];

    return {
      url: url,
      render: function (params) {
        if (!loadingModel) {
          if (state) {
            loadingModel = state;
          } else {
            loadingModel = loadModel(params);
          }
        }
        return h.promise(loadingModel, {
          fulfilled: function (model) {
            loadingModel = undefined;
            history.replaceState(model, undefined, location.href);
            return render(model);
          }
        });
      }
    };
  } else if (arguments.length == 2) {
    var url = arguments[0];
    var render = arguments[1];

    return {
      url: url,
      render: render
    };
  }
};

function makeHash(paramArray) {
  var params = {};

  paramArray.forEach(function (param) {
    params[param[0]] = param[1];
  });

  return params;
}

function router() {
  var routes = [];

  for (var n = 0; n < arguments.length; n++) {
    var page = arguments[n];
    routes.push({pattern: page.url, route: page});
  }

  var compiledRoutes = routism.compile(routes);
  var route = compiledRoutes.recognise(location.pathname);

  if (route) {
    return h.window(
      {
        onpopstate: function (ev) {
          state = ev.state;
        }
      },
      route.route.render(makeHash(route.params))
    );
  } else {
    return h('div', '404');
  }
};

router.link = function (url, vdom) {
  return h('a', {
    href: url,
    onclick: function () {
      state = undefined;
      window.history.pushState(undefined, undefined, url);
      return false;
    }
  }, vdom);
}

module.exports = router;
