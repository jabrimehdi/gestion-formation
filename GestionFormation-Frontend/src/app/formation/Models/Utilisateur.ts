export class Role {

    id:number;
    nom:String;
    
    }
    
    
    export class Utilisateur {
        
    code : number; 
    login:String;
    password:String;
    role:Role;
    
    }