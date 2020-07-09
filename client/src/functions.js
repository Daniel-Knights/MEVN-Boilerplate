import Vue from "vue";

// Format date/time to BST
export const dateFormat = (Vue.prototype.$dateFormat = function(string) {
    return (
        string.substring(11, 16) +
        " " +
        string
            .split("T")[0]
            .split("-")
            .reverse()
            .join("/")
    );
});

// Capitalize category names
export const capitalize = (Vue.prototype.$capitalize = function(string) {
    if (string !== "books/comics") {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
        return (
            string.charAt(0).toUpperCase() +
            string.slice(1, 6) +
            string.charAt(6).toUpperCase() +
            string.slice(7)
        );
    }
});

export const randomize = (Vue.prototype.$randomize = function(items) {
    // Randomize items
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }

    return items;
});

// Convert milliseconds to mm:ss
export const convertMilliseconds = (Vue.prototype.$convertMilliseconds = function(
    ms
) {
    let h, m, s;
    h = Math.floor((ms * 1000) / 1000 / 60 / 60);
    m = Math.floor(((ms * 1000) / 1000 / 60 / 60 - h) * 60);
    s = Math.floor((((ms * 1000) / 1000 / 60 / 60 - h) * 60 - m) * 60);

    s < 10 ? (s = `0${s}`) : (s = `${s}`);
    m < 10 ? (m = `0${m}`) : (m = `${m}`);
    h < 10 ? (h = `0${h}`) : (h = `${h}`);

    return `${m}:${s}`;
});

// Hide form label on input focus
export const hideLabel = (Vue.prototype.$hideLabel = function(e) {
    const label = e.target.previousSibling;

    label.style.opacity = "0";
    label.style.transform = "scale(0.8)";
});

// Show form label on input focusout
export const showLabel = (Vue.prototype.$showLabel = function(e) {
    if (e.target.value !== "") return;

    const label = e.target.previousSibling;

    label.style.opacity = "1";
    label.style.transform = "scale(1)";
});
