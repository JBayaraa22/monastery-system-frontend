export class User {
    username: string;
    role : number;
    last_logged_in : Date;
    constructor(data){
        this.username = data["username"];
        this.role = data["role"];
        this.last_logged_in = data["last_logged_in"];
    }
    get name(){
        return this.username
    }
    
}