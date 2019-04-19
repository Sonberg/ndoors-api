module.exports = {
    generate: () => require('rand-token').uid(256),
    expires: () => {
        const date = new Date();
        date.setDate(date.getDate() + 5);
        return date;
    }
}