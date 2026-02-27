function unlock(password) {
    console.log(password);
}

document.getElementById("open").onclick = () => {
    const password = document.getElementById("password").value;
    unlock(password);
};
