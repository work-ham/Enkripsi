function process() {
    let key = parseInt(document.getElementById('key').value);
    let sentence = document.getElementById('sentence').value.split(' ');
    let action = parseInt(document.getElementById('action').value);
    let layers = parseInt(document.getElementById('layers').value);
    let output = '';

    if (isNaN(key) || isNaN(layers) || sentence.length === 0) {
        alert('Please fill in all fields correctly.');
        return;
    }

    while (key >= 256) {
        key -= 100;
    }

    sentence.forEach(word => {
        let modifiedWord = word.split('').map(char => {
            let modifiedChar = char;
            for (let i = 0; i < layers; i++) {
                modifiedChar = action === 1 
                    ? String.fromCharCode(modifiedChar.charCodeAt(0) + key) 
                    : String.fromCharCode(modifiedChar.charCodeAt(0) - key);
            }
            return modifiedChar;
        }).join('');
        output += modifiedWord + ' ';
    });

    document.getElementById('output').textContent = output.trim();
}

function copyToClipboard() {
    const outputText = document.getElementById('output').textContent;
    navigator.clipboard.writeText(outputText).then(() => {
        alert('Output copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
