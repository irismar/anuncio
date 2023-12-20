
const main =document.querySelector('main');
const endPage =document.getElementById('endPage');

let currentPage=1

function createCard(article){
    ///console.log(article)
const anchorElement=document.createElement('a');
const articleElement=document.createElement('article');
const titleElelement=document.createElement('strong');
const descriptonElelement=document.createElement('p');
const imageElelement=document.createElement('img');
const likElelement=document.createElement('button');
titleElelement.textContent=article.title;
descriptonElelement.textContent=article.description;
imageElelement.src=article.social_image;
imageElelement.setAttribute('data-src',article.social_image);
imageElelement.loading="lazy";
imageElelement.setAttribute('class',"lazyload");


anchorElement.href=article.url;
likElelement.textContent='gostei';
likElelement.className='likebuton';
likElelement.id=article.id;

anchorElement.appendChild(imageElelement)
anchorElement.appendChild(titleElelement)
anchorElement.appendChild(descriptonElelement)
articleElement.appendChild(anchorElement)
articleElement.appendChild(likElelement)
return articleElement
}

function createCards(articles){
   
 return articles.map((article) => createCard(article))


}

async function getPost(){
const response1 =await fetch(`https://dev.to/api/articles?per_page=1&page=${currentPage}`)
const response2 =await fetch(`https://www.anuncio360.com/api_mapa/div.php?order=${currentPage}`)
const data=await response1.json()
console.log(response1)
console.log(data)
const cards= createCards(data)
console.log(cards)
cards.forEach((card)=> {
    main.appendChild(card)
    ///console.log(card)
} )
currentPage +=1
}
observer = new IntersectionObserver((entries) =>{ 

if(entries[0].isIntersecting)  getPost()

else console.log('Nao estar visivel')
}

);
observer.observe(endPage)
