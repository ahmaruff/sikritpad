const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitPassword");

function bindSubmitPassword(handler) {
    submitBtn.addEventListener("click", (e) => {
        const password = passwordInput.value ?? "";
        handler(password);
    });
}

export { bindSubmitPassword }
