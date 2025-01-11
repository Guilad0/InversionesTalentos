
const getDataError400 = (msg, res) => { 
    console.error(msg);
    return res.status(400).json({
        msg: msg,
    });
};

const resError500 = (msg, e, res) => { 
    console.error(msg, e.message);
    res.status(500).json({
        msg: msg,
        error: e.message,
    });
};

const getCorrectResponseLogin = (msg, token, user, res) => {
    console.log(msg);
    return res.status(200).json({
        msg: msg,
        token,
        user,
    });
}

const res200WithData = (msg, data, res) => {
    console.log(msg);
    return res.status(200).json({
        msg: msg,
        data,
    });
}

const res200 = (msg, res) => {
    console.log(msg);
    return res.status(200).json({
        msg: msg,
    });
}

module.exports = { 
    resError500, 
    getDataError400, 
    getCorrectResponseLogin,
    res200WithData,
    res200,
};