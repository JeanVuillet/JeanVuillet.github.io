




const reponse2 = await fetch("rf.json");
const membres = await reponse2.json();

//trier tableau membres
for(let i=0;i< membres.length;i++)
{
 
 membres.sort(function compare (a,b){
     
    if (a.PrenomMembre < b.PrenomMembre) 
      {
         return -1;
     }
     else if( a.PrenomMembre > b.PrenomMembre)
      {
         return +1;
     }
     else {return 0};
    
     })
    

    }





//création des éléments html

const divList=document.createElement("div");
divList.id="divlist";

const divTree=document.createElement("div");
const divTreeParents=document.createElement("div");
divTreeParents.className="parents";
const divTreeEnfants=document.createElement("div");
divTreeEnfants.className="enfants";




const Tree=document.querySelector(".Tree");




    //création formulaire
     const select=document.querySelector(".formulaire");
     
     let formulaire=document.createElement("form");
     let label=document.createElement("label");
     label.for="prénom";
     let input=document.createElement("input");
     input.type="search";
     input.id="recheche";
     let button=document.createElement("button");
     button.innerText="recheche";
     
     formulaire.appendChild(label);
     formulaire.appendChild(input);
         // EventLIstener recheche
    button.addEventListener("click", function(){Recherche()} );
    alert("ok");
     formulaire.appendChild(button);

       select.appendChild(formulaire);




     





Tree.appendChild(divTree);

divTree.appendChild(divTreeParents);

divTree.appendChild(divTreeEnfants);

alert("programme fini");

const  List=document.querySelector(".List");
const div= document.createElement("div");
List.appendChild(div);

//LES FONCTIONS


function Recherche()

{

   
//querry.innerHTML="";
 
   
   
  let PN= input.value;
 let j=0;
 let pListe= new Array();

 //Creation de pListe
  for (let i=0; i<membres.length;i++)
                {
                 
                if(membres[i].PrenomMembre.substring(0,PN.length).toUpperCase()==PN.toUpperCase())
                {
                pListe[j]=membres[i];
                j=j+1


                //  e=>e.Id==id
                 //création des éléments de la liste

 

       const p2=document.createElement("p");
       const boutonUp=document.createElement("button");
       boutonUp.innerHTML="parents";
   
       const boutonDown=document.createElement("button");
       boutonDown.innerText="enfants";
   
       
       
           p2.innerText=membres[i].PrenomMembre+" "+membres[i].NomMembre
   
           boutonUp.addEventListener("click", function(){TreeParent(membres[i].Id)});
   
           boutonDown.addEventListener("click",function(){TreeEnfants(membres[i].Id)})
           
           p2.appendChild(boutonUp);
           p2.appendChild(boutonDown);
           div.appendChild(p2);
          alert("137" +membres[i].PrenomMembre)
                }
                }

            }

//définir TreeEnfants!!!

function TreeEnfants(id){

    divTreeParents.innerHTML="";
    divTreeEnfants.innerHTML="";

    let MembreCourant= GetByID(id)[0];
    alert("ID="+id+" "+MembreCourant.Id+" "+MembreCourant.PrenomMembre);


    let pere= new Array();
    
     let mere= new Array();
  
    if(MembreCourant.Sexe=="M"){
        pere[0]=  MembreCourant;
     console.log(pere[0]+" "+MembreCourant);
    if(MembreCourant.NomEpoux==""){
    mere= GetConjoint(MembreCourant.NomMembre,MembreCourant.PrenomMembre);}
   else{   mere= GetByName(MembreCourant.NomEpoux, MembreCourant.PrenomEpoux)}
    }



    else{
        mere[0]=MembreCourant;
    
        if(MembreCourant.NomEpoux==""){
              pere= GetConjoint(MembreCourant.NomMembre,MembreCourant.PrenomMembre);}
            else{  pere= GetByName(MembreCourant.NomEpoux, MembreCourant.PrenomEpoux)}

    }
console.log("pere=" +pere+"mere="+mere);
  const Pere=document.createElement("div");
  Pere.className="Membre";
  const PereNom=document.createElement("p");
  const PerePhoto=document.createElement("img");

  PerePhoto.src= "photos/"+ NoAccent(pere[0].PrenomMembre)+NoAccent(pere[0].NomMembre)+".jpeg ";

  PerePhoto.alt= "photos/ "+ NoAccent(pere[0].PrenomMembre)+NoAccent(pere[0].NomMembre)+".jpeg ";
   PereNom.innerHTML="";
   console.log(pere.PrenomMembre);
   PereNom.innerText=pere[0].PrenomMembre+" "+pere[0].NomMembre+" "+pere[0].DateNaissance;
   
   Pere.appendChild(PerePhoto);
   Pere.appendChild(PereNom);
  
   const Mere=document.createElement("div");
   Mere.className="Membre";
   const MereNoms=document.createElement("p");
   const MerePhoto=document.createElement("img");
   MerePhoto.className="a";

  
   MerePhoto.src=  "photos/"+NoAccent(mere[0].PrenomMembre)+NoAccent(mere[0].NomMembre)+ ".jpeg";
   MerePhoto.alt=mere[0].NomMembre+mere[0].PrenomMembre;
   MereNoms.innerText=" ";
   MereNoms.innerText=mere[0].PrenomMembre+" "+mere[0].NomMembre+" "+mere[0].DateNaissance;
   divTreeParents.innerHTML="";
   Mere.appendChild(MerePhoto);
   Mere.appendChild(MereNoms);

   divTreeParents.appendChild(Pere);
   divTreeParents.appendChild(Mere);



 

   const Enfants= GetEnfant(pere[0].NomMembre,pere[0].PrenomMembre,mere[0].NomMembre,mere[0].PrenomMembre);
    
   divTreeEnfants.innerHTML="";

   for(let i=0;i<Enfants.length;i++){

    const DivEnfants=document.createElement("div");
    DivEnfants.className=i;
   
    const DivNextG=document.createElement("div");
    DivNextG.className=i;

   let p=document.createElement("p");

    const NomEnfant=document.createElement("p");

    const ImageEnfant=document.createElement("img");
    const DownEnfant=document.createElement("button");
    
    DownEnfant.addEventListener("click", function (){(NextGeneration(Enfants[i].NomMembre, Enfants[i].PrenomMembre, i));})
    
    DownEnfant.innerText="↓";
 
   ImageEnfant.src="photos/"+NoAccent(Enfants[i].PrenomMembre)+NoAccent(Enfants[i].NomMembre)+".jpeg";
   ImageEnfant.alt=Enfants[i].PrenomMembre+Enfants[i].NomMembre

    // el.innerHTML="<img src=\"http://placehold.it/350x350\" width=\"400px\" height=\"150px\">";

   DivNextG.appendChild(p);
   DivEnfants.appendChild(ImageEnfant);
   DivEnfants.appendChild(NomEnfant);
   DivEnfants.appendChild(DivNextG);
  
    
   NomEnfant.innerText=Enfants[i].PrenomMembre+" "+Enfants[i].NomMembre+" "+Enfants[i].DateNaissance;

    divTreeEnfants.appendChild(DivEnfants);

    NomEnfant.appendChild(DownEnfant);


   
   }
 }
 
   
    //ajout des action listeners

    //boutonUp.addEventListener("click", TreeParent());



    




