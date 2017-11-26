const BASE_URL = 'https://trektravel.herokuapp.com/trips';
$(document).ready(() => {

  $('#load').click(function(response) {
    $.get(BASE_URL, response => {
      console.log(response);

      response.forEach((trip) => {
        let name = trip.name,
        id = trip.id,
        continent = trip.continent,
        weeks = trip.weeks;
        let allTripInfo = `<li data-id=${id}><h3>${name}:</h3> <p> Location: ${continent} Length: ${weeks} weeks. </p></li>`;
        $('#all-trips ul').append(allTripInfo);
        $('#load').hide(); // hiding all trips button
      });
    })
    .fail(function(response){
      console.log(response);
      console.log('failure');
      $('#message').html(`<p>Error loading all of the trips!</p>`)
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });
    // $('#message').hide();
  });

  // begin .get to see more info on individual trips
  $('#all-trips').on('click', 'li', function() {
    let tripID = $(this).attr('data-id');
    let individualURL = `${BASE_URL}/${tripID}`;

    $.get(individualURL, response => {

      $(this).append(`<div class="toggle">
      <p>ID: ${response.id}</p>
      <p>Category: ${response.category}</p>
      <p>Destination: ${response.continent} </p>
      <p>About: ${response.about} </p>
      <p>Cost: $${response.cost}</p>
      <p>~</p></div>`);
      $(this).append('<div class="toggle"><p class="button"> Reserve Today! </p></div>');

      $(this).click((event) => {
        event.stopPropagation();
      }); // stopping click from running too many times

      $(this).on('click', 'p', function() {
        let formInfo = `<form class="add-reservation" action="${individualURL}/reservations">
        <label for="name">Name:</label><input type="text" name="name"></input>
        <label for="age">Age:</label><input type="number" name="age"></input>
        <label for="email">Email:</label><input type="text" name="email"></input>
        <input type="submit" value="Make Reservation"</input></form>`;
        $(this).after(formInfo).hide();
      });

      $('#all-trips').on('click', 'li', function() {
        $('.toggle').hide(); // this switches what info is dropped down
      });

      // begin .post to generate form and attach it to li
      $(this).on('submit','.add-reservation', function(event) {
        event.preventDefault();
        let formData = $(this).serialize();
        const reservationURL = $(this).attr('action');
        const reservationResponse = function reservationResponse(status) {
          $("#message").html(`<h3> ${status} </h3>`);
        };
        const positive = 'Resevation Made!';

        $.post(reservationURL, formData, reservationResponse(positive))
        .fail(function(){
          console.log('failure');
          $('#message').html(`<p>Reservation did not correctly load, sorry!</p>`)
        })
        .always(function(){
          console.log('always even if we have success or failure');
        });
        $('li').hide();
        $('#load').show();
      }); // closing .post
    });
  });
});
