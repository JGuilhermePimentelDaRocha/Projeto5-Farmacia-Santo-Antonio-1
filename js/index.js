// ********** rolamento ************
// click on top
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 220 || document.documentElement.scrollTop > 220) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

//Quando o usuário clicar no botão, role para o topo do documento
function topFunction() {
    document.body.scrollTop = 1000;
    document.documentElement.scrollTop = 1;
}


// botão Nossas Promoções validação e formatação ao sair do input
function myFunction() {
    document.getElementById("resultado").value = document.getElementById("botao_lead").value;
}



