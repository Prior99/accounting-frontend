class LocalStorageMock {
    constructor() {
        this.clear();
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key];
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
}

window.localStorage = new LocalStorageMock();
window.requestAnimationFrame = (callback, element) => {
    setTimeout(() => callback(10), 10);
};
