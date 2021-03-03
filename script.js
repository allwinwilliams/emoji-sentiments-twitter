let startTime = new Date($.now());
$('#roller-coaster').hide();
$('#emoji-battle').hide();

let barRace = () => {
  $('#header-chart-container').show();
  $('#roller-coaster').hide();
  $('#emoji-battle').hide();
  $('#bar-race-button').addClass('active');
  $('#button-spread-button').removeClass('active');
  $('#roller-coaster-button').removeClass('active');
  $('#emoji-battle-button').removeClass('active');
};

let rollerCoaster = () => {
  $('#header-chart-container').hide();
  $('#roller-coaster').show();
  $('#emoji-battle').hide();
  $('#bar-race-button').removeClass('active');
  $('#button-spread-button').removeClass('active');
  $('#roller-coaster-button').addClass('active');
  $('#emoji-battle-button').removeClass('active');
};

let emojiBattle = () => {
  $('#header-chart-container').hide();
  $('#roller-coaster').hide();
  $('#emoji-battle').show();
  $('#bar-race-button').removeClass('active');
  $('#button-spread-button').removeClass('active');
  $('#roller-coaster-button').removeClass('active');
  $('#emoji-battle-button').addClass('active');
};

let updateTime = () => {
  $('#time-passed').text(`${Math.floor((new Date($.now()) - startTime) / 1000) }`);
};

$(document).ready(() => {
  setInterval(() => {
    updateTime();
  }, 1000);
});
