Feature: test script for 'aluno'

Scenario: create a user
    * def aluno =
      """
      {
        "nome": "Fulano da Silva",
        "curso": "Engenharia de Software",
        "nascimento": "01/01/1970",
      }
      """

    Given url 'http://localhost:5000/aluno/inserir'
    And request aluno
    When method post
    Then status 200

Scenario: retrieve all inserted users
    Given url 'http://localhost:5000/aluno/listar'
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

	Given url 'http://localhost:5000/aluno/listar'
	When method get
	Then status 200
	* def alunoAntes = response[0]

    * def alunoDepois =
      """
      {
		"id": '#(alunoAntes.id)',
        "nome": "#(getRandomName())",
        "curso": '#(alunoAntes.curso)',
        "nascimento": '#(alunoAntes.nascimento)'
      }
      """

    Given url 'http://localhost:5000/aluno/atualizar'
	And request alunoDepois
    When method put
    Then status 200
	And match response.affectedRows == 1

	Given url 'http://localhost:5000/aluno/listar'
	When method get
	Then status 200
	* def alunoAtualizado = response[0]
	And match alunoAtualizado.id == alunoAntes.id
	And match alunoAtualizado.nome == alunoDepois.nome
	And match alunoAtualizado.curso == alunoDepois.curso
	And match alunoAtualizado.nascimento == alunoDepois.nascimento

Scenario: delete a specific user (must retrieve id first)

	Given url 'http://localhost:5000/aluno/listar'
	When method get
	Then status 200
	* def aluno =
	"""
	{
	  "id": '#(response[0].id)'
	}
	"""

	Given url 'http://localhost:5000/aluno/excluir'
	And request aluno
	When method delete
	Then status 200
	And match response.affectedRows == 1

	Given url 'http://localhost:5000/aluno/excluir'
	And request aluno
	When method delete
	Then status 200
	And match response.affectedRows == 0