function TreeParent(id)
{ 

    divTreeParents.innerHTML="";
    divTreeEnfants.innerHTML="";

    //divTree.innerHTML="";

     let MembreCourant= GetByID(id)[0];
alert("ID="+id+" "+MembreCourant.Id+" "+MembreCourant.PrenomMembre);
    const Tree=document.querySelector(".Tree");

    const Pere=document.createElement("p");

   
    


    if(MembreCourant.NomPere==""){alert("pas de père"); return false;}
    if(MembreCourant.NomMere==""){alert("pas de mère"); return false;}
    const Papa=  GetByName(MembreCourant.NomPere,MembreCourant.PrenomPere)
    console.log(Papa );

    const Maman= GetByName(MembreCourant.NomMere,MembreCourant.PrenomMere)

    const Enfants= GetEnfant(Papa[0].NomMembre, Papa[0].PrenomMembre, Maman[0].NomMembre, Maman[0].PrenomMembre)


    console.log(Maman);

    console.log(Enfants);
    Pere.innerHTML="";
    Pere.innerText=Papa[0].PrenomMembre+" "+Papa[0].NomMembre+" "+Papa[0].DateNaissance;

    const Mere=document.createElement("p");
    Mere.innerText=" ";
    Mere.innerText=Maman[0].PrenomMembre+" "+Maman[0].NomMembre+" "+Maman[0].DateNaissance;
    divTreeParents.innerHTML="";
    divTreeParents.appendChild(Pere);
    divTreeParents.appendChild(Mere)
   
   

   for(let i=0;i<Enfants.length;i++){

    const enfants=document.createElement("p");
  
   
    enfants.innerText=Enfants[i].PrenomMembre+" "+Enfants[i].NomMembre+" "+Enfants[i].DateNaissance;
    divTreeEnfants.appendChild(enfants);
   }
   

   

};


function GetByName(nom, prenom){
    const list2= membres.filter(e=>e.NomMembre==nom && e.PrenomMembre==prenom);


    return list2
}


function GetEnfant(nomPere, prenomPere, nomMere, prenomMere) {

    const list2= membres.filter(e=>e.NomPere==nomPere && e.PrenomPere==prenomPere && e.NomMere==nomMere && e.PrenomMere==prenomMere);
    list2.sort( function ( a,b) { 
       
       const retour=a.DateNaissance.slice(6) - b.DateNaissance.slice(6);
       if(retour==0){
        retour=a.DateNaissance.slice(3,5) - b.DateNaissance.slice(3,5)
       }
       return retour;
     
       })
     return list2;
}

function GetConjoint (nom, prenom){

    console.log(nom,prenom);
    const list2= membres.filter(e=>e.NomEpoux==nom && e.PrenomEpoux==prenom);
    console.log(list2);
    return list2;
}

function GetByID(id){
    const list2= membres.filter(e=>e.Id==id);
    return list2;
                    }


function NoAccent(a) {
  var b="áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ",
      c="aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY",
      d="";
  for(var i = 0, j = a.length; i < j; i++) {
    var e = a.substr(i, 1);
    d += (b.indexOf(e) !== -1) ? c.substr(b.indexOf(e), 1) : e;
  }
  return d;
}

