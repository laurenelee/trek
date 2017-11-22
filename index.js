const BASE_URL = 'https://trektravel.herokuapp.com';
$(document).ready(() => {

  $('#load').click(function(response) {

    let fullUrl = BASE_URL + '/trips'
    $.get(fullUrl, response => {
      console.log(response);

      response.forEach((trip) => {
        let name = trip.name,
        id = trip.id,
        continent = trip.continent,
        weeks = trip.weeks;
        let allTripInfo = `<li data-id=${id}><h3>${name}:</h3> <p> Location: ${continent} Length: ${weeks} weeks. </p></li>`;
        $('#all-trips ul').append(allTripInfo);
      });
    })
    .fail(function(response){
      console.log(response);
      console.log('failure');
      $('#message').html(`<p>Error!</p>`)
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });
  });

  // begin .get to see more info on individual trips
  $('#all-trips').on('click', 'li', function() {
    let tripID = $(this).attr('data-id');
    let individualURL = `${BASE_URL}/trips/${tripID}`;

    $.get(individualURL, response => {

      $(this).append(`
        <p>ID: ${response.id}</p>
        <p>Category: ${response.category}</p>
        <p>Destination: ${response.continent} </p>
        <p>About: ${response.about} </p>
        <p>Cost: $${response.cost}</p>
        <p>~</p>`);
        $(this).append('<p class="button"> Reserve Today! </p>');
        // $(this).append('<p class="button"> Close </p>');

        $(this).click((event) => {
          event.stopPropagation();
        }); // stopping click from running too many times

        $(this).one('click', 'p', function() {
          let formInfo = `<form class="add-reservation" action="${individualURL}/reservations">
          <label for="name">Name:</label><input type="text" name="name"></input>
          <label for="age">Age:</label><input type="number" name="age"></input>
          <label for="email">Email:</label><input type="text" name="email"></input>
          <input type="submit" value="Make Reservation"</input></form>`;

          $(this).after(formInfo).hide();

        });

        // defined out in the wild


        // begin .post to generate form and attach it to li
        $(this).on('submit','.add-reservation', function(event) {
          event.preventDefault();


          let formData = $(this).serialize();

          const reservationURL = $(this).attr('action');
          console.log(reservationURL);
          const successReservation = function successReservation() {
            $("#message").html('<p> Reservation made! </p>');
            console.log('successfully made reservation!');
          };
          $.post(reservationURL, formData, successReservation);
          $(this).html("resevered!");

          // window.location.reload();
          // want something like a flash message or alert

          // $('#message').append('<p>Your reservation is complete!</p>');
          // $(this).after(formData).hide();
        }); // closing .post
      });

    });
  });
