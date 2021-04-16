/* Validações gerais */

$('#nome').keydown(function (elemento) {
    if (elemento.keyCode >= 48 && elemento.keyCode <= 57 ||
        elemento.keyCode >= 96 && elemento.keyCode <= 105) {
        return false
    }
})

$('#cpf_cnpj').keydown(function (elemento) {

    if (elemento.keyCode >= 48 && elemento.keyCode <= 57 ||
        elemento.keyCode >= 96 && elemento.keyCode <= 105 ||
        elemento.keyCode == 8 || elemento.keyCode == 46) {
        return true
    } else {
        return false
    }
})

$('#telefone').keydown(function (elemento) {

    if (elemento.keyCode >= 48 && elemento.keyCode <= 57 ||
        elemento.keyCode >= 96 && elemento.keyCode <= 105 ||
        elemento.keyCode == 8 || elemento.keyCode == 46
        || elemento.keyCode == 109 || elemento.keyCode == 189) {
        return true
    } else {
        return false
    }
})


/* Validação nome quantidade de caracteres Nome*/

let nome = $('#nome')
$('#nome').blur(function () { // jQuery método de evento blur()
    if ((nome.val()).length < 5) {
        nome.addClass('erro')
    } else if ((nome.val()).length > 5) {
        nome.removeClass('erro')
    }
})


/* Validação nome quantidade de caracteres Nome Empresa*/

let nomeEmpresa = $('#nome_empresa')
$('#nome_empresa').blur(function () { // jQuery método de evento blur()
    if ((nomeEmpresa.val()).length < 5) {
        nomeEmpresa.addClass('erro')
    } else if ((nomeEmpresa.val()).length > 5) {
        nomeEmpresa.removeClass('erro')
    }
})


/* Validação de idade */

let dataNascimento = $('#dataNascimento')
$('#dataNascimento').blur(function () { // jQuery método de evento blur()
    let idade = 2021 - parseFloat(dataNascimento.val())
    if (idade > 130 || idade < 0) {
        dataNascimento.addClass('erro')
    } else {
        dataNascimento.removeClass('erro')
    }
})


/*verifica_cpf_cnpj*/
function verifica_cpf_cnpj(valor) {

    // Garante que o valor é uma string
    valor = valor.toString();

    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');

    // Verifica CPF
    if (valor.length === 11) {
        return 'CPF';
    }

    // Verifica CNPJ
    else if (valor.length === 14) {
        return 'CNPJ';
    }

    // Não retorna nada
    else {
        return false;
    }
}

function calc_digitos_posicoes(digitos, posicoes = 10, soma_digitos = 0) {

    // Garante que o valor é uma string
    digitos = digitos.toString();

    for (var i = 0; i < digitos.length; i++) {
        // Preenche a soma com o dígito vezes a posição
        soma_digitos = soma_digitos + (digitos[i] * posicoes);

        // Subtrai 1 da posição
        posicoes--;

        // Parte específica para CNPJ
        if (posicoes < 2) {
            // Retorno a posição para 9
            posicoes = 9;
        }
    }

    // Captura o resto da divisão entre soma_digitos dividido por 11
    soma_digitos = soma_digitos % 11;

    // Verifica se soma_digitos é menor que 2
    if (soma_digitos < 2) {
        // soma_digitos agora será zero
        soma_digitos = 0;
    } else {
        // Se for maior que 2, o resultado é 11 menos soma_digitos
        soma_digitos = 11 - soma_digitos;
    }

    // Concatena mais um dígito aos primeiro nove dígitos
    var cpf = digitos + soma_digitos;

    // Retorna
    return cpf;
}

/*Validador se for CPF*/
function valida_cpf(valor) {

    // Garante que o valor é uma string
    valor = valor.toString();

    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');

    // Captura os 9 primeiros dígitos do CPF
    var digitos = valor.substr(0, 9);

    // Faz o cálculo dos 9 primeiros dígitos do CPF para obter o primeiro dígito
    var novo_cpf = calc_digitos_posicoes(digitos);

    // Faz o cálculo dos 10 dígitos do CPF para obter o último dígito
    var novo_cpf = calc_digitos_posicoes(novo_cpf, 11);

    // Verifica se o novo CPF gerado é idêntico ao CPF enviado
    if (novo_cpf === valor) {
        // CPF válido
        return true;
    } else {
        // CPF inválido
        return false;
    }
}

