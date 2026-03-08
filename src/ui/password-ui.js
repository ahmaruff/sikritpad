const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitPassword");

function bindSubmitPassword(handler) {
    // Fungsi pembantu agar kodenya tidak duplikat
    const triggerHandler = () => {
        const password = passwordInput.value ?? "";
        handler(password);
    };

    // Trigger saat tombol klik
    submitBtn.addEventListener("click", triggerHandler);

    // Trigger saat tekan Enter di input
    passwordInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            triggerHandler();
        }
    });
}

export { bindSubmitPassword }
