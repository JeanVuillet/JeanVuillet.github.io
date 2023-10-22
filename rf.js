// Programme pour afficher la généalogie d'une famille décrite dans une base Json

const reponse2 = await fetch("rf.json");
const membres = await reponse2.json();

 //trier la liste membres

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

const List=document.querySelector(".List");   
// créer les boutons parents enfants

const UpParents=document.createElement("button");
// UpParents.addEventListener("click", function (){TreeEnfants(Enfants[i].Id);});
UpParents.addEventListener("click", function(){TreeParents(document.getElementById("membre").value)});
UpParents.innerText="Parents";
const DownEnfants=document.createElement("button");
DownEnfants.addEventListener("click", function (){TreeEnfants(document.getElementById("membre").value)});
DownEnfants.innerText="Enfants";

// Saisie du choix du membre avec une liste déroulante

     var select = document.createElement("select");
     select.name = "membre";
    select.id = "membre"
    for(let i=0;i< membres.length;i++)
    {
        var option = document.createElement("option");
         option.value = membres[i].Id;
         option.text = membres[i].PrenomMembre+" "+membres[i].NomMembre;
         select.appendChild(option);
    }

    var label = document.createElement("label");
    label.innerHTML = "Choisir un membre de la famille "
    label.htmlFor = "membre";
 
    document.getElementById("container").appendChild(label).appendChild(select);
    document.getElementById("container").appendChild(UpParents);
    document.getElementById("container").appendChild(DownEnfants);
   
//création des éléments html



//définir TreeEnfants!!!

function TreeEnfants(id){
  const Tree=document.querySelector(".Tree");
    Tree.innerHTML="";

    let MembreCourant= GetByID(id)[0];
  
    let pere= new Array();
    
     let mere= new Array();
  
    if(MembreCourant.Sexe=="M"){
        pere[0]=  MembreCourant;
   
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

    if (pere.length=1)
    {
      for(let j=0;j<mere.length;j++)
      {
        AfficherMembre(pere[0].Id,"P");
        AfficherMembre(mere[j].Id,"P");
    

        const Enfants= GetEnfant(pere[0].NomMembre,pere[0].PrenomMembre,mere[j].NomMembre,mere[j].PrenomMembre);
    

        for(let i=0;i<Enfants.length;i++)
        {
          AfficherMembre(Enfants[i].Id,"E")
        }
      }
    }
      else
      {
        for(let j=0;j<pere.length;j++)
        {
          AfficherMembre(pere[j].Id,"P");
          AfficherMembre(mere[0].Id,"P");

          const Enfants= GetEnfant(pere[j].NomMembre,pere[j].PrenomMembre,mere[0].NomMembre,mere[0].PrenomMembre);
    

          for(let i=0;i<Enfants.length;i++)
          {
          AfficherMembre(Enfants[i].Id,"E")
         }


         }

      }

 }
   
    //ajout des action listeners

    //boutonUp.addEventListener("click", TreeParent());

    function AfficherMembre(id,type){
    
        
          const membre = GetByID(id);
          // Récupération de l'élément du DOM qui accueillera la famille
          const sectionFamille = document.querySelector(".Tree");
          // Création d’une balise dédiée à un membre
          const membreElement = document.createElement("membre");
          // Création des balises 
          const imageElement = document.createElement("img");
          imageElement.src ="photos/"+NoAccent(membre[0].PrenomMembre)+NoAccent(membre[0].NomMembre)+".jpeg"
          imageElement.alt="pas de photo";
          const containerElement = document.createElement("div");
          containerElement.className="containerElement";
          const prenomnomElement = document.createElement("h4");
          prenomnomElement.innerText = membre[0].PrenomMembre+" "+membre[0].NomMembre;
          const ddnElement = document.createElement("h4");
          ddnElement.innerText = membre[0].DateNaissance;
          const ageElement = document.createElement("h4");
          if(membre[0].DateDeces==""){
          ageElement.innerText = CalculAge(membre[0].DateNaissance)+" ans";
          }
          // créer les boutons parents enfants

          const bouton=document.createElement("button");
          if(type=="P")
            {
            bouton.addEventListener("click", function(){TreeParents(id)});
            bouton.innerText="Parents";}
            else
            {
              bouton.addEventListener("click", function(){TreeEnfants(id)});
            bouton.innerText="Enfants";}
            

          
          // On rattache la balise membre a la section Famille
          sectionFamille.appendChild(membreElement);
          // On rattache les données à membreElement (la balise membre)
          membreElement.appendChild(imageElement);
          membreElement.appendChild(containerElement);
          containerElement.appendChild(prenomnomElement);
          containerElement.appendChild(ddnElement);
          containerElement.appendChild(ageElement);
          containerElement.appendChild(bouton);
          
       }
  

    




function TreeParents(id){ 

  const Tree=document.querySelector(".Tree");
  Tree.innerHTML="";

     let MembreCourant= GetByID(id)[0];
   

    if(MembreCourant.NomPere==""){alert("Le nom du père de "+MembreCourant.PrenomMembre+" n'est pas dans le fichier"); return false;}
    if(MembreCourant.NomMere==""){alert("Le nom de la mère de "+MembreCourant.PrenomMembre+" n'est pas dans le fichier"); return false;}
    const pere=  GetByName(MembreCourant.NomPere,MembreCourant.PrenomPere)
    const mere= GetByName(MembreCourant.NomMere,MembreCourant.PrenomMere)
    AfficherMembre(pere[0].Id,"P");
    AfficherMembre(mere[0].Id,"P");

    const Enfants= GetEnfant(pere[0].NomMembre,pere[0].PrenomMembre,mere[0].NomMembre,mere[0].PrenomMembre);
    for(let i=0;i<Enfants.length;i++){
      AfficherMembre(Enfants[i].Id,"E")
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
     b=2;
}

function GetConjoint (nom, prenom){

   
    const list2= membres.filter(e=>e.NomEpoux==nom && e.PrenomEpoux==prenom);
    return list2;
}

function GetByID(id){
    const list2= membres.filter(e=>e.Id==id);
    return list2;
                    }
 function CalculAge(DateNaissance){
    var ladate=new Date();
    var datedujour= new String;
    datedujour=ladate.toLocaleDateString();
   
    var moisjourtoday= new Number;
      moisjourtoday=parseInt(datedujour.substring(3,5)+datedujour.substring(0,2))
      var moisjournaissance=new Number;
      moisjournaissance= parseInt(DateNaissance.substr(3,2)+DateNaissance.substr(0,2));
     var Age= ladate.getFullYear()-DateNaissance.substr(6,4);
     if(moisjourtoday<moisjournaissance){
     Age--;}
     return Age;
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
};