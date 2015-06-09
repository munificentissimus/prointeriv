/**
 * MODULO RESPONSAVEL PELA LOGICA DE REGISTRO DE UM NOVO ALUNO (USUARIO) NA APP.
*/
module.exports = function (Aluno){
	//Modulo de criptografia
	var crypto = require("crypto");
	
	//Registra um aluno
	var registrarAluno = function( matricula , nome , senha , error){
		
		//Verifica se o usuario ja eh registrado
		var criterio = { matricula : matricula };
		Aluno.find( criterio , function(err, aluno){
			//Aconteceu um erro buscando o aluno
			if (err){
    			error(err);
  			}
  			
  			if (aluno){
  				var erroDuplicidade = new Error();
				erroDuplicidade.tipoErro = "duplicidade";
				erroDuplicidade.messagem = "Aluno já matriculado";
				error(erroDuplicidade);
  			}
		});
		
		//Técnica de segurança - incluir um dificultador antes de encriptar
		var dificultador = 'munificentissimus';

		//Cria o objeto aluno à partir do Esquema (modelo) mongoose	
		var aluno = new Aluno(
			{"matricula" : matricula
			, "nome"     : nome 
			, "senha"    : crypto.createHash('sha256')
								 .update(senha + dificultador ,'utf-8')
								 .digest("hex") });
	
		//Aciona a funcao salvar de aluno
		aluno.save(function(err){
  			error(err); 
		}); 
	};
	
	return {
		registrarAluno : registrarAluno
	};
};