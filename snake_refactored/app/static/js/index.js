// Função para gerar uma cor aleatória
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Função para definir cores aleatórias para elementos h2 e h3
function setRandomColors() {
    var h2Elements = document.querySelectorAll('h2');
    var h3Elements = document.querySelectorAll('h3');

    h2Elements.forEach(function (element) {
        element.style.color = getRandomColor();
    });

    h3Elements.forEach(function (element) {
        element.style.color = getRandomColor();
    });
}

// Função para exibir texto por 2 segundos e definir cores aleatórias
function displayText() {
    setRandomColors();
}
