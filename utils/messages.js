const moment = require('moment');



function formatMessage(username, text) {
    return{
        username,
        text,
        time: new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata", timeStyle: "short"})
    }
}

module.exports = formatMessage;
