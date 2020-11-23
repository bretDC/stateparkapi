'use strict';

const apiKey = 'ehwIWkzW4n94yRhUjt9aaHzGhPz6IM1NsfZcZ87K';

const searchURL = 'https://developer.nps.gov/api/v1/parks';


function displayResults(responseJson) {
  console.log(responseJson);
  // if there are previous results, remove them
  $('.results-list').empty();

  for (let i = 0; i < responseJson.data.length; i++) {
  $('.results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
           <p>${responseJson.data[i].description}</p>
           <h3>${responseJson.data[i].url}</h3>
      </li>`
    );
  }
  // display the results section  
  $('.results-list').removeClass('hidden');
}

function formatQueryParameters(params) {
const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
return queryItems.join('&');
}

function getStatePark(states, maxResults=10) {
const params = {
  api_key: apiKey,
  stateCode: states,
  maxResults
};
const queryStr = formatQueryParameters(params)
const resultURL = searchURL + '?' + queryStr;

fetch(resultURL)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

function onSubmit() {
$('form').submit(event => {
  event.preventDefault();
  const statesArray = $('#js-search-term').val().split(',');
  const maxResults = $('#js-max-results').val();
  getStatePark(statesArray, maxResults);
});
}

$(onSubmit);