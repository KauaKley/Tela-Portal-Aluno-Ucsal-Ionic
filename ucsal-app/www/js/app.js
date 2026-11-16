angular
  .module("ucsalApp", ["ionic"])
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $stateProvider
      .state("login", {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: "LoginCtrl",
      })
      .state("portal", {
        abstract: true,
        url: "/portal",
        templateUrl: "templates/menu.html",
        controller: "MenuCtrl",
        resolve: {
          sessao: function (AuthService, $q) {
            return AuthService.atual() || $q.reject("semSessao");
          },
        },
      })
      .state("portal.mural", {
        url: "/mural",
        templateUrl: "templates/mural.html",
        controller: "MuralCtrl",
      })
      .state("portal.detalhe", {
        url: "/mural/:id",
        templateUrl: "templates/detalhe.html",
        controller: "DetalheCtrl",
      })
      .state("portal.perfil", {
        url: "/perfil",
        templateUrl: "templates/perfil.html",
        controller: "PerfilCtrl",
      })
      .state("portal.financeiro", {
        url: "/financeiro",
        templateUrl: "templates/financeiro.html",
        controller: "FinanceiroCtrl",
      });
    $urlRouterProvider.otherwise("/login");
  })
  .run(function ($rootScope, $state) {
    $rootScope.$on(
      "$stateChangeError",
      function (event, destino, params, origem, anteriores, erro) {
        if (erro === "semSessao") $state.go("login");
      },
    );
  });
