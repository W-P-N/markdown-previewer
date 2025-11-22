const textArea = document.getElementById('inputText');
textArea.focus();
function renderText() {
    const inputText = textArea.value;

    const linesArray = inputText.split('\n');

    const mdArray = linesArray.map((line, idx) => {
        return checkLinks(checkItalic(checkBold(checkHeadings(line))));
    });

    const renderText = document.getElementById('renderedText');
    renderText.innerHTML = mdArray.join('\n');
};

function checkLinks(line) {
    return line.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
}

function checkBold(line) {
    return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

function checkItalic(line) {
    return line.replace(/\*(.*?)\*/g, '<em>$1</em>');
};

function checkHeadings(line) {
    let outputText = "";
    if(line.startsWith('###')) {
        outputText += `<h3>${line.slice(3)}</h3>\n`;
    } else if(line.startsWith('##')) {
        outputText += `<h2>${line.slice(2)}</h2>\n`;
    } else if(line.startsWith('#')) {
        outputText += `<h1>${line.slice(1)}</h1>\n`;
    } else {
        outputText += `<p>${line}</p>\n`;
    };
    return outputText;
}

function resetTextArea() {
    textArea.value = "";
    textArea.focus();
};

