import express, { Application } from 'express'
import cors  from 'cors'
import morgan from 'morgan'
import path from 'path'
import passport from 'passport'
import passportVerify from './middlewares/verify'
import socketio from 'socket.io'
import socketMain from './socket'
import userRoutes from './routes/user.routes'
import privateRoutes from './routes/private.routes'


export class Server {
    private server: Application;

    constructor(private port?: string | number){
        this.server = express();
        this.settings();
        this.middlewares();
        this.routes();
        this.staticFiles();
    }
    settings(){
        this.server.set('port', process.env.PORT || this.port);
    }
    middlewares(){
        this.server.use(cors());
        this.server.use(morgan('dev'));
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(passport.initialize());
        passport.use(passportVerify)
    }
    routes(){
        this.server.use('/api',userRoutes);
        this.server.use('/api',privateRoutes);
    }
    staticFiles(){
        const history = require('connect-history-api-fallback');
        this.server.use(history());
        this.server.use(express.static(path.join(__dirname, 'public')));
        this.server.use('uploads', express.static(path.resolve('uploads')));
    }
    async listen(){
        const server = await this.server.listen(this.server.get('port'));
        console.log('server listen on port ' + this.server.get('port'));
        //socke.io initialize
        const io = socketio.listen(server);
        socketMain(io);
    }
}