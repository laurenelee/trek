const BASE_URL = 'https://trektravel.herokuapp.com';
$(document).ready(() => {

  $('#load').click(function(response) {

    let fullUrl = BASE_URL + '/trips'
    $.get(fullUrl, response => {
      // console.log('success!');
      console.log(response);

      response.forEach((trip) => {
        let name = trip.name,
        continent = trip.continent,
        weeks = trip.weeks;
        let allTripInfo = `<h3>${name}:</h3> <p> Location: ${continent} Length: ${weeks} weeks. </p>`;

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
// Should be able to see id, name, destination, continent, about, category, weeks and cost
// });
