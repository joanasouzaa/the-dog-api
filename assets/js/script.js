const container = document.getElementById("container-dog");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentPage = 1;
async function getDogs(page) {
    try {
        container.innerHTML = "Carregando..."
        const limit = 30;

        const api_key = 'live_doklWwlXyQJgYy2u81qtIwqZTY8OwCU3TeCgyrMyuoG1H6I8BmLuZ5jZbvg3IBzz'; // API KEY necessária para obter imagens
        const response = await fetch(`https://api.thedogapi.com/v1/breeds/?limit=${limit}&page=${page}`, {
            headers: {
                'x-api-key': api_key // esta parte pesquisei como implementava a chave de API, já que a documentação informa que para acessar as imagens é necessário solicitar sua API KEY
            }
        });
        const data = await response.json();
        container.innerHTML = "";
        // console.log(data)

        data.forEach(dog => {
            const card = document.createElement('div');
            card.className = "card";
            card.innerHTML = `
                <img src="${dog.image.url}" alt="${dog.name}">  
                <h3>${dog.name}</h3>
            `; 
            card.addEventListener('click', ()=>{
                window.location.href = `dog.html?id=${dog.id}`;
            });
            container.appendChild(card);
        })
        prevButton.disabled = currentPage == 1;

    } catch (error) {
        console.log(`Erro ao carregar os doguinhos: ${error}`);
        container.innerHTML = "Erro ao carregar os doguinhos na página";
    }
}
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage -= 1;
        getDogs(currentPage);
    }
});

nextButton.addEventListener("click", () => {
    currentPage++;
    getDogs(currentPage);
});

document.addEventListener("DOMContentLoaded", () => getDogs(currentPage));