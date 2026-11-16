angular
  .module("ucsalApp")
  .factory("AuthService", function (AlunoService) {
    var credenciais = [{ matricula: "20261001", senha: "123456" }];
    var aluno = null;
    return {
      entrar: function (dados) {
        var acesso = credenciais.find(function (item) {
          return (
            item.matricula === dados.matricula && item.senha === dados.senha
          );
        });
        aluno = acesso ? AlunoService.buscar(acesso.matricula) : null;
        return aluno;
      },
      atual: function () {
        return aluno;
      },
      sair: function () {
        aluno = null;
      },
    };
  })
  .factory("AlunoService", function () {
    var alunos = {
      20261001: {
        nome: "Mariana Santos",
        matricula: "20261001",
        curso: "Engenharia de Software",
        email: "mariana@example.com",
        telefone: "(71) 99999-1234",
        cep: "40000-000",
        rua: "Rua das Flores, 120",
        bairro: "Federação",
        cidade: "Salvador",
      },
    };
    return {
      buscar: function (matricula) {
        return alunos[matricula];
      },
      salvar: function (matricula, dados) {
        ["email", "telefone", "cep", "rua", "bairro", "cidade"].forEach(
          function (campo) {
            alunos[matricula][campo] = dados[campo];
          },
        );
      },
    };
  })
  .factory("NoticiasService", function () {
    var publicacoes = [
      {
        id: "rematricula",
        titulo: "Rematrícula para 2026.2",
        data: "15/07/2026",
        categoria: "Notícia",
        imagem:
          "img/rematricula.png",
        texto:
          "No calendário fictício, a rematrícula vai de 20 a 31 de julho. Confira seus contatos no portal antes de iniciar o processo.",
      },
      {
        id: "semoc",
        titulo: "Semana de Mobilização Científica",
        data: "19/10/2026",
        categoria: "Evento",
        imagem:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        texto:
          "A programação simulada da Semoc reúne oficinas e apresentações de trabalhos acadêmicos no campus Pituaçu.",
      },
    ];
    return {
      listar: function () {
        return publicacoes;
      },
      buscar: function (id) {
        return publicacoes.find(function (item) {
          return item.id === id;
        });
      },
    };
  })
  .factory("FinanceiroService", function () {
    var parcelas = [
      {
        semestre: "2025.2",
        mes: "Agosto",
        vencimento: "10/08/2025",
        valor: 820,
        paga: true,
      },
      {
        semestre: "2025.2",
        mes: "Setembro",
        vencimento: "10/09/2025",
        valor: 820,
        paga: true,
      },
      {
        semestre: "2026.1",
        mes: "Fevereiro",
        vencimento: "10/02/2026",
        valor: 850,
        paga: true,
      },
      {
        semestre: "2026.1",
        mes: "Março",
        vencimento: "10/03/2026",
        valor: 850,
        paga: true,
      },
      {
        semestre: "2026.2",
        mes: "Agosto",
        vencimento: "10/08/2026",
        valor: 890,
        paga: true,
      },
      {
        semestre: "2026.2",
        mes: "Setembro",
        vencimento: "10/09/2026",
        valor: 890,
        paga: false,
        codigo: "00000.00000 00000.000000 00000.000001 0 00000000000000",
      },
      {
        semestre: "2026.2",
        mes: "Outubro",
        vencimento: "10/10/2026",
        valor: 890,
        paga: false,
        codigo: "00000.00000 00000.000000 00000.000002 0 00000000000000",
      },
    ];
    return {
      listar: function () {
        return parcelas;
      },
      semestres: function () {
        return Array.from(
          new Set(
            parcelas.map(function (item) {
              return item.semestre;
            }),
          ),
        )
          .sort()
          .reverse();
      },
    };
  });
