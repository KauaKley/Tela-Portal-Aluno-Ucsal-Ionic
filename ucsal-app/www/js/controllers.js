angular
  .module("ucsalApp")
  .controller("LoginCtrl", function ($scope, $state, AuthService) {
    $scope.dados = {};
    $scope.entrar = function (form) {
      if (form.$invalid) return;
      if (AuthService.entrar($scope.dados)) {
        $state.go("portal.mural");
      } else {
        $scope.erro = "Matrícula ou senha inválida.";
      }
    };
  })
  .controller(
    "MenuCtrl",
    function ($scope, $state, $ionicHistory, AuthService) {
      $scope.sair = function () {
        AuthService.sair();
        $ionicHistory.clearHistory();
        $state.go("login");
      };
    },
  )
  .controller("MuralCtrl", function ($scope, $state, NoticiasService) {
    $scope.publicacoes = NoticiasService.listar();
    $scope.ler = function (id) {
      $state.go("portal.detalhe", { id: id });
    };
  })
  .controller("DetalheCtrl", function ($scope, $stateParams, NoticiasService) {
    $scope.publicacao = NoticiasService.buscar($stateParams.id);
  })
  .controller(
    "PerfilCtrl",
    function ($scope, $ionicPopup, sessao, AlunoService) {
      $scope.perfil = angular.copy(sessao);
      $scope.salvar = function (form) {
        if (form.$invalid) return;
        AlunoService.salvar(sessao.matricula, $scope.perfil);
        $ionicPopup.alert({
          title: "Cadastro atualizado",
          template: "Seus dados foram salvos.",
        });
      };
    },
  )
  .controller(
    "FinanceiroCtrl",
    function ($scope, $ionicPopup, FinanceiroService) {
      $scope.semestres = FinanceiroService.semestres();
      $scope.filtro = { semestre: $scope.semestres[0] };
      $scope.parcelas = FinanceiroService.listar();
      $scope.copiar = function (codigo) {
        function mostrarCodigo() {
          $ionicPopup.alert({
            title: "Copie a linha digitável",
            template:
              '<input aria-label="Linha digitável" readonly value="' +
              codigo +
              '">',
          });
        }
        if (!navigator.clipboard) {
          mostrarCodigo();
          return;
        }
        navigator.clipboard.writeText(codigo).then(
          function () {
            $scope.$evalAsync(function () {
              $ionicPopup.alert({
                title: "Código copiado",
                template: "A linha digitável foi copiada.",
              });
            });
          },
          function () {
            $scope.$evalAsync(mostrarCodigo);
          },
        );
      };
    },
  );
