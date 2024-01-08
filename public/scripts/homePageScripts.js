let loginStripe=document.getElementById("loginStrip");
let navBarContainer=document.getElementById("navBarContainer");
let mostPopularTours=document.getElementById("mostPopularTours");

function loginChanges(userobj){
    // navBarContainer.removeChild(loginStripe);
    // let logout=createElement("a");
    loginStripe.removeChild(document.getElementById("loginBtn"));
    loginStripe.removeChild(document.getElementById("registerBtn"));
    const anchor = document.createElement('a');
    anchor.setAttribute('href', '#'); // Set the href attribute as needed
    anchor.setAttribute('class', 'authBtn'); // Set the class name
    // Set inner text or content for the anchor element
    anchor.textContent = 'logout'; // Replace with the desired text/content
    anchor.addEventListener("click",()=>{
        // deleteCookie('user'); 
        fetch("/logout",{
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then((response)=>{return response.json()}).then((data)=>{
            window.location.href = "./index.html";
        });
        alert('Logged out successfully!');
        // window.location.href = "./index.html";
    })
    // Append the anchor element to the body or any desired container
    loginStripe.appendChild(anchor);
}

function addTourCard(id,tour){
    const container = document.getElementById(id);
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
                        <p id="temp">Rs. ${tour.price}</p>
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

function addPopular(tourList){
    tourList.forEach((tour)=>{
        addTourCard("mostPopularTours",tour);
    })
}

function addDiscountTours(tourList){
    tourList.forEach((tour)=>{
        addTourCard("offerTours",tour);
    })
}

let user=fetch("/getUser",{
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
}).then((response)=>{
    return response.json();
}).then((data)=>{
    if(data.status==true){
        return data;
    }
})
user.then((data)=>{
    if(data.status==true){
        loginChanges(data.user);
    }
})

async function getHomePageData(){
    await fetch("/getHomePageTours",{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        addPopular(data.popularTours);      
        addDiscountTours(data.discountTours)
    })
}

getHomePageData();