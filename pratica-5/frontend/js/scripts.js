$(document).ready(function () {

    $("#btn_inserir").click(function () {
        valorNome = $("#input_inserir_nome").val();
        valorCurso = $("#input_inserir_curso").val();
        valorNascimento = $("#input_inserir_nascimento").val();
        $.ajax({
            url: 'http://localhost:5000/aluno/inserir',
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            data: {
                nome: valorNome,
                curso: valorCurso,
                nascimento: valorNascimento
            },
            success: function (result, status, xhr) { alert(status); },
            error: function () { alert("error"); },
        });
    });

    $("#btn_listar").click(function () {
        $.ajax({
            url: 'http://localhost:5000/aluno/listar',
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function (result, status, xhr) {
                table = '<table class="table" border="1">';
                table += '<tr><th>id</th><th>nome</th><th>curso</th><th>nascimento</th></tr>'
                $.each(result, function (indice, obj) {
					table += `<tr><td>${obj.id}</td><td>${obj.nome}</td><td>${obj.curso}</td><td>${obj.nascimento}</td></tr>`;
                });
                table += '</table>';
                $("#div_listar").html(table);
             },
            error: function () { alert("error"); }
        });
    });

    $("#btn_atualizar").click(function () {
        valorId = $("#input_atualizar_id").val();
        valorNome = $("#input_atualizar_nome").val();
        valorCurso = $("#input_atualizar_curso").val();
        valorNascimento = $("#input_atualizar_nascimento").val();
        $.ajax({
            url: 'http://localhost:5000/aluno/atualizar',
            type: 'PUT',
            crossDomain: true,
            dataType: 'json',
            data: {
                id: valorId,
                nome: valorNome,
                curso: valorCurso,
                nascimento: valorNascimento
            },
            success: function (result, status, xhr) { alert(status); },
            error: function () { alert("error"); }
        });
    });

    $("#btn_excluir").click(function () {
        valorId = $("#input_excluir_id").val();
        $.ajax({
            url: 'http://localhost:5000/aluno/excluir',
            type: 'DELETE',
            crossDomain: true,
            dataType: 'json',
            data: {
                id: valorId
            },
            success: function (result, status, xhr) { alert(status); },
            error: function () { alert("error"); }
        });
    });

});