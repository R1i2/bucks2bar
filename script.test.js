// script.test.js

// Mock the document and window objects
document.body.innerHTML = `
    <input type="text" id="username" class="form-control mt-5" placeholder="Enter your username">
`;

require('./script.js');

describe('Username validation', () => {
    let usernameInput;

    beforeAll(() => {
        document.dispatchEvent(new Event('DOMContentLoaded'));
        usernameInput = document.getElementById('username');
    });

    test('should set border color to green for valid username', () => {
        usernameInput.value = 'Valid1@Username';
        usernameInput.dispatchEvent(new Event('input'));
        expect(usernameInput.style.borderColor).toBe('green');
    });

    test('should set border color to red for invalid username (no capital letter)', () => {
        usernameInput.value = 'invalid1@username';
        usernameInput.dispatchEvent(new Event('input'));
        expect(usernameInput.style.borderColor).toBe('red');
    });

    test('should set border color to red for invalid username (no number)', () => {
        usernameInput.value = 'Invalid@Username';
        usernameInput.dispatchEvent(new Event('input'));
        expect(usernameInput.style.borderColor).toBe('red');
    });

    test('should set border color to red for invalid username (no special character)', () => {
        usernameInput.value = 'Invalid1Username';
        usernameInput.dispatchEvent(new Event('input'));
        expect(usernameInput.style.borderColor).toBe('red');
    });

    test('should set border color to red for invalid username (less than 8 characters)', () => {
        usernameInput.value = 'Inv1@';
        usernameInput.dispatchEvent(new Event('input'));
        expect(usernameInput.style.borderColor).toBe('red');
    });
});