(
    function (){
        const convertButton = document.getElementById('convertBtn');
        const resetButton = document.getElementById('resetBtn');
        const textArea = document.getElementById('inputText');
        const renderText = document.getElementById('renderedText');

        convertButton.addEventListener('click', renderText);
        resetButton.addEventListener('click', resetTextArea);

        // Focus on text area as soon as page is loaded.
        textArea.focus();

        // Function renders the markdown text.
        function renderText() {
            // Get the value of the input text.
            const inputText = textArea.value;
            // Split on new line and create lines array.
            const linesArray = inputText.split('\n');
            // Create converted markdown array
            const mdArray = linesArray.map((line, idx) => {
                // Check sequence - Headings, Bold, Italic, Links
                return checkLinks(checkItalic(checkBold(checkHeadings(line))));
            });

            const escapeHtml = (unsafe) => {
                return unsafe
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "$gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            };
            // Join the markdown array on new line.
            renderText.innerHTML = mdArray.join('\n');
        };

        // Function to replace links with <a> tag using regex.
        function checkLinks(line) {
            return line.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
        }

        // Function to replace md bold with <strong> tag using regex.
        function checkBold(line) {
            return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        };

        // Function to replace md italix with <em> tag using regex.
        function checkItalic(line) {
            return line.replace(/\*(.*?)\*/g, '<em>$1</em>');
        };

        // Function to check heading start and assigning appropriate headings.
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

        // Function to reset text area value.
        function resetTextArea() {
            textArea.value = "";
            textArea.focus();
        };

})();