// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('beneficiarioModulo', ['ionic', 'backand'])

  .config(function (BackandProvider) {

    BackandProvider.setAppName('appans');
    BackandProvider.setAnonymousToken('6a75ae04-49f5-468e-b10e-c5a2e97717c9');


  })

  .controller('BeneCtrl', function ($scope,
    BeneficiarioService) {


    //testando conexão com banco de dados

    $scope.beneficiario = {};

        //criar login
    $scope.addBeneficiario = function () {
      BeneficiarioService.addBeneficiario($scope.beneficiario).then(function (result) {
        $scope.beneficiario = {};
        //getAllTodos();
      });

    }

    })

.service('BeneficiarioService', function ($http, Backand) {

    var baseUrl = '/1/objects/';
    var objectName = 'beneficiario/';


    function getUrl() {
      return Backand.getApiUrl() + baseUrl + objectName;
    }

    function getUrlForId(id) {
      return getUrl() + id;
    }


    // getTodos = function () {
    //   return $http.get(getUrl());
    // };

    addBeneficiario = function (todo) {
      return $http.post(getUrl(), todo);
    };

    // deleteTodo = function (id) {
    //   return $http.delete(getUrlForId(id));
    // };

    return {
      // getTodos: getTodos,
      addBeneficiario: addBeneficiario
      // deleteTodo: deleteTodo
    }


  })
    