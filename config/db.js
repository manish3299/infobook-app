const mongoose = require('mongoose');
const config= require('config');
const db =config.get('mongoURI');

const connectDB = async() => {
    try{
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology:true
            });
            console.log("mongoDB connected");
    }
    catch{
        console.log(err);
        process.exit(1);
    }
}

// const connectDB = () => {
//     mongoose.connect(db,{
//         useNewUrlParser:true,
//         useCreateIndex:true,
//         useFindAndModify:false,
//         useUnifiedTopology:true
//         })
//         .then(()=>{console.log("mongoDB connected")})
//         .catch(err =>{
//             console.log(err);
//             process.exit(1);
//         })
// };

module.exports = connectDB;