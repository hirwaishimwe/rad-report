import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

//Schema for Auth
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Enter A Username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Enter A Password"]
    },
},
{timestamps:  true,
});

 //static signup method
 userSchema.statics.register = async function(username, password) {
    if(!username || !password){
        throw Error("All fields must be filled")
  }
  //A STRONG PASSWORD IS:  minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
  if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
  }
   
    const exists = await this.findOne({username})

    if (exists) {
          throw Error("Username is already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, password: hash})

    return user

}

userSchema.statics.login = async function(username, password){
    if(!username || !password){
          throw Error("All fields must be filled")
    }
    const user = await this.findOne({username})
    if (!user) {
          throw Error("Incorrect Username!")
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match){
          throw Error('Incorrect Password!')
    }
    return user 
}
export default mongoose.model("User", userSchema);

