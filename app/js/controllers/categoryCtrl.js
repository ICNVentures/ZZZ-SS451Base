four51.app.controller('CategoryCtrl', ['$routeParams', '$sce', '$scope', '$451', 'Category', 'Product', 'Nav', 'User',
function ($routeParams, $sce, $scope, $451, Category, Product, Nav, User) {

	$scope.productLoadingIndicator = true;
	$scope.settings = {
		currentPage: 1,
		pageSize: 40
	};
	$scope.trusted = function(d){
		if(d) return $sce.trustAsHtml(d);
	}

	function _search() {
		$scope.searchLoading = true;
		Product.search($routeParams.categoryInteropID, null, null, function (products, count) {
			$scope.products = products;
			$scope.productCount = count;
			$scope.productLoadingIndicator = false;
			$scope.searchLoading = false;
		}, $scope.settings.currentPage, $scope.settings.pageSize);
	}

	$scope.$watch('settings.currentPage', function(n, o) {
		if (n != o || (n == 1 && o == 1))
			_search();
	});

	if ($routeParams.categoryInteropID) {
	    $scope.categoryLoadingIndicator = true;
        Category.get($routeParams.categoryInteropID, function(cat) {
            $scope.currentCategory = cat;
	        $scope.categoryLoadingIndicator = false;
        });
    }
	else if($scope.tree){
	    if ($scope.user.CustomFields.length == 0)
	    {
    	    var hf = window.location.href.split('/');
    	    var id = hf[3] + '9999';
    	    $routeParams.categoryInteropID = id;
    	    $scope.categoryLoadingIndicator = true;
            Category.get(id, function(cat) {
                $scope.currentCategory = cat;
    	        $scope.categoryLoadingIndicator = false;
            });
	    }
		//$scope.currentCategory = {SubCategories:$scope.tree};
	}
    else
    {
    	User.get(function (user) {
            if (user.CustomFields.length === 0)
            {
        	    var hf = window.location.href.split('/');
        	    window.location.href += "/" + hf[3] + '9999';
            }
    });
    
    }

	$scope.$on("treeComplete", function(data){
		if (!$routeParams.categoryInteropID) {
			$scope.currentCategory ={SubCategories:$scope.tree};
		}
	});

    // panel-nav
    $scope.navStatus = Nav.status;
    $scope.toggleNav = Nav.toggle;
	$scope.$watch('sort', function(s) {
		if (!s) return;
		(s.indexOf('Price') > -1) ?
			$scope.sorter = 'StandardPriceSchedule.PriceBreaks[0].Price' :
			$scope.sorter = s.replace(' DESC', "");
		$scope.direction = s.indexOf('DESC') > -1;
	});
}]);