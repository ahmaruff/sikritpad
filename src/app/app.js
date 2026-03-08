import { deriveId } from "../crypto/crypto.js";
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
}

export { initApp }
