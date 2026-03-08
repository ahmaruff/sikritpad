import { deriveId } from "../crypto/crypto.js";
import { storage } from "../storage/storage.js";
import { bindSubmitPassword } from "../ui/password-ui.js";
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

    const note = storage.get(noteId);
    console.log(note);
}

export { initApp }
