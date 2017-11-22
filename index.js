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
      $('#fail').html(`<p>Error!</p>`)
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });
  });

  // more info on individual trips
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
        ~`);
        // toggle class, hide , show?
      });
      ////////////////////////////////////////////////////
      // reserve a spot on the individual trip
//  https://trektravel.herokuapp.com/trips/1/reservations
// POST REQUEST name (string) age (integer) email (string)
      let reservationURL = `${individualURL}/reservations`;
      $.post(reservationURL formData, successCallback).fail((response) => {
        console.log("did not go so hot");
      });
    });
  });
