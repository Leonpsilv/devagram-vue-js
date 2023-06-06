import { HttpApiServices } from './HttpApiServices';

export class RegisterServices extends HttpApiServices{
    async register(body : any){
        await this.post('/register', body);
    }
}