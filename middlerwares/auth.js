// const jwt = require('jsonwebtoken');
// const { promisify } = require('util')

// module.exports = {
//     eAdmin: async function(req, res, next){
//         const authHeader = req.headers.authorization;
//         console.log(req.headers.Token);
    
//         if(!authHeader){
//             return res.status(400).json({
//                 erro: true,
//                 mensagem: "Erro: Falta o Token A"
//             })
//         }

//         const [, token] = authHeader.split(" ");
//         console.log("Token: " + token)

//         if(!token){
//             return res.status(400).json({
//                 erro: true,
//                 mensagem: "Erro: Falta o Token B"
//             });
//         }

//         try{
//             const decode = await promisify(jwt.verify)(token, "JKL$&#*JISGD*#($SDH");
//             req.userId = decode.id;
//             return next();
//         }catch(err){
//             return res.status(400).json({
//                 erro: true,
//                 mensagem: "Erro: Falta o Token C"
//             });
//         }
//      }
// }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3OTYxMzQ4LCJleHAiOjE2ODg1NjYxNDh9.RGtwnp1JgChnMaF37uLGLjm0lDLjQQyN7vZfPSEkpRs
//tokem1  JKL$&#*JISGD*#($SDH


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
