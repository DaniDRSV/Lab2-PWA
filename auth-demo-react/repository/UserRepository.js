import DBLocal from "db-local";
import crypto from "crypto";

const {Schema} = new DBLocal({path:'./db'})

const User = Schema('User', {
    _id:{type:String,required:true,},
    username:{type:String,required:true},
    password:{type:String,required:true}
})

export default class{
    static create({username, password}){
        Validation.name(username)
        Validation.password(password)

        console.log(`Username: ${username} Password: ${password}`)
        //Verify a duplicated user
        const userDuplicated = User.findOne({username})
        if (userDuplicated) throw new Error('User duplicated')
        //Create a ramdon id
        const id = crypto.randomUUID()
        
        User.create({
            _id:id,
            username:username,
            password:password
        }).save()

        //return id
        return id
    }

    //create login
    static login(username, password){
        Validation.name(username)
        Validation.password(password)

        const user = User.findOne({username})
        if(!user) throw new Error("User doesn't exist")

        return user
    }
}
export class Validation{
    static name(username){
        if(typeof username != 'string') throw new 
        Error('The username must be a string')
        if(username.length < 3) throw new 
        Error('The username must be more than 3')
    }

    static password(password){
        if(typeof password != 'string') throw new 
        Error('The password must be a string')
        if(password.length < 6) throw new 
        Error('The password must be more than 6 characters')
    }
}