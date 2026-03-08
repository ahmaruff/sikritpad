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

function openEditor(state) {
    const passwordScreen = document.getElementById("password-screen");
    const editorScreen = document.getElementById("editor-screen");
    const textarea = document.getElementById("note-editor");

    passwordScreen.style.display = "none";
    editorScreen.style.display = "block";

    textarea.value = state.note || "";
}

export { bindSubmitPassword, openEditor }
