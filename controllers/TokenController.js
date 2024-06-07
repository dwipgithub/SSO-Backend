import crypto  from 'crypto'

const secretKey = 'your_secret_key_here';

export default function generateToken(payload, expiresInSeconds) {
    const tokenObj = {
        payload,
        expiresIn: expiresInSeconds,
        createdAt: Math.floor(Date.now() / 1000) // Convert milliseconds to seconds
    };

    // Serialize the token object to a string
    const tokenString = Buffer.from(JSON.stringify(tokenObj)).toString('base64').replace(/[+\-*\/=]/g, '');

    // Sign the token string using HMAC and the secret key
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(tokenString);
    const signature = hmac.digest('base64').replace(/[+\-*\/=]/g, '');

    // Concatenate the token string and the signature
    return `${tokenString}.${signature}`;
}

export const getToken = (req, res) => {
    const value = req.query.value
    const decodedPayload = decodeToken(value)
    if (decodedPayload.status == false) {
        res.status(401).json({
            status: false,
            message: decodedPayload.message,
            data: null
        })
    } else {
        res.status(200).json({
            status: true,
            message: 'authorized',
            data: decodedPayload
        })
    }
}

function decodeToken(tokenString) {
    // Split the token string into token and signature
    const [token, signature] = tokenString.split('.');
    
    // Verify the signature using HMAC and the secret key
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(token);
    const calculatedSignature = hmac.digest('base64').replace(/[+\-*\/=]/g, '');

    // Compare the calculated signature with the provided signature
    if (calculatedSignature !== signature) {
        //throw new Error('Invalid token signature');
        return {
            status: false,
            message: "invalid token signature",
            data: null
        }
    }

    // Decode the token string to retrieve the token object
    const tokenObj = JSON.parse(Buffer.from(token, 'base64').toString().replace(/[+\-*\/=]/g, ''));
    const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds

    // Check if the token has expired
    if (tokenObj.createdAt + tokenObj.expiresIn < currentTime) {
        // throw new Error('Token has expired');
        return {
            status: false,
            message: "token has expired",
            data: null
        }
    }

    return tokenObj.payload;
}