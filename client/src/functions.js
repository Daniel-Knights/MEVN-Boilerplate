import Vue from 'vue';

// Format date/time to BST
export const dateFormat = (Vue.prototype.$dateFormat = function(string) {
    return (
        string.substring(11, 16) +
        ' ' +
        string
            .split('T')[0]
            .split('-')
            .reverse()
            .join('/')
    );
});

export const capitalize = (Vue.prototype.$capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
});

export const randomize = (Vue.prototype.$randomize = function(items) {
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }

    return items;
});

// Convert milliseconds to mm:ss
export const convertMilliseconds = (Vue.prototype.$convertMilliseconds = function(ms) {
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

    label.style.opacity = '0';
    label.style.transform = 'scale3d(0.8, 0.8, 0.8)';
});

// Show form label on input focusout
export const showLabel = (Vue.prototype.$showLabel = function(e) {
    if (e.target.value !== '') return;

    const label = e.target.previousSibling;

    label.style.opacity = '1';
    label.style.transform = 'scale3d(1, 1, 1)';
});

export const isNumber = (Vue.prototype.$isNumber = function(e) {
    const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const keyPressed = e.key;
    if (!keysAllowed.includes(keyPressed)) {
        e.preventDefault();
    }
});

export const inputPrice = (Vue.prototype.$inputPrice = function(e) {
    if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode !== 8 && e.keyCode !== 190) {
        e.preventDefault();
    } else if (price.includes('.') && e.keyCode === 190) {
        e.preventDefault();
    } else if (price === '') {
        price = '£' + e.target.value;
    }
});
