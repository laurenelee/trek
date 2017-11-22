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

      $('#all-trips h3').on('click', onTripClick)
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
  const onTripClick = function onTripClick() {
    const tripLi = $(this.parentElement)
    let tripID = tripLi.attr('data-id');
    let individualURL = `${BASE_URL}/trips/${tripID}`

    $(this).click((event) => {
      event.stopPropagation();
    }); // stopping click from running too many times

    $.get(individualURL, response => {

      tripLi.append(`
        <p>ID: ${response.id}</p>
        <p>Category: ${response.category}</p>
        <p>Destination: ${response.continent} </p>
        <p>About: ${response.about} </p>
        <p>Cost: $${response.cost}</p>
        <p>~</p>`);
        tripLi.append('<p class="button"> Reserve Today! </p>');

        $(this).one('click', 'p', function() {
          let formInfo = `<form id="add-reservation" action="${individualURL}/reservations">
          <label for="name">Name:</label><input type="text" name="name"></input>
          <label for="age">Age:</label><input type="number" name="age"></input>
          <label for="email">Email:</label><input type="text" name="email"></input>
          <input type="submit" value="Make Reservation"</input></form>`;


          tripLi.after(formInfo);
          // figure out how to hide 'reserve today button'

          // begin .post to generate form and attach it to li
          $('#add-reservation').on('submit', function(event) {
            event.preventDefault();
            console.log('button was pressed');

            const reservationURL = $('#add-reservation').attr('action');

            let formData = $('#add-reservation').serialize();

            const successReservation = function successReservation() {
              $("#message").html('<p> Reservation made! </p>');
              console.log('successfully made reservation!');
            };

            $.post(reservationURL, formData, successReservation);
            console.log(reservationURL);
          }); // closing .submit
// NOW GET RID OF FORM AND PROVIDE A MESSAGE in place


          //     $("#message").html('<p> Reservation made! </p>');
          //   }).fail(reservationFailureCallback);
          // };
          //
          // let reservationFailureCallback = function(response) {
          //   $("#all-trips").empty();
          //   $(".errors").html("<h3>Sorry, that reservation attempt failed!</h3>");
        });
      });
    };

  });
