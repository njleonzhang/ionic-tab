(function (doc, cssText) {
    var styleEl = doc.createElement("style");
    doc.getElementsByTagName("head")[0].appendChild(styleEl);
    if (styleEl.styleSheet) {
        if (!styleEl.styleSheet.disabled) {
            styleEl.styleSheet.cssText = cssText;
        }
    } else {
        try {
            styleEl.innerHTML = cssText;
        } catch (ignore) {
            styleEl.innerText = cssText;
        }
    }
}(document, "/**\n" +
" * Created by leon on 16/3/15.\n" +
" */\n" +
"\n" +
".ion-saimple-tab .button-bar div{\n" +
"    background: #F8F8F8;\n" +
"}\n" +
"\n" +
".ion-saimple-tab .button-bar div.active{\n" +
"    background: white;\n" +
"    color: #0088CC;\n" +
"}\n" +
"\n" +
".ion-saimple-tab .button-bar > .button:first-child, .button-bar > .button:last-child{\n" +
"    border-radius: 0;\n" +
"}\n" +
"\n" +
".ion-saimple-tab .button.active, .button.activated{\n" +
"    box-shadow: none !important;\n" +
"}"));

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabSet.html',
    '<div class=ion-simple-tab><div class="button-bar bar-light"><div class=button ng-repeat="tab in tabset.tabs" ng-class="{\'active\': tab.active}" ng-click=tabset.select(tab)>{{tab.heading}}</div></div><ng-transclude></ng-transclude></div>');
}]);
})();

/**
 * Created by leon on 16/3/15.
 */


(function () {
  'use strict';

  angular.module('ionSimpleTab', ['ionic', 'templates'])

})();
/**
 * Created by leon on 16/3/15.
 */

(function () {

  angular.module('ionSimpleTab')

    .directive('ionSimpleTabset', function ($ionicScrollDelegate, $timeout) {
      return {
        restrict: 'AE',             // the directive can be element or attribute
        transclude: true,           // any content included between the <BSY-tabset></BSY-tabset> HTML will be inserted
                                    // into the ng-transclude div we specified in the template string.
        scope: {},                  // scope is a object, tab directive's scope is isolated.
        templateUrl: 'tabSet.html',
        // the template
        bindToController: true,     // any values passed into the directive's scope via the scope property are
                                    // automatically accessible in the controller using 'this'
        controllerAs: 'tabset',     // allows us to bind properties directly to the controller object
                                    // using 'this' and have them accessible via tabset in the template.
        controller: function () {   // angular controller for the directive
          var self = this;
          self.tabs = [];

          self.addTab = function addTab(tab) {
            self.tabs.push(tab);

            if (self.tabs.length === 1) {
              tab.active = true;
            }
          };

          self.select = function (selectedTab) {
            angular.forEach(self.tabs, function (tab) {
              if (tab.active && tab !== selectedTab) {
                tab.active = false;
              }
            });

            selectedTab.active = true;

            $timeout(function () {
              $ionicScrollDelegate.resize();
            }, 0);
          }
        }
      }
    })

    .directive('ionSimpleTab', function () {
      return {
        restrict: 'AE',
        transclude: true,
        template: '<div class="tab-panel" ng-show="active" ng-transclude></div>',
        scope: {
          heading: '@'    // bind heading in scope to attribute 'heading' on the DOM
        },
        require: '^ion-simple-tabset',   // searches for the controller 'tabset' on its parents
        link: function (scope, elem, attr, tabsetCtrl) {
          scope.active = false;
          tabsetCtrl.addTab(scope);
        }
      }
    });
})();
