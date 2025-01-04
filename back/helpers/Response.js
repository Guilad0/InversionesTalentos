
const getDataError400 = (msg, res) => { 
    console.error(msg);
    return res.status(400).json({
        msg: msg,
    });
};

const getError500 = (msg, e, res) => { 
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

const getResponse200WithData = (msg, data, res) => {
    console.log(msg);
    return res.status(200).json({
        msg: msg,
        data,
    });
}

const getResponse200 = (msg, res) => {
    console.log(msg);
    return res.status(200).json({
        msg: msg,
    });
}

export { 
    getError500, 
    getDataError400, 
    getCorrectResponseLogin,
    getResponse200WithData,
    getResponse200,
};