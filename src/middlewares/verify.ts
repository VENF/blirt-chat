import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { config } from '../config/config'
import User from '../models/users';

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_KEY
};

export default new Strategy(options, async (payload, done) => {
   const user = await User.findById(payload.id, { password: 0, _id: 0})
   try {
        if(user){
            return done(null, user)
        }else{
            return done(null, false)
        }
   } catch (error) {
       console.log(error)
   }
})