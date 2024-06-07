export const getSession = (req, res) => {
    if (req.session.authenticated) {
        res.status(200).json(
            req.session
        )
    } else {
        res.status(401).json({
            message: "unauthorized"
        })
    }
}