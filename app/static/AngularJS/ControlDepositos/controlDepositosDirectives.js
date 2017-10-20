var ctrDepPath = 'AngularJS/ControlDepositos/';

registrationModule.directive('ctrdepCarteraFilter', function() {
    return {
        restrict: 'E',
        templateUrl: ctrDepPath + 'controlDepositosCarteraFilter.html'
    };
}).directive('ctrdepCarteraFilterUser', function() {
    return {
        restrict: 'E',
        templateUrl: ctrDepPath + 'controlDepositosCarteraFilterUser.html'
    };
}).directive('ctrdepReferenciaDetail', function() {
    return {
        restrict: 'E',
        templateUrl: ctrDepPath + 'controlDepositosReferenciaDetail.html'
    };
}).directive('ctrdepReferenciaTableHeraldo', function() {
    return {
        restrict: 'E',
        templateUrl: ctrDepPath + 'controlDepositosReferenciaTableHeraldo.html'
    };
});


