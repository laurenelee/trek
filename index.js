const BASE_URL = 'https://trektravel.herokuapp.com';
$(document).ready(() => {

  $('#load').click(function(response) {

    let fullUrl = BASE_URL + '/trips'
    $.get(fullUrl, response => {
      // console.log('success!');
      console.log(response);

      response.forEach((trip) => {
        let name = trip.name,
        id = trip.id,
        continent = trip.continent,
        weeks = trip.weeks;
        let allTripInfo = `<h3><a class="title" href=>${name}:</a></h3> <p> Location: ${continent} Length: ${weeks} weeks. </p>`;
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
});
// });

// more info on individual trips
$('#all-trips').on('click', 'a', function(event) {
  let individualURL = `${BASE_URL}/trips/${this.id}`
  // `"${$(this).html()}"`
  // this = trip.name.id
  // console.log(individualURL);
  $.get(individualURL, response => {
    console.log(response.id);
    $('#all-trips').append(`${response.id} ${response.destination}`);
    // let id = response.id;
    // destination, name
    // $('ul').append(id);
  });
});
