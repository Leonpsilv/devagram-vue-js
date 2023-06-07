import { HttpApiServices } from './HttpApiServices';

export class UserServices extends HttpApiServices{
    async search(filter : String){
        return this.get('/search?filter='+ filter);
    }

    async getDataById(id?: String){
        if(id){
            return await this.get('/search?id=' + id);
        }

        return await this.get('/user');
    }

    async togglFollow(id : String){
        return await this.put('/follow?id='+id);
    }

    async update(body : any){
        await this.put('/user', body);
    }
}