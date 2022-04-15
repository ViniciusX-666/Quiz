/*VARIAVEIS DE CONTROLE DO JOGO*/
//var qtdPerguntas = 3;
let perguntasFeitas = [];

//PERGUNTAS DO JOGO
const perguntas = [
  //PERGUNTA 0
  {
    pergunta:
      "Qual desssas perguntas não é considerada uma linguagem de programação?",
    respostas: ["PHP", "Javascript", "C++", "HTML"],
    correta: "resp3",
  },
  //PERGUNTA 1
  {
    pergunta: "Em que ano o Brasil foi descorberto?",
    respostas: ["1498", "1500", "1375", "1828"],
    correta: "resp1",
  },
  //PERGUNTA 2
  {
    pergunta: "O que significa a sigla HTML?",
    respostas: [
      "Hyper Tonto Maluco Legal",
      "Hyper Text Markup Language",
      "Hey Trade More Language",
      "Hyper Text Mark Language",
    ],
    correta: "resp1",
  },
  //PERGUNTA 3
  {
    pergunta: "Qual desssas perguntas é considerada uma linguagem de marcação?",
    respostas: ["HTML", "Javascript", "C++", "PHP"],
    correta: "resp0",
  },
];
var qtdPerguntas = perguntas.length - 1;
gerarPergunta(qtdPerguntas);

function gerarPergunta(maxPerguntas) {
  //GERAR UM NUMERO ALETORIO
  //toFixed - converte um numero em uma string, arredondando para um numero especificado de decimais
  //Marth.ramdom() - gera número aleatório
  let aleatorio = (Math.random() * maxPerguntas).toFixed();
  //CONVERTE PARA NUMERO
  aleatorio = Number(aleatorio);
  //MOSTRA NO CONSOLE QUAL FOI A PERGUNTA SORTEADA
  console.log("A pergunta sorteada foi a " + aleatorio);

  //VERIFICAR SE A PERGUNTA FOI FEITA
  if (!perguntasFeitas.includes(aleatorio)) {
    //COLOCAR COMO PERGUNTA FEITA
    perguntasFeitas.push(aleatorio);

    //PREENCHER O HTML COM OS DADOS DA QUESTÃO SORTEADA
    var p_selecionada = perguntas[aleatorio].pergunta;
    console.log(p_selecionada);

    //ALIMENTA A PERGUNTA VINDA DO SORTEIO
    $("#pergunta").html(p_selecionada);
    $("#pergunta").attr("data-indice", aleatorio);

    //COLOCA AS RESPOSTAS
    for (var i = 0; i < 4; i++) {
      $("#resp" + i).html(perguntas[aleatorio].respostas[i]);
    }

    //EMBARALHAR AS RESPOSTAS
    var pai = $("#respostas");
    var botoes = pai.children(); //children() - pega o que ta dentro do pai

    for (var i = 1; i < botoes.length; i++) {
      pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
      //pai.append(botoes.eq(Math.floor(Marth.random() * botoes.length)));
    }
  } else {
    //SE A PERGUNTA JA FOR FEITA
    console.log("A pergunta ja foi feita. Sorteando de novo");
    if (perguntasFeitas.length < qtdPerguntas + 1) {
      return gerarPergunta(maxPerguntas);
    } else {
      console.log("Acabaram as perguntas!");

      $("#quiz").addClass("oculto");
      $("#mensagem").html("Parabens você acertou todas as perguntas!");
      $("#status").removeClass("oculto");
    }
  }
  $(".resposta").click(function () {
    //PERCORRER TODAS AS RESPOSTAS E DESMARCCA A CLASSE SELECIONADA
    //each - percorre todos os arrays com a classe .resposta
    $(".resposta").each(function () {
      if ($(this).hasClass("selecionada")) {
        $(this).removeClass("selecionada");
      }
    });
    //ADICIONA CLASSE SELECIONADA
    $(this).addClass("selecionada");
  });

  $("#confirm").click(function () {
    //PEGAR INDICE DA PERGUNTA
    var indice = $("#pergunta").attr("data-indice");
    //QUAL É A RESPOSTA CERTA
    var respCerta = perguntas[indice].correta;

    //QUAL FOI A RESPOSTA QUE O USUARIO SELECIONOU
    $(".resposta").each(function () {
      if ($(this).hasClass("selecionada")) {
        var resposEscolhida = $(this).attr("id");

        if (respCerta == resposEscolhida) {
          alert("Aceeeeeertou Miseraveeel");
          proximaPergunta();
        } else {
          alert("Errrrroooououuuuuu!");
          $("#" + respCerta).addClass("correta");
          $("#" + resposEscolhida).removeClass("selecionada");
          $("#" + resposEscolhida).addClass("errada");
            //4s para dar game over
          setTimeout(function () {
            newGame();
          }, 4000);
        }
      }
    });
  });

  function newGame() {
    perguntasFeitas = [];
    $(".resposta").each(function () {
      if ($(this).hasClass("selecionada")) {
        $(this).removeClass("selecionada");
      }
      if ($(this).hasClass("correta")) {
        $(this).removeClass("correta");
      }
      if ($(this).hasClass("errada")) {
        $(this).removeClass("errada");
      }
    });
    gerarPergunta(qtdPerguntas);
    $("#quiz").addClass("oculto");
    $("#status").removeClass("oculto");
  }

  function proximaPergunta() {
    $(".resposta").each(function () {
      if ($(this).hasClass("selecionada")) {
        $(this).removeClass("selecionada");
      }
    });
    gerarPergunta(qtdPerguntas);
  }

  function gameOver() {
    $("#quiz").addClass("oculto");
    $("#mensagem").html("Game Over!");
    $("#status").removeClass("oculto");
  }

  $("#novoJogo").click(function () {
    newGame();
  });
}
