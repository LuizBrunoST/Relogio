var openTab = (evt, nameTab) => {
    
    var i;
    var classTab = $('.classTab');
    for (i = 0; i < classTab.length; i++) {
        $(classTab[i]).addClass('w3-hide');
    }
    var tabLinks = $('.tabLink');
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" w3-theme", "");
    }
    $(nameTab).removeClass('w3-hide');
    evt.currentTarget.className += " w3-theme";
}

function saudacao() {
    var greeting;
    var time = new Date().getHours();
    if (time >= 0 && time < 12) {
        greeting = "Bom dia!";
    } else if (time < 18) {
        greeting = "Boa Tarde!";
    } else {
        greeting = "Boa Noite!";
    }
    $('#saudacao').html(greeting);
}
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $('#hora').html(h + ":" + m + "<sup>" + s + "</sup>");
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
var dataAtual = () => {

    var dataAtual = new Date();

    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth() + 1; 
    var ano = dataAtual.getFullYear();

    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }
    return dataFormatada = dia + '/' + mes + '/' + ano;
}
var limpaMsg = () => {
    localStorage.removeItem('msg');
}
var msgToast = () => {
    if (localStorage.getItem('msg') === null) {

    } else {
        $('body').append(localStorage.getItem('msg'));
        limpaMsg();
    }
}
$(document).ready(()=>{
    
    msgToast();

    startTime();
    saudacao();

    $('#dataAtual').html(dataAtual());
    var d = new Date();
    var days = ["<span class='w3-text-red'>Domingo</span>","Segunda","Terça","Quarta","Quinta","Sexta","<span class='w3-text-blue'>Sabádo</span>"];
    $('#semana').html(days[d.getDay()]);

    $('#btn-theme-light').click( () =>{
        localStorage.setItem('theme','light');
        localStorage.setItem('msg','<script>toast.exibir(\'sucesso\', \'Sucesso!\', \'Tema alterado com sucesso.\');</script>')
        window.location.reload();
    });
    $('#btn-theme-dark').click( () =>{
        localStorage.setItem('theme','dark');
        localStorage.setItem('msg','<script>toast.exibir(\'sucesso\', \'Sucesso!\', \'Tema alterado com sucesso.\');</script>')
        window.location.reload();
    });
    $('#btn-theme-default').click( () =>{
        localStorage.removeItem('theme');
        localStorage.setItem('msg','<script>toast.exibir(\'sucesso\', \'Sucesso!\', \'Tema alterado com sucesso.\');</script>')
        window.location.reload();
    });
    if (localStorage.getItem('theme') === null) {
        // Verifica se o usuário prefere o tema escuro
        var preferDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (preferDarkMode) {
            $('#btn-theme-default').addClass('w3-theme-action');
            $('head').append(`
                <link rel="stylesheet" href="css/theme-dark.css">
                <meta name="msapplication-TileColor" content="#1d2a35">
                <meta name="theme-color" content="#1d2a35"></meta>
            `);
        } else {
            // Se o tema preferido for claro, aplique os estilos adequados para o tema claro
            // Por exemplo, você pode remover as classes de tema escuro ou adicionar classes para tema claro
            $('#btn-theme-default').addClass('w3-theme-action');
            $('head').append(`
                <link rel="stylesheet" href="css/theme.css">
                <meta name="msapplication-TileColor" content="#ffffff">
                <meta name="theme-color" content="#ffffff"></meta>
            `);
        }
    } else if (localStorage.getItem('theme') === 'light') {
        $('#btn-theme-light').addClass('w3-theme-light');
        $('head').append(`
            <link rel="stylesheet" href="css/theme.css">
            <meta name="msapplication-TileColor" content="#ffffff">
            <meta name="theme-color" content="#ffffff"></meta>
        `);
    } else {
        $('#btn-theme-dark').addClass('w3-theme-action');
        $('head').append(`
            <link rel="stylesheet" href="css/theme-dark.css">
            <meta name="msapplication-TileColor" content="#1d2a35">
            <meta name="theme-color" content="#1d2a35"></meta>
        `);
    }
    
});