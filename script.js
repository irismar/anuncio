function getDistanceFromLatLonInKm(latitude1,longitude1,  latitude2,longitude2) {
   
      


            // Inicio dos calculos 1° parte
            var p1 = Math.cos((90 - latitude1) * (Math.PI / 180));
            // Inicio dos calculos 2° parte
            var p2 = Math.cos((90 - latitude2) * (Math.PI / 180));
            // Inicio dos calculos 3° parte
            var p3 = Math.sin((90 - latitude1) * (Math.PI / 180));
            // Inicio dos calculos 4° parte
            var p4 = Math.sin((90 - latitude2) * (Math.PI / 180));
            // Inicio dos calculos 5° parte
            var p5 = Math.cos((longitude1 - longitude2) * (Math.PI / 180));

            var KM = ((Math.acos((p1 * p2) + (p3 * p4 * p5)) * 6371) * 1.15);
            return  Math.round(KM); 
}

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('myParam');
console.log(myParam)
const main =document.querySelector('main');
const lat =document.querySelector('#latitude');
const log =document.querySelector('#longitude');
const endPage =document.getElementById('endPage');

let currentPage=1
document.addEventListener('DOMContentLoaded', function(){

    var target = document.querySelector('#map');
    
    navigator.geolocation.getCurrentPosition(function(position) {
        
        const latitude   = position.coords.latitude;
        const longitude  = position.coords.longitude;
        var latitu = document.getElementById("latitude");
        lat.textContent = latitude;
        log.textContent = longitude;
        var align = latitu.getAttribute(longitude);
        
    });
});
//////////////funcao para resgistrar////////que usuario clocou no mapa///
async  function  mapa(lat,log,latlocal,loglocal,id){
    const response =await fetch(`https://www.anuncio360.com/api_mapa/log.php?mensagem="usuario acessou o mapa"&id=${id}`)
    const data=await response.json()
    console.log(data)
    console.log(lat,log,latlocal,loglocal);

}

async function getPost(){
    let elemento = document.getElementById("latitude");
    let elemento2 = document.getElementById("longitude");
    var latlocal = elemento.textContent;
    var loglocal = elemento2.textContent;
   
   //// console.log('Resultado do texto coletado com o textContent: ', textoComTextContent);
////const response =await fetch(`https://dev.to/api/articles?per_page=2&page=${currentPage}`)
const response =await fetch(`https://www.anuncio360.com/api_mapa/div.php?order=${currentPage}`)
const data=await response.json()
///console.log(data)
var distancia = (getDistanceFromLatLonInKm(
  latlocal, loglocal, data.lat,data.log
  
 ));
 
 console.log(distancia);
const articleElement=document.createElement('article');
main.appendChild(articleElement)

const criardiv=document.createElement('div')

criardiv.setAttribute('class',"container");
criardiv.innerHTML += ` <div id=avatar><img  class="avatar" src='${data.avatar}' loading="lazy"></div>
 <div id=usuario><h1>  ${data.nome_anunciante}</h1></div>
 <div id=usuario><h2>  ${data.endereco}</h2>  <h3><a onclick="mapa(${data.lat},${data.log},${latlocal},${loglocal},${data.id})" href="javascript:void(0) ">Dirigir até a loja ${distancia}KM <i class="fa-solid fa-location-dot"></i></h3></a></div>
 <div id="endereco"><img  src='${data.fotowatapp}' loading="lazy">
 <div id=descricao><p>  ${data.descricao}</p></div>
 <div class="caixalink"> 
 <i class="fa-solid fa-money-bill-1"> ${data.preco}</i>
 </div>
 <div class="caixalink"> 
 <div class="likebuton">
<a href="#">  <i class="fa-solid fa-heart"></i> gostei</div></a>
<a href="#"> <div class="likebuton"> <i class="fa-solid fa-thumbs-down"></i> não gostei</div></a>
 </div>
 `;
articleElement.appendChild(criardiv)


currentPage +=1
}

observer = new IntersectionObserver((entries) =>{ 

if(entries[0].isIntersecting)  getPost()

else console.log('Nao estar visivel')
}

);
observer.observe(endPage)
