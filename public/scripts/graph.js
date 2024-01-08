let getData=async(index)=>{
    let data=await fetch("/getAllTours",{
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        // return data.tour;
        // console.log(data.tours);
            
            let ratingArray=[];
            if(index==1){
                data.tours.forEach((tour)=>{
                    ratingArray.push({x: tour.name, y: tour.AverageRating});
                })
                displayGraph(ratingArray,"Average Rating");
            }
            if(index==2){
                data.tours.forEach((tour)=>{
                    ratingArray.push({x: tour.name, y: tour.visits});
                })
                displayGraph(ratingArray,"Visits");
            }
            // console.log(ratingArray);
    })
    return data;

}
getData(1);

let ratingDis=document.getElementById("ratingDis");
let viewsDis=document.getElementById("viewsDis");
let title=document.getElementById("title");

ratingDis.addEventListener("click",()=>{
    title.innerHTML="Average Rating";
    getData(1);
})
viewsDis.addEventListener("click",()=>{
    title.innerHTML="Number of Views";
    getData(2);
})

let displayGraph=(data,title)=>{
    const ctx = document.getElementById('myChart').getContext('2d');
    const existingChart = Chart.getChart(ctx);

            // If an existing chart is found, destroy it
    if (existingChart) {
        existingChart.destroy();
    }
    // Create a chart
    const myChart = new Chart(ctx, {
        type: 'bar',
    data: {
        labels: data.map(item => item.x), // Extract x values for the labels
        datasets: [{
            label: title,
            data: data.map(item => item.y), // Extract y values for the data points
            fill: false, // Set to true for a filled area chart
            backgroundColor: 'slategrey',
            borderColor: 'rgb(75, 192, 192)', // Line color
            tension: 0.4, // Set line tension (0.0 for straight lines)
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    });
}