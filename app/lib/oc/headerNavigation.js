angular.module('OrderCloud-HeaderNavigation', []);
angular.module('OrderCloud-HeaderNavigation')
    .directive('headernavigation', headernavigation)
    .controller('HeaderNavigationCtrl', HeaderNavigationCtrl)
;

function headernavigation() {
    return {
        restrict: 'E',
        template: template
    };

    function template() {
        return [
            '<section class="header-navigation">',
            '<div class="row">',
            '<div class="col-xs-12 col-sm-6 pull-right">',
            '<ul>',
            '<li><a href="admin">My Account</a></li>',
            '<li><span style="color: #000;">&nbsp;&bull;&nbsp;</span></li>',
            '<li><a href="order">Orders</a></li>',
            '<li><span style="color: #000;">&nbsp;&bull;&nbsp;</span></li>',
            '<li><a href="cart">Cart&nbsp;',
            '<span ng-if="currentOrder.LineItems.length" ng-bind="cartCount" class="badge"></span>',
            '</a></li>',
            '<li><span style="color: #000;">&nbsp;&bull;&nbsp;</span></li>',
            '<li><a ng-click="Logout()">Log Off</a></li>',
            '</ul>',
            '</div>',
            '</div>',
            '</section>'
        ].join('');
    }
}

HeaderNavigationCtrl.$inject = ['$scope','User'];
function HeaderNavigationCtrl($scope, User) {

    $scope.Logout = function(){
        User.logout();
        if ($scope.isAnon) {
            $location.path("/catalog");
            User.login(function(user) {
                $scope.user = user;
            });
        }
    };

}
