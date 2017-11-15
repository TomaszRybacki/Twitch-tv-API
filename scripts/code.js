const users = [
  'freecodecamp',
  'ESL_SC2',
  'OgamingSC2',
  'cretetion',
  'noobs2ninjas'
];

const game = [];
const status = [];

function start() {
  for (let i = 0; i < users.length; i += 1) {
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/' + users[i],
      async: false,
      headers: {
        'client-ID': 'rpos6f2adfyo0057q9f68tuit82i2j'
      }
    }).done((data) => {
      if (data.stream === null) {
        game[i] = 'Off-line';
        status[i] = 'off-line';
      } else if (data.stream === undefined) {
        game[i] = 'Account Closed';
        status[i] = 'off-line';
      } else {
        game[i] = data.stream.game;
        status[i] = 'on-line';
      }
    }).fail((error) => {
      alert(error);
    });
  }
  display();
}


function display() {
  for (let j = 0; j < users.length; j += 1) {
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/users/' + users[j],
      headers: {
        'client-ID': 'rpos6f2adfyo0057q9f68tuit82i2j'
      }
    }).done((user) => {
      let color;

      if (status[j] === 'on-line') {
        color = 'on';
      } else {
        color = 'off';
      }

      const html = (
        `<div class="row">
        <div class="column"> <img class="logo" src="${user.logo}"> </div>
        <div class="column"> <a target="_blank" href="https://www.twitch.tv/${user.name}">${user.display_name}</a></div>
        <div class="column"> <p class="status ${color}">${status[j]}</p></div>
        <div class="column"> <p>${game[j]}</p></div>
        </div>`
      );
      $('#list').append(html);
    }).fail((error) => {
      alert(error);
    });
  }
}

start();

