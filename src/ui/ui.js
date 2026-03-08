const passwordScreen = document.getElementById("password-screen");
const passwordInput = document.getElementById("password");
const passwordSubmitBtn = document.getElementById("submitPassword");

const editorScreen = document.getElementById("editor-screen");
const editorTextarea = document.getElementById("note-editor");
const editorSubmitBtn = document.getElementById("saveNote");


function bindSubmitPassword(handler) {
    // Fungsi pembantu agar kodenya tidak duplikat
    const triggerHandler = () => {
        const password = passwordInput.value ?? "";
        handler(password);
    };

    // Trigger saat tombol klik
    passwordSubmitBtn.addEventListener("click", triggerHandler);

    // Trigger saat tekan Enter di input
    passwordInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            triggerHandler();
        }
    });
}

function bindSubmitNote(handler) {
    const triggerHandler = () => {
        const note = editorTextarea.value ?? "";
        handler(note);
    };

    editorSubmitBtn.addEventListener("click", triggerHandler);
}

function saving(isSaving) {
    editorSubmitBtn.disabled = isSaving;
}

function openEditor(state) {
    passwordScreen.style.display = "none";
    editorScreen.style.display = "block";

    editorTextarea.value = state.note || "";
}

function closeEditor() {
    passwordScreen.style.display = "block";
    editorScreen.style.display = "none";

    editorTextarea.value = "";
    passwordInput.value = "";
}

export { bindSubmitPassword, bindSubmitNote, saving, openEditor, closeEditor }
