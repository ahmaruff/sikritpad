import { deriveId } from "../crypto/crypto.js";
import { storage } from "../storage/storage.js";
import { bindSubmitPassword, openEditor } from "../ui/ui.js";
import { state } from "./state.js";

function initApp() {
    bindSubmitPassword(handlePasswordSubmit);
}

async function handlePasswordSubmit(password) {
    const { noteId, encKey } = await deriveId(password);
    state.password = password;
    state.noteId = noteId;
    state.encKey = encKey;

    console.log("state: ", state);

    const blob = storage.get(noteId);

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

export { initApp }
