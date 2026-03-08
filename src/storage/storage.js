function get(noteId) {
    const raw = localStorage.getItem(noteId);

    if (!raw) return null;

    return JSON.parse(raw);
}

function set(noteId, blob) {
    localStorage.setItem(noteId, JSON.stringify(blob));
}

function remove(noteId) {
    localStorage.removeItem(noteId);
}

export const storage = { get, set, remove };