/*Validador CNPJ*/
function valida_cnpj(valor) {

    // Garante que o valor é uma string
    valor = valor.toString();

    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');

    // O valor original
    var cnpj_original = valor;

    // Captura os primeiros 12 números do CNPJ
    var primeiros_numeros_cnpj = valor.substr(0, 12);

    // Faz o primeiro cálculo
    var primeiro_calculo = calc_digitos_posicoes(primeiros_numeros_cnpj, 5);

    // O segundo cálculo é a mesma coisa do primeiro, porém, começa na posição 6
    var segundo_calculo = calc_digitos_posicoes(primeiro_calculo, 6);

    // Concatena o segundo dígito ao CNPJ
    var cnpj = segundo_calculo;

    // Verifica se o CNPJ gerado é idêntico ao enviado
    if (cnpj === cnpj_original) {
        return true;
    }

    // Retorna falso por padrão
    return false;
}

/*validador_cpf_cnpj*/
function valida_cpf_cnpj(valor) {

    // Verifica se é CPF ou CNPJ
    var valida = verifica_cpf_cnpj(valor);

    // Garante que o valor é uma string
    valor = valor.toString();

    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');

    // Valida CPF
    if (valida === 'CPF') {
        // Retorna true para cpf válido
        return valida_cpf(valor);
    }

    // Valida CNPJ
    else if (valida === 'CNPJ') {
        // Retorna true para cnpj válido
        return valida_cnpj(valor);
    }

    // Não retorna nada
    else {
        return false;
    }
}

/*formatador_cpf_cnpj*/
function formata_cpf_cnpj(valor) {

    // O valor formatado
    var formatado = false;

    // Verifica se é CPF ou CNPJ
    var valida = verifica_cpf_cnpj(valor);

    // Garante que o valor é uma string
    valor = valor.toString();

    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');


    // Valida CPF
    if (valida === 'CPF') {

        // Verifica se o CPF é válido
        if (valida_cpf(valor)) {

            // Formata o CPF ###.###.###-##
            formatado = valor.substr(0, 3) + '.';
            formatado += valor.substr(3, 3) + '.';
            formatado += valor.substr(6, 3) + '-';
            formatado += valor.substr(9, 2) + '';
        }
    }

    // Valida CNPJ
    else if (valida === 'CNPJ') {

        // Verifica se o CNPJ é válido
        if (valida_cnpj(valor)) {

            // Formata o CNPJ ##.###.###/####-##
            formatado = valor.substr(0, 2) + '.';
            formatado += valor.substr(2, 3) + '.';
            formatado += valor.substr(5, 3) + '/';
            formatado += valor.substr(8, 4) + '-';
            formatado += valor.substr(12, 14) + '';
        }
    }
    // Retorna o valor 
    return formatado;
}

/* barra de progresso */

const inputs = document.querySelectorAll('.progress');
const progress = document.querySelector('#progressbar');
const segments = 100 / inputs.length;

let fieldValues = [];

const checkFields = () => {
    var fieldsCompleted = 0;
    var barWidth = 0;

    for (let i = fieldValues.length; i--;) {
        if (fieldValues[i] === true) {
            fieldsCompleted += 1;
        }
    }

    barWidth = fieldsCompleted * segments;
    progress.style.width = barWidth + '%';
    progress.innerHTML = `${barWidth.toFixed(0)}%`;

    /* Envia as informações do formulário para uma box */

    $('#btnEnviar').click(function () {
        if (barWidth == 100) {
            $('#boxConfirmacao').fadeIn('slow')
            $('#confirmacaoDados').html("Entraremos em contato em breve.")
        } else {
            $('#boxConfirmacao').fadeIn('slow').addClass('erro')
            $('#confirmacaoDados').html("Você precisa preencher todos os campos")
        }
    })

}


for (let i = inputs.length; i--;) {
    inputs[i].addEventListener('input', (event) => {
        const currentInput = event.currentTarget;

        if (!currentInput.value.length) {
            fieldValues[i] = false;
        } else {
            fieldValues[i] = true;
        }

        checkFields();
    });
}

// botão Nossas Promoções validação e formatação ao sair do input
function myFunction2() {
    document.getElementById("resultado2").value = document.getElementById("btnEnviar").value;
}


