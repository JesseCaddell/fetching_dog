document.addEventListener('DOMContentLoaded', () => {
    const breedList = document.getElementById('breedList');
    const breedDetails = document.getElementById('breedDetails');

    //Fetch and display
    fetch('/breeds')
        .then(response => response.json())
        .then(breedNames => {
            breedNames.forEach(breedName => {
                const breedItem = document.createElement('li');
                breedItem.textContent = breedName;

                // Click event
                breedItem.addEventListener('click', () => {
                    fetch(`/breeds/${encodeURIComponent(breedName)}`)
                        .then(response => response.json())
                        .then(breedInfo => {
                            //display
                            breedDetails.innerHTML = `
                                <h2>${breedInfo.name}</h2>
                                <p>${breedInfo.description}</p>
                                <p>Hypoallergenic: ${breedInfo.hypoallergenic}</p>
                            `;
                        })
                        .catch(error => console.error('Error fetching breed details', error));
                });

                breedList.appendChild(breedItem);
            });
        })
        .catch(error => console.error('Error fetching breed list:', error));
});