// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'backand'])

  .config(function (BackandProvider) {

    BackandProvider.setAppName('appans');
    BackandProvider.setAnonymousToken('6a75ae04-49f5-468e-b10e-c5a2e97717c9');


  })


  .controller('AppCtrl', function ($scope,
    TodoService,
    ProtocoloService,
    PreferenciaService,
    BeneficiarioService,
    ReclamacaoService,
    $ionicPopup,
    $timeout,
    $ionicLoading,
    $state,
    $window) {


    //testando conexão com banco de dados

    $scope.todos = [];
    $scope.reclamacao = {};
    $scope.input = {};
    $scope.input2 = {};
    $scope.input3 = {};
    $scope.input4 = {};
    $scope.cancelar = false;
    $scope.acessibilidade = false;

    function getAllTodos() {
      TodoService.getTodos().then(function (result) {
        $scope.todos = result.data.data;
      });
    }

    $scope.addTodo = function () {
      TodoService.addTodo($scope.input).then(function (result) {
        $scope.input = {};
        getAllTodos();
      });

    }

    $scope.addBeneficiario = function () {
      console.log("addBeneficiario");
      BeneficiarioService.addBeneficiario($scope.input4).then(function (result) {
        $scope.input = {};
        $window.location.href = '../page/telaBeneficiario.html';
        //getAllTodos();
      });

      function getReclamacao() {
        ReclamacaoService.getReclamacaoExemplo().then(function (result) {
          //$scope.reclamacao = result.data;
          $scope.reclamacao = "AAA";
        });
      }

    }


    $scope.deleteTodo = function (id) {
      TodoService.deleteTodo(id).then(function (result) {
        getAllTodos();
      });


    }

    $scope.teste = function () {
      console.log("teste");
    }


    //adicionando status ao protocolo
    $scope.addStatus = function () {

      ProtocoloService.addStatus($scope.input2.status).then(function (result) {
        $scope.status = {};
        //getAllStatus();
      });


    }

    //adicionando preferencias ao app
    $scope.updatePreferencia = function () {

      PreferenciaService.updatePreferencia($scope.acessibilidade).then(function (result) {
      });


    }

    //navegando para perfil
    // $scope.irPerfil = function () {
    //   $urlRouterProvider.otherwise('/perfil')
    // };

    $scope.showPopup = function () {
      $scope.data = {};


      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template:
        '<img class="centralizado" src="../img/icone1.jpg" alt="Smiley face" height="200" width="200">' +
        '<br/><br/>' +
        '<h2>Deseja usar a versão acessível?</h2>' +
        '<br/><br/>',
        // '<input type="password" ng-model="data.wifi">' +
        // '<input type="text" ng-model="input2.status">',
        // title: 'Enter Wi-Fi Password',
        // subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
          {
            text: 'Não',
            onTap: function (e) {
              $scope.cancelar = true;
              $scope.acessibilidade = false;
              $scope.input3.acessibilidade = false;

              return $scope.input3.acessibilidade;
            }

          },
          {
            text: '<b>Sim</b>',
            type: 'button-positive',
            onTap: function (e) {
              // if (!$scope.input2.status) {
              //   console.log("vazio");
              //   //don't allow the user to close unless he enters wifi password
              //   e.preventDefault();
              // } else {
              $scope.cancelar = false;
              $scope.acessibilidade = true;
              $scope.input3.acessibilidade = true;

              return $scope.input3;
              // return $scope.input2;
              // }
            }
          }
        ]
      });

      myPopup.then(function (res) {
        if ($scope.cancelar == false) {
          $scope.acessibilidadeSim = true;
          updatePreferencia(res);
          $window.location.href = '../page/telaPerfil.html';
          //  $urlRouterProvider.otherwise('/perfil')
        }

        else {
          $scope.acessibilidadeSim = false;
          $window.location.href = '../page/telaPerfil.html';
        }
        console.log('Tapped!', res);
      });

      $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 300000);
    };

  })


  .service('TodoService', function ($http, Backand) {

    var baseUrl = '/1/objects/';
    var objectName = 'todos/';


    function getUrl() {
      return Backand.getApiUrl() + baseUrl + objectName;
    }

    function getUrlForId(id) {
      return getUrl() + id;
    }


    getTodos = function () {
      return $http.get(getUrl());
    };

    addTodo = function (todo) {
      return $http.post(getUrl(), todo);
    };

    deleteTodo = function (id) {
      return $http.delete(getUrlForId(id));
    };

    return {
      getTodos: getTodos,
      addTodo: addTodo,
      deleteTodo: deleteTodo
    }


  })


  .service('ProtocoloService', function ($http, Backand) {

    var baseUrl = '/1/objects/';
    var objectName = 'protocolo/';


    function getUrl() {
      return Backand.getApiUrl() + baseUrl + objectName;
    }

    function getUrlForId(id) {
      return getUrl() + id;
    }


    // getTodos = function(){
    //   return $http.get(getUrl());
    // };

    addStatus = function (todo) {
      return $http.post(getUrl(), todo);
    };

    // deleteTodo = function(id){
    //   return $http.delete(getUrlForId(id));
    // };

    return {
      // getTodos: getTodos,
      addStatus: addStatus
      // deleteTodo: deleteTodo
    }


  })


  .service('PreferenciaService', function ($http, Backand) {

    var baseUrl = '/1/objects/';
    var objectName = 'preferenciasApp/';


    function getUrl() {
      return Backand.getApiUrl() + baseUrl + objectName;
    }

    function getUrlForId(id) {
      return getUrl() + id;
    }


    // getTodos = function(){
    //   return $http.get(getUrl());
    // };
    addPreferencia = function (object) {
      return $http.post(getUrl(), object);
    };

    updatePreferencia = function (object) {
      var id = $http.get(getUrlForId(1));

      if (id == undefined || id == null || id == "") {
        addPreferencia(object);
        // return $http.post(getUrl(), object);
      }
      else {
        return $http.put(getUrlForId(1), object);
      }


    };

    // deleteTodo = function(id){
    //   return $http.delete(getUrlForId(id));
    // };

    return {
      // getTodos: getTodos,
      updatePreferencia: updatePreferencia
      // deleteTodo: deleteTodo
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


    // getTodos = function(){
    //   return $http.get(getUrl());
    // };
    addBeneficiario = function (object) {
      return $http.post(getUrl(), object);
    };

    return {
      // getTodos: getTodos,
      addBeneficiario: addBeneficiario
      // deleteTodo: deleteTodo
    }


  })

  .service('ReclamacaoService', function ($http, Backand) {

    var baseUrl = '/1/objects/';
    var objectName = 'reclamacao/';


    function getUrl() {
      return Backand.getApiUrl() + baseUrl + objectName;
    }

    function getUrlForId(id) {
      return getUrl() + id;
    }


    getReclamacaoExemplo = function () {
      return $http.get(getUrlForId(1));
    };
    // addBeneficiario = function (object) {
    //   return $http.post(getUrl(), object);
    // };

    return {
      // getTodos: getTodos,
      getReclamacaoExemplo: getReclamacaoExemplo
      // deleteTodo: deleteTodo
    }


  });  