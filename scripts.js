document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
      const name = document.getElementById('name').value;
      const visits = document.getElementById('visits').value;
      const price = document.getElementById('price').value;
      const AverageRating = document.getElementById('AverageRating').value;
      const description = document.getElementById('description').value;
      const imageCover = document.getElementById('imageCover').value;
      const duration = document.getElementById('duration').value;
      const discount = document.getElementById('discount').value;
      const places = document.getElementById('places').value;
      const stay = document.getElementById('stay').value;
      const food = document.getElementById('food').value;
  
      if (!name || !visits || !price || !AverageRating || !description || !imageCover || !startDates || !duration || !discount || !places || !stay || !food) {
        e.preventDefault();
        alert('Please fill out all required fields.');
      }
    });
  });
  