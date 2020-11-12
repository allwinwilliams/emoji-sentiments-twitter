let getIdOfSentiment = (sentiment_type = 'tears') => {
  let club = {
    positive: [],
    negative: []
  }
  let emojis = _.pickBy(emoji_store, emoji => emoji.sentiment_type == sentiment_type);
  _.map(emojis, emoji => {
    if(emoji.sentiment == 'positive'){
      club.positive.push(emoji.id)
    }
    if(emoji.sentiment == 'negative'){
      club.negative.push(emoji.id)
    }
  });
  return club;
};

let contest = (sentiment_type = 'tears') => {
  let emoji_counts = {
    positive: 0,
    negative: 0
  };
  let club = getIdOfSentiment(sentiment_type);
  _.map(club, (id) => {
    if(emoji_store[id].sentiment == 'positive'){

    }
    if(emoji_store[id].sentiment == 'negative'){

    }
  })
};

$('#bubble-spread').hide();
$('#roller-coaster').hide();

let barRace = () => {
  $('#header-chart-container').show();
  $('#roller-coaster').hide();
  $('#bubble-spread').hide();
  $('#bar-race-button').addClass('active');
  $('#button-spread-button').removeClass('active');
  $('#roller-coaster-button').removeClass('active');
};

let bubblesSpread = () => {
  $('#header-chart-container').hide();
  $('#roller-coaster').hide();
  $('#bubble-spread').show();
  $('#bar-race-button').removeClass('active');
  $('#button-spread-button').addClass('active');
  $('#roller-coaster-button').removeClass('active');
};

let rollerCoaster = () => {
  $('#header-chart-container').hide();
  $('#bubble-spread').hide();
  $('#roller-coaster').show();
  $('#bar-race-button').removeClass('active');
  $('#button-spread-button').removeClass('active');
  $('#roller-coaster-button').addClass('active');
};
