

const getPokemonsIds = pokeApiResults => pokeApiResults.map(({url}) => {
    const urlAsArray = url.split ('/')
    return urlAsArray.at(urlAsArray.length - 2)
  }
 );
const cargaPagina = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results: pokeApiResults } = await response.json();
   const ids = getPokemonsIds(pokeApiResults);
    const promises = ids.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`));
    const responses = await Promise.allSettled(promises);
    const fulfilled = responses.filter(response => response.status === 'fulfilled');

    //const imgPromises = fulfilled.map(response => response.value.json().then(data => data.sprites.front_default));

    const imgPromises = fulfilled.map(response => response.value.json()
      .then(result => ({
      name: result.name,
      image: result.sprites.front_default,
      type: result.types.map((type) => type.type.name).join(', '),
      id:result.id
    })));
    
const imgUrls = await Promise.all(imgPromises);
    showPictures(imgUrls)
  } catch (error) {
    console.log("Algo va mal", error);
  }
};

const showPictures = (pictures) => {
  const ol$$ = document.querySelector('ol');
  for (const cadaUno of pictures) {
    const li$$= document.createElement('li');
    const h$$ = document.createElement('h1')
    const img$$ = document.createElement('img');
    const h2$$ = document.createElement('h2')
    const p$$ = document.createElement('p')
    
    h$$.innerText = cadaUno.name;
    h2$$.innerText = cadaUno.id;
    p$$.innerText = cadaUno.type
    img$$.setAttribute('src', cadaUno.image);
    
    li$$.appendChild(img$$)
    li$$.appendChild(h2$$)
    li$$.appendChild(h$$)
    li$$.appendChild(p$$)


    li$$.className=('box')



    ol$$.appendChild(li$$);
 
  if(cadaUno.type.includes('fire')){
    li$$.style.backgroundColor="#F2B194"
  } else if(cadaUno.type.includes('grass')) {
    li$$.style.backgroundColor="#DEFDE0"
  } else if(cadaUno.type.includes('electric')) {
    li$$.style.backgroundColor="#F2E1A4"
  }else if(cadaUno.type.includes('ice')) {
    li$$.style.backgroundColor="#DEF3FD"
  }else if(cadaUno.type.includes('water')) {
    li$$.style.backgroundColor="#A9CFED"
  }else if(cadaUno.type.includes('ground')) {
    li$$.style.backgroundColor="#F4E7DA"
  }else if(cadaUno.type.includes('rock')) {
    li$$.style.backgroundColor="#D5D5D4"
  }else if(cadaUno.type.includes('fairy')) {
    li$$.style.backgroundColor="#FCEAFF"
  }else if(cadaUno.type.includes('poison')) {
    li$$.style.backgroundColor="#98D7A5"
  }else if(cadaUno.type.includes('bug')) {
    li$$.style.backgroundColor="#F8D5A3"
  }else if(cadaUno.type.includes('psychic')) {
    li$$.style.backgroundColor="#EAEDA1"
  }else if(cadaUno.type.includes('fighting')) {
    li$$.style.backgroundColor="#E6E0D4"
  }else if(cadaUno.type.includes('normal')) {
    li$$.style.backgroundColor="#FFFFFF"
  }else if(cadaUno.type.includes('dragon')) {
    li$$.style.backgroundColor="#97B3E6"
  }
 
  }
  

}

cargaPagina();


const filter=document.querySelector('.input-text');
const cardList= document.querySelector('#pokedex');

function filterItems(e){
    const cards= cardList.querySelectorAll('li');
    const text= e.target.value.toLowerCase();

   cards.forEach((card) =>{
    const cardName= card.querySelector('h1').textContent
    .toLowerCase();
    if (cardName.indexOf(text) != -1) {
      card.style.display = 'flex';
    }else{
      card.style.display='none';
    }

  ;})
;  }

filter.addEventListener('input',filterItems)
