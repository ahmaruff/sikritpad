import { bindSubmitPassword } from "../ui/password-ui.js";
import { state } from "./state.js";

function initApp() {
    bindSubmitPassword(handlePasswordSubmit);
}

function handlePasswordSubmit(password) {
    state.password = password;

    console.log("state: ", state);
}

export { initApp }
