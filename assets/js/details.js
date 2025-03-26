const params = new URLSearchParams(window.location.search);
let dogId = parseInt(params.get("id")) || 1;
console.log(dogId);

let currentPage = 1;
const containerDetail = document.getElementById("container-dog-detail");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

async function getDogDetails(dogId) {
    try {

        const api_key = 'live_doklWwlXyQJgYy2u81qtIwqZTY8OwCU3TeCgyrMyuoG1H6I8BmLuZ5jZbvg3IBzz';
        const response = await fetch(`https://api.thedogapi.com/v1/breeds/${dogId}`, {
            headers: {
                'x-api-key': api_key // esta parte pesquisei como implementava a chave de API, já que a documentação informa que para acessar as imagens é necessário solicitar sua API KEY
            }
        });
        const data = await response.json()
        console.log(data);
        
        containerDetail.innerHTML = "";

            const card = document.createElement("div");
            card.className = 'card';
            card.innerHTML = `
            <img src="${data.image?.url}" alt="${data.name}">
            <h2>${data.name}</h2>
            <p>Height: ${data.height.metric} cm</p>
            <p>Temperament: ${data.temperament}</p>
            <p>Bred for: ${data.bred_for}</p>
            <p>Life span: ${data.life_span}</p>
            <p>Origin: ${data.origin == "" ? "undefined" : data.origin}</p>
            `; // nesta parte do 'Origin' vi que alguns dados retornavam vazio (""), então para ficar igual aos que retornavam "undefined", fiz essa lógica 
            containerDetail.append(card);
            // prevButton.disabled = currentPage == 1;
        
    } catch (error) {
        cosoq.log(`Erro ao carregar os detalhes do doguinho ${error}`);
        containerDetail.innerHTML = "Erro ao carregar os detalhes do doguinho..."
    }
}

prevButton.addEventListener("click", () => {
    if (dogId > 1) {
        dogId--;
        window.location.href = `dog.html?id=${dogId}`;
    }
});

nextButton.addEventListener("click", () => {
    dogId++;
    window.location.href = `dog.html?id=${dogId}`;
});

document.addEventListener("DOMContentLoaded", () => getDogDetails(dogId))