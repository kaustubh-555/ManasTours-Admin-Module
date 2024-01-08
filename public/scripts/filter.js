function addTourCard(tour){
    const container = document.getElementById("toursContainer");
        const tourCard = document.createElement("div");
        tourCard.classList.add("tourCard");

        tourCard.innerHTML = `
            <div class="tourCardImage">
                <img src="./images/${tour.imageCover}" alt="${tour.name}" width: '170' height: '120'>
            </div>
            <div class="tourCardDetails">
                <div class="tourCardTitle">
                    <h3>${tour.name}</h3>
                </div>
                <div class="strip">
                    <div class="tourCardPrice">
                        <p>Rs. ${tour.price}</p>
                    </div>
                    <div class="tourCardBtn">
                        <a href="./tourPage.html?id=${tour._id}" class="smallBtn">View Details</a>
                    </div>
                </div>
            </div>
        `;

        if(tour.discount>0){
            let price=tour.price;
            price=price-(price*tour.discount/100);
            tourCard.innerHTML = `
            <div class="tourCardImage">
                <img src="./images/${tour.imageCover}" alt="${tour.name}" width: '170' height: '120'>
            </div>
            <div class="tourCardDetails">
                <div class="tourCardTitle">
                    <h3>${tour.name}</h3>
                </div>
                <div class="strip">
                    <div class="tourCardPrice">
                        <p id="temp">Rs. <s>${tour.price}</s> ${price}</p>
                    </div>
                    <div class="tourCardBtn">
                        <a href="./tourPage.html?id=${tour._id}" class="smallBtn">View Details</a>
                    </div>
                </div>
            </div>
        `;
        }


    container.appendChild(tourCard);
}
async function getAllTours(){
    await fetch("/getAllTours",{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
            console.log(data);
            data.tours.forEach((tour)=>{
                addTourCard(tour);
            })
    })
}
getAllTours();