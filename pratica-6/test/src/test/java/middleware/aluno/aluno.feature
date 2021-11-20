Feature: test script for 'aluno'

Background:
    * url 'http://localhost:5000/aluno'

	Scenario: create a user
		* def aluno =
		"""
		{
			"nome": "Fulano da Silva",
			"curso": "Engenharia de Software",
			"nascimento": "01/01/1970",
		}
		"""

		Given path 'inserir'
		And request aluno
		When method post
		Then status 200

	Scenario: retrieve all inserted users
		Given path 'listar'
		When method get
		Then status 200
		And match each $ contains { id : '#number', nome : '#string', curso : '#string', nascimento : '#string' }

	Scenario: update a specific user (must retrieve id first)

		* def getRandomName =
		"""
		function() {
		return java.util.UUID.randomUUID() + '';
		} 
		"""

		Given path 'listar'
		When method get
		Then status 200
		* def alunoOriginal = response[0]

		* def alunoModificado =
		"""
		{
			"id": '#(alunoOriginal.id)',
			"nome": "#(getRandomName())",
			"curso": '#(alunoOriginal.curso)',
			"nascimento": '#(alunoOriginal.nascimento)'
		}
		"""

		Given path 'atualizar'
		And request alunoModificado
		When method put
		Then status 200
		And match response.affectedRows == 1

		Given path 'listar'
		When method get
		Then status 200
		* def alunoDepois = response[0]
		And match alunoDepois.id == alunoOriginal.id
		And match alunoDepois.nome == alunoModificado.nome
		And match alunoDepois.curso == alunoModificado.curso
		And match alunoDepois.nascimento == alunoModificado.nascimento

	Scenario: delete a specific user (must retrieve id first)

		Given path 'listar'
		When method get
		Then status 200
		* def aluno =
		"""
		{
		"id": '#(response[0].id)'
		}
		"""

		Given path 'excluir'
		And request aluno
		When method delete
		Then status 200
		And match response.affectedRows == 1

		Given path 'excluir'
		And request aluno
		When method delete
		Then status 200
		And match response.affectedRows == 0
