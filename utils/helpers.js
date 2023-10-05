module.exports = {
    format_date: (date) => {
        const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        };
        return date.toLocaleDateString('en-US', options);
    }
}