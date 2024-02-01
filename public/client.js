document.addEventListener('DOMContentLoaded', () => {
    const breedList = document.getElementById('breedList');
    const breedDetails = document.getElementById('breedDetails');

    //Fetch and display
    fetch('/breeds')
        .then(response => response.json())
        .then(breedInfoArray => {
            breedInfoArray.forEach(breedInfo => {
                const breedItem = document.createElement('li');
                breedItem.textContent = breedInfo.name;

                // // hyperlink (placeholder for now)
                // const breedLink = document.createElement('a');
                // breedLink.href = '#'; //this is the placeholder
                // breedLink.textContent = breedInfo.name;
                // breedItem.appendChild(breedLink);

                // Click event
                breedItem.addEventListener('click', () => {
                    const breedId = breedInfo.id;

                    fetch(`/breeds/${encodeURIComponent(breedId)}`)
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