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
    let individualURL = `${BASE_URL}/trips/${tripID}`

    $.get(individualURL, response => {

      $(this).append(`
        <p>ID: ${response.id}</p>
        <p>Category: ${response.category}</p>
        <p>Destination: ${response.continent} </p>
        <p>About: ${response.about} </p>
        <p>Cost: $${response.cost}</p>
        <p>~</p>`);
        $(this).append('<p class="button"> Reserve Today! </p>');

        $(this).click((event) => {
          event.stopPropagation();
        }); // stopping click from running too many times

        $(this).one('click', 'p', function() {
          let formInfo = `<form id="add-reservation" action="${individualURL}/reservations"><label for="name">Name:</label><input type="text" name="name"></input> <label for="age">Age:</label><input type="number" name="age"></input> <label for="email">Email:</label><input type="text" name="email"></input></form><div class="button"> <button type="submit">Make Reservation</button></div></form>`;

          $(this).after(formInfo);
          // figure out how to hide 'reserve today button'
        }); // closing the .get
        const successReservation = function successReservation() {
          $("#message").html('<p> Reservation made! </p>');
          console.log('successfully made reservation!');
        };

        // begin .post to generate form and attach it to li
        $('#all-trips').on('submit','#add-reservation', function(event) {
          event.preventDefault();

          let formData = $('#add-reservation').serialize();

          const reservationURL = $('#add-reservation').attr('action');

          $.post(reservationURL, formData, successReservation);
        });
        //     $("#message").html('<p> Reservation made! </p>');
        //   }).fail(reservationFailureCallback);
        // };
        //
        // let reservationFailureCallback = function(response) {
        //   $("#all-trips").empty();
        //   $(".errors").html("<h3>Sorry, that reservation attempt failed!</h3>");

        // would like to toggle back and forth.
        // $(this).click((event) => {
        //   event.stopPropagation();
        // });

      });
      // });
    });
  });
