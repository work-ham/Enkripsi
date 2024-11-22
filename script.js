function process() {
    let key = parseInt(document.getElementById('key').value);
    let sentence = document.getElementById('sentence').value.split(' ');
    let action = parseInt(document.getElementById('action').value); // 1 = Encrypt, 2 = Decrypt
    let layers = parseInt(document.getElementById('layers').value);
    let output = '';

    if (isNaN(key) || isNaN(layers) || sentence.length === 0) {
        alert('Please fill in all fields correctly.');
        return;
    }

    // Adjust key within valid ASCII range
    while (key >= 256) {
        key -= 100;
    }

    // Function to generate a random alphabet or number
    function getRandomAlphaNumeric() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return chars[Math.floor(Math.random() * chars.length)];
    }

    if (action === 1) { // Encrypt
        sentence.forEach(word => {
            let modifiedWord = word.split('').map(char => {
                let randomChar = getRandomAlphaNumeric();
                let encryptedChar = char;
                let encryptedRandom = randomChar;

                // Apply encryption layers to both original and random characters
                for (let i = 0; i < layers; i++) {
                    encryptedChar = String.fromCharCode(encryptedChar.charCodeAt(0) + key);
                    encryptedRandom = String.fromCharCode(encryptedRandom.charCodeAt(0) + key);
                }

                // Return the pair (original and random character encrypted)
                return encryptedChar + encryptedRandom;
            }).join('');
            output += modifiedWord + ' ';
        });
    } else if (action === 2) { // Decrypt
        sentence.forEach(word => {
            let modifiedWord = '';
            // Process each character pair (original and random)
            for (let i = 0; i < word.length; i += 2) {
                let encryptedChar = word[i];
                let encryptedRandom = word[i + 1];

                // Apply decryption layers to both original and random characters
                for (let j = 0; j < layers; j++) {
                    encryptedChar = String.fromCharCode(encryptedChar.charCodeAt(0) - key);
                    encryptedRandom = String.fromCharCode(encryptedRandom.charCodeAt(0) - key);
                }

                // Append only the original character to the result (random is discarded for decryption)
                modifiedWord += encryptedChar;
            }
            output += modifiedWord + ' ';
        });
    } else {
        alert('Invalid action selected.');
        return;
    }

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
