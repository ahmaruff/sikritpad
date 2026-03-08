import { deriveId, encrypt } from "../crypto/crypto.js";
import { storage } from "../storage/storage.js";
import { bindSubmitNote, bindSubmitPassword, saving, openEditor, closeEditor } from "../ui/ui.js";
import { state } from "./state.js";

function initApp() {
    bindSubmitPassword(handlePasswordSubmit);
    bindSubmitNote(handleNoteSubmit);
}

async function handlePasswordSubmit(password) {
    const { noteId, encKey } = await deriveId(password);
    state.password = password;
    state.noteId = noteId;
    state.encKey = encKey;

    console.log("state: ", state);

    const blob = storage.get(noteId);
    console.log("blob", blob);

    if (!blob) {
        // note belum ada
        state.note = "";
    } else {
        /*
        try {
            state.note = await decrypt(blob, encKey);
        } catch {
            alert("Wrong password");
            return;
        }
        */
    }

    state.unlocked = true;
    openEditor(state);
}

async function handleNoteSubmit(note) {
    if (!state.unlocked) return;
    state.note = note;

    saving(true);
    try {
        const blob = await encrypt(state.note, state.encKey);
        console.log(blob);
        storage.set(state.noteId, blob);
    } finally {
        saving(false);
    }

    closeEditor();
    purgeState(state);
}

function purgeState(state) {
    state.password = null;
    state.noteId = null;
    state.encKey = null;
    state.note = "";
    state.unlocked = false;
}

export { initApp }
