function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}
function getRandom(min,max,condition){
    var value=getRandomIntInclusive(min, max)
    if(value==condition){
        value=1
    }else{
        value=0
    }
    return value
}

function consoleMode(string){
    var consoleModeValue=false
    if(consoleModeValue){
        console.log(string)
    }
}
class James{
    constructor(){
        this.xpos=0;
        this.ypos=0;
        this.brain=[];
        this.tarcer=true;
    }
    train(laby){
        consoleMode("======================")
        //TRACER
        if(!this.tarcer){
            $("#"+this.ypos+"-"+this.xpos).removeClass('bot')//Efface l'ancien tarcer du bot
        }
        var globlaKey=false
        while(!globlaKey){
            var idDeplacement=getRandomIntInclusive(0, 3); // Regarde la nouvelle position
            var value=this.direction(idDeplacement,laby) //Regarde dans les données pour savoir ce qui est dans sa direction{value:value,x:x,y:y} value=0 rien/ 1 mur / -1 bordure
            var id="#"+this.ypos+"-"+this.xpos
            var keyIfExist=this.ifExist(id)
            if(value.value==0){//SI sa direction ne posséde pas de mur
                //===================================================================STORE
                //NEW POSITION
                this.xpos=value.x;
                this.ypos=value.y; 
                //BRAIN
                if(!keyIfExist.key){
                    this.brain.push({id:id,mur:[],ok:[idDeplacement],total:1})
                }else{
                    consoleMode("total:"+this.brain[keyIfExist.index].total)
                    if(this.brain[keyIfExist.index].total==4){
                        var lengthOk=this.brain[keyIfExist.index].ok;
                        var random=this.brain[keyIfExist.index].ok[getRandomIntInclusive(0, lengthOk-1)];
                        var value=this.direction(random,laby);
                    }else if(this.brain[keyIfExist.index].ok.indexOf(idDeplacement)==-1){
                        this.brain[keyIfExist.index].ok.push(idDeplacement)
                        this.brain[keyIfExist.index].total++;
                    }
                }
                globlaKey=true;     
            }else{
                //===================================================================STORE
                if(!keyIfExist.key){
                    this.brain.push({id:id,mur:[idDeplacement],ok:[],total:1})
                }else{
                    if(this.brain[keyIfExist.index].total==4){
                        var lengthMur=this.brain[keyIfExist.index].mur;
                        var random=this.brain[keyIfExist.index].mur[getRandomIntInclusive(0, lengthMur-1)];
                        var value=this.direction(random,laby);
                    }else if(this.brain[keyIfExist.index].mur.indexOf(idDeplacement)==-1){
                        this.brain[keyIfExist.index].mur.push(idDeplacement)
                        this.brain[keyIfExist.index].total++;
                    }
                }
            }
            
        }
        $("#"+this.ypos+"-"+this.xpos).addClass('bot')//Affiche la tace  
    }
    collision(x,y,laby){
        var value;
        if(x<0 || y<0 || x>20 || y>20){
            consoleMode("Bordure")
            value=-1;
        }else {
            // console.log("x:"+x+" y:"+y+" data:"+laby.getOneData(y,x))
            if(laby.getOneData(y,x)==1){
                consoleMode("Mur")
                value=1;
            }else{
                consoleMode("Rien")
                value=0;
            }
        }
        return {value:value,x:x,y:y}
    }
    direction(idDeplacement,laby){
        var value;//valeur de la collision et des nouveaux coordonées
        switch(idDeplacement){
            case 0:
                consoleMode("Gauche")
                value=this.collision(this.xpos-1,this.ypos,laby)
                break;
            case 1:
                consoleMode("Bas")
                value=this.collision(this.xpos,this.ypos+1,laby)
                break;
            case 2:
                consoleMode("Droite")
                value=this.collision(this.xpos+1,this.ypos,laby)
                break;
            case 3:
                consoleMode("Haut")
                value=this.collision(this.xpos,this.ypos-1,laby)
                break;
        }
        return value
    }
    ifExist(id){
        var key=-1; //key de sorti
        var index=this.brain.findIndex(obj => obj.id==id); //CHerche l'index du name, renvoie -1 si n'existe pas
        if(index!=-1){//existe
            key=true;
        }else{  //n'existe pas
            key=false;
        }
        return {key:key,index:index} //Retour Array()
    }
    getBrain(){
        console.log(this.brain)
    }
    getConsole(){
        return this.console
    }
}

class Labyrinthe{
    constructor(){
        this.data=[]; //0:vide 1:mur
        this.longueur=20;
        this.largeur=20;
        this.draw();
    }
    draw(){
        $("#content").html("")
        var str="";
        for(var x=0;x<this.longueur;x++){
            var liste=[]
            str+="<div class='ligne'>";
            for(var y=0;y<this.largeur;y++){
                var value=getRandom(1,3,2)
                liste.push(value)
                switch(value){
                    case 0:
                        str+="<div class='box' id="+(String(x)+"-"+String(y))+"></div>";
                        break;
                    case 1:
                        str+="<div class='box mur' id="+(String(x)+"-"+String(y))+"></div>";
                        break;
                }
            }
            str+="</div>";
            this.data[x]=liste
        }
        console.log(this.data)
        $("#content").html(str)
    }
    getAllData(){
        return this.data;
    }
    getOneData(nx,ny){
        return this.data[nx][ny]
    }
}