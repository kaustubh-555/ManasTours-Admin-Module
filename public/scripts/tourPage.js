let id=window.location.href;
id=id.substring(id.lastIndexOf('=')+1);
console.log(id);

function showData(tour){
    console.log(tour)
    document.getElementById("tourImage").src=tour.imageCover;
    document.getElementById("tourName").innerHTML=tour.name;
    document.getElementById("info").innerHTML=tour.description;
    document.getElementById("priceValue").innerHTML=tour.price;
    document.getElementById("durationValue").innerHTML=tour.duration;
    document.getElementById("stayValue").innerHTML=tour.stay;
    let palcesContainer=document.getElementById("places");
    let placesArray=tour.places;
    if(tour.discount>0){
        let price=tour.price;
        price=price-(price*tour.discount/100);
        document.getElementById("priceValue").innerHTML=`<s>${tour.price}</s> ${price}`;

    }
    placesArray.forEach(element => {
        let place=document.createElement("li");
        place.innerHTML=element;
        palcesContainer.appendChild(place);
    });
}   


let Rate=document.getElementById("Rate");

let tour=fetch("/getTourData",{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: id})
}).then((response)=>{
    return response.json();
}).then((data)=>{
        showData(data.tour);
})



let user=fetch("/getUser",{
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
}).then((response)=>{
    return response.json();
}).then((data)=>{
    if(data.status==true){
        return data;
    }
    else{
        window.location.href = "login-page.html";
    }
})
user.then((data)=>{
    if(data.status==true){
        // loginChanges(data.user);
        Rate.addEventListener("click",()=>{
            showRatingDialog();
        })
    }
    else{
        window.location.href = "login-page.html";
    }
})


function showRatingDialog() {
    const ratingDialog = document.getElementById("ratingDialog");
    // Check if the user is logged in (you can replace this condition)
    const userIsLoggedIn = true;
  
    if (userIsLoggedIn) {
      ratingDialog.style.display = "block";
    } else {
      // Redirect to the login page (replace 'login.html' with the actual URL)
      window.location.href = "login.html";
    }
  }
  
  function closeRatingDialog() {
    const ratingDialog = document.getElementById("ratingDialog");
    ratingDialog.style.display = "none";
  }
  
  function setRating(rating) {
    // Perform the necessary action with the user's rating (e.g., send it to the server)
    console.log("User rating: " + rating);
    fetch("/updateRating",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id,rating: rating})
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data)
    })
    closeRatingDialog();
  }
  
