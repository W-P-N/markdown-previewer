(
    function (){
        // Utility function to call render everytime user inputs text
        function debounce(func, delay) {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), delay);
            };
        };

        const resetButton = document.getElementById('resetBtn');
        const textArea = document.getElementById('inputText');
        const renderedText = document.getElementById('renderedText');

        resetButton.addEventListener('click', resetTextArea);

        const debouncedRender = debounce(renderText, 300);
        textArea.addEventListener('input', debouncedRender);

        // Focus on text area as soon as page is loaded.
        textArea.focus();

        // Function renders the markdown text.
        function renderText() {
            // Temp function to check for escape chars.
            const escapeHtml = (unsafe) => {
                return unsafe
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "$gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            };
            // Get the value of the input text.
            const inputText = textArea.value;
            // Split on new line and create lines array.
            const linesArray = inputText.split('\n');
            // Create converted markdown array
            const mdArray = linesArray.map((line, idx) => {
                // Logic error: Problem with previous version: Heading will wrap text aroung heading tags, thus might remove bold or italic marks.
                // Check escape sequence -> links -> bold -> italic
                let processedLine = escapeHtml(line);
                processedLine = checkLinks(processedLine);
                processedLine = checkBold(processedLine);
                processedLine = checkItalic(processedLine);
                // Check for headings
                if(processedLine.startsWith('#')) {
                    if(processedLine.startsWith('###')) {
                        return `<h3>${processedLine.slice(3)}</h3>`;
                    } else if(processedLine.startsWith('##')) {
                        return `<h2>${processedLine.slice(2)}</h2>`;
                    } else if(processedLine.startsWith('#')) {
                        return `<h1>${processedLine.slice(1)}</h1>`;
                    };
                } else {
                    return `<p>${processedLine}</p>`;
                };
            });
            // Join the markdown array on new line.
            renderedText.innerHTML = mdArray.join('');
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
            if(line.startsWith('###')) {
                return `<h3>${line.slice(3)}</h3>`;
            } else if(line.startsWith('##')) {
                return `<h2>${line.slice(2)}</h2>`;
            } else if(line.startsWith('#')) {
                return `<h1>${line.slice(1)}</h1>`;
            } else {
                return `<p>${line}</p>`;
            };
        };

        // Function to reset text area value.
        function resetTextArea() {
            textArea.value = "";
            renderText();
            textArea.focus();
        };

        // In case there are any previous garbage values.
        renderText();
    }
)();