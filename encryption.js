function xEncrypt(plain_text_input) {
  const key = "secretkey";
  let encrypted_hex_string = "";

  for (let i = 0; i < plain_text_input.length; i++) {
    const plain_char_code = plain_text_input.charCodeAt(i);
    const key_char_code = key.charCodeAt(i % key.length);
    const xor_result = plain_char_code ^ key_char_code;
    
    let hex_value = xor_result.toString(16);
    // Pad with a leading zero if the hex value is a single digit
    if (hex_value.length < 2) {
      hex_value = "0" + hex_value;
    }
    encrypted_hex_string += hex_value;
  }

  return encrypted_hex_string;
}

function xDecrypt(encrypted_hex_input) {
  const key = "secretkey";
  let decrypted_text = "";

  for (let i = 0; i < encrypted_hex_input.length; i += 2) {
    // Get two hex characters
    const hex_pair = encrypted_hex_input.substring(i, i + 2);
    // Convert hex pair to decimal
    const encrypted_char_code = parseInt(hex_pair, 16);
    
    // Get key character code (use i/2 for key index)
    const key_char_code = key.charCodeAt((i / 2) % key.length);
    
    // XOR to get original char code
    const original_char_code = encrypted_char_code ^ key_char_code;
    
    decrypted_text += String.fromCharCode(original_char_code);
  }

  return decrypted_text;
}

// Test case
const original_text = "hello world";
console.log("Original:", original_text);

const encrypted_text = xEncrypt(original_text);
console.log("Encrypted (hex):", encrypted_text);

const decrypted_text = xDecrypt(encrypted_text);
console.log("Decrypted:", decrypted_text);

if (original_text === decrypted_text) {
  console.log("Test Passed: Original and decrypted texts match.");
} else {
  console.log("Test Failed: Original and decrypted texts DO NOT match.");
  console.log("Original :", original_text);
  console.log("Decrypted:", decrypted_text);
}
