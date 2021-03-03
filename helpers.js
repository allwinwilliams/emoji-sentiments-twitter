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

let dataValues = (id) =>{
  return emoji_store[id];
};

let emoji_id_to_char = (id) =>{
  return emoji_store[id].char;
}

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

let resetCounter = () => {
    counts.total.count = 0;
    counts.positive.count = 0;
    counts.negative.count = 0;
    startTime = new Date($.now());
    _.mapValues (emoji_store, o => {
      o.count = 0;
    });
};
