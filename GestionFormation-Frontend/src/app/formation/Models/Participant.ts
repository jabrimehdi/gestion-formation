
export class pays{
    id : number; 
    nom:String;

}

export class profil{
    id : number; 
    libelle:String;

}

export class Participant {
        
    id : number; 
    nom:String;
    prenom:String;
    email:String;
    tel : number;
    Pays :pays;
    Profil :profil;
    
    }