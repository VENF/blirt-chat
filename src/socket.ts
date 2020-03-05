import Connected, { IConnected } from './models/connected'
import Msg from './models/msg'
export default function (io: any){
    //principal funcion socketio
    io.on('connection', (socketOne: any) => {
        socketOne.on('NEW:USER', async (data: any, cb: any) => {
            const user = await Connected.findOne({ userName: data.userName });
            if(!user){
                const newConnected: IConnected = new Connected({
                    userName: data.userName
                });
                await newConnected.save();
                const users = await Connected.find({}, {_id: 0});
                cb(true)
                io.emit('USERS', users)
            }else{
                const users = await Connected.find({}, {_id: 0});
                cb(true)
                io.emit('USERS', users)
            }
        });

        socketOne.on('DISCONNECT', async (data: any, cb: any) => {
            const userDelete = await Connected.findOneAndDelete({ userName: data });
            const users = await Connected.find({}, {_id: 0});
            cb(true)
            io.emit('USERS', users)
        });

        socketOne.on('NEW:MSG', async (data: any, cb: any) => {
            const newMsg = new Msg({
                message: data.message,
                user: data.username
            });
            await newMsg.save();
            const msgs = await Msg.find({}, {_id: 0});
            cb(true);
            io.emit('MESSAGES', msgs)
        })
    });
}