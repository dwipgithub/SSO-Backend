import generateCustomToken  from './TokenController.js'

export const login = async (req, res) => {
    // console.log(req.sessionID)
    const { userName, password } = req.body
    if (userName && password) {
        if (req.session.authenticated) {
            res.json(req.session)
        } else {
            if (password == '123') {
                req.session.authenticated = true
                
                const payload = {
                    userId: userName,
                    isAdmin: true // or false based on your needs
                };

                const expiresInSeconds = 60; // 1 hour expiration time

                const token = generateCustomToken(payload, expiresInSeconds);
                // console.log('Custom token:', token);

                req.session.user = {
                    userName, token
                }

                res.status(201).json({
                    status: true,
                    message: 'token created',
                    token: token
                })
            } else {
                res.status(403).json({
                    status: false,
                    message: 'bed credentioal',
                    token: null
                })
            }
        }
    } else {
        res.status(403).json({
            status: false,
            message: 'bed credential',
            token: null
        })
    }
}