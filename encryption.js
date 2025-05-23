function xEncrypt(plain_text_input) {
  const key = "secretkey";
  let xor_result_string = "";

  for (let i = 0; i < plain_text_input.length; i++) {
    const plain_char_code = plain_text_input.charCodeAt(i);
    const key_char_code = key.charCodeAt(i % key.length);
    const xor_result = plain_char_code ^ key_char_code;
    xor_result_string += String.fromCharCode(xor_result);
  }
  // Encode the string of XORed char codes (binary data) to base64
  return Buffer.from(xor_result_string, 'latin1').toString('base64');
}

function xDecrypt(base64_input) {
  const key = "secretkey";
  let decrypted_text = "";
  
  // Decode base64 to the string of XORed char codes (binary data)
  const xor_result_string = Buffer.from(base64_input, 'base64').toString('latin1');

  for (let i = 0; i < xor_result_string.length; i++) {
    const encrypted_char_code = xor_result_string.charCodeAt(i);
    const key_char_code = key.charCodeAt(i % key.length);
    const original_char_code = encrypted_char_code ^ key_char_code;
    decrypted_text += String.fromCharCode(original_char_code);
  }

  return decrypted_text;
}

// Test case
const original_text = "hello world";
console.log("Original:", original_text);

const encrypted_text = xEncrypt(original_text);
console.log("Encrypted (base64):", encrypted_text);

const decrypted_text = xDecrypt(encrypted_text);
console.log("Decrypted:", decrypted_text);

if (original_text === decrypted_text) {
  console.log("Test Passed: Original and decrypted texts match.");
} else {
  console.log("Test Failed: Original and decrypted texts DO NOT match.");
  console.log("Original :", original_text);
  console.log("Decrypted:", decrypted_text);
}
