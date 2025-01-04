import jsonWebToken from 'jsonwebtoken';
import Cryptr from 'cryptr';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const cryptr = new Cryptr('myTotallySecretKey');

const generateToken = (user) => {
    return jsonWebToken.sign({ user: user.toJSON() }, 'secretkey', { expiresIn: '1h' });
};

const handleCredentials = (storeCredentials, correo, password, res) => { 
    if (storeCredentials) {
        const encryptedData = cryptr.encrypt(JSON.stringify({ correo, password }));
        console.log('Cookie remember_me creada:', encryptedData);
        res.cookie('remember_me', encryptedData, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });//30 dias
    } else {
        res.clearCookie('remember_me');
    }
}

const verifyGoogleToken = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
}


export { 
    handleCredentials,
    generateToken,
    verifyGoogleToken
};