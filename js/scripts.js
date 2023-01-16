const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cbafa523abmsh123bcedce66d679p16a252jsncedef37d649d',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

let floyd = document.getElementById("floyd");
let daft = document.getElementById("daft");
let metallica = document.getElementById("metallica");
let albumList=[];
let songList=[];
const getfloyd = () => { 
fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=pink+floyd', options)
	.then(response => response.json())
    .then(response => renderAlbum(response.data, floyd))
	.catch(err => console.error(err));
}
const getDaft = () => { 
fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=daft-punk', options)
	.then(response => response.json())
    //.then(response=>console.log(response))
    .then(response => renderAlbum(response.data, daft))
	.catch(err => console.error(err));
}
const getMetallica = () => { 
fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=metallica', options)
	.then(response => response.json())
    .then(response => renderAlbum(response.data, metallica))
	.catch(err => console.error(err));
}
const renderAlbum = (fetchedAlbum, location)=>{
    let album = document.createElement("div");
    album.innerHTML+=`<div class="col"><h2><ol>`
    for(let i=0;i<fetchedAlbum.length;i++){
        album.innerHTML+=`<li><img><img src="${fetchedAlbum[i].album.cover}">${fetchedAlbum[i].title}</li>`
        albumList.push(fetchedAlbum[i].album.cover);
        songList.push(fetchedAlbum[i].title);
    }
    album.innerHTML+="</ol></div><hr>"
    location.appendChild(album);
}

function countUniqueAlbums(){
    let unique_elements = []
    for (let i = 0; i < albumList.length; i++) {
    if (unique_elements.indexOf(albumList[i]) === -1) {
        unique_elements.push(albumList[i])
    }
}
console.log(unique_elements.length);
}
const button = document.getElementById("modal-button");
const modal = document.getElementById("my-modal");
let modalBody = document.getElementById("modal-body");

let filled = 0;
button.onclick = function() {
    modal.style.display = "block";
    if(filled === 0){
        fillModal();
    }
}

function fillModal(){
    modalBody.innerHTML+="<ul>";
    for(let i=0;i<songList.length;i++){
        modalBody.innerHTML+=`
        <li>${songList[i]}</li>
        `
    }
    modalBody.innerHTML+="</ul>"
    filled =1;
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
window.onload = function(){
    getDaft();
    getMetallica();
    getfloyd();
}