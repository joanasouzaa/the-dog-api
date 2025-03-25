const container = document.getElementById("container-dog");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentPage = 1;
async function getDogs(page) {
    try {
        container.innerHTML = "Carregando..."

        const api_key = 'live_doklWwlXyQJgYy2u81qtIwqZTY8OwCU3TeCgyrMyuoG1H6I8BmLuZ5jZbvg3IBzz';
        const response = await fetch(`https://api.thedogapi.com/v1/breeds/?limit=1&page=${page}`, {
            headers: {
                'x-api-key': api_key
            }
        });
        const data = await response.json();
        container.innerHTML = "";
        console.log(data)

        data.forEach(dog => {
            const card = document.createElement('div');
            card.className = "card";
            card.innerHTML = `
                <img src="${dog.image?.url || ''}" alt="${dog.name}">
                <h3>${dog.name}</h3>
                <p>Height: ${dog.height.metric} cm</p>
                <p>Temperament: ${dog.temperament}</p>
                <p>Bred for: ${dog.bred_for}</p>
                <p>Life span: ${dog.life_span}</p>
                <p>Origin: ${dog.origin == "" ? "Unknow" : dog.origin}</p>
            `;
            container.appendChild(card);
        });
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