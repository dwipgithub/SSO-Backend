import express from "express"
import session from "express-session"
import router from "./routes/index.js"
const app = express()

app.use(session({
    secret: 'someSecret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}))

app.use(express.json())
app.use(router)

// app.use((req, res, next) => {
//     // console.log(store)
//     next()
// })

// app.post('/login', (req, res) => {
//     console.log(req.sessionID)
//     const { userName, password } = req.body
//     if (userName && password) {
//         if (req.session.authenticated) {
//             res.json(req.session)
//         } else {
//             if (password == '123') {
//                 req.session.authenticated = true
//                 req.session.user = {
//                     userName
//                 }
//                 // console.log(req.session.user)
//                 res.json(req.session)
//             } else {
//                 res.status(403).json({
//                     msg: 'Bed Credentioal'
//                 })
//             }
//         }
//     } else {
//         res.status(403).json({
//             msg: 'Bed Credenti'
//         })
//     }
// })

// app.get('/beranda', (req, res) => {
//     if (req.session.authenticated) {
//         res.status(200).json({
//             message: "login"
//         })
//     } else {
//         res.status(401).json({
//             message: "unauthorized"
//         })
//     }
// })

app.listen(3000, () => {
    console.log("server running at port 5000")
})
