const SNAPSHOT_URL = "https://api.emojitracker.com";
const STREAM_URL = "https://stream.emojitracker.com";
const PARAMS_URL = "./params.json";

let counts = {
  total: {
    count: 0,
    score: 0,
    color: '#000000',
    name: 'total',
    emojis: ''
  }, positive: {
    count: 0,
    score: 0,
    color: '#00bfd7',
    name: 'positive',
    emojis: ''
  }, negative: {
    count: 0,
    score: 0,
    color: '#ff652f',
    name: 'negative',
    emojis: ''
  }
};

let emoji_store = {};

fetch(`${SNAPSHOT_URL}/v1/status`)
  .then(response => {
    console.log(`${response.status} - API is working fine...`);
  });

fetch(`${SNAPSHOT_URL}/v1/rankings`)
  .then(response => response.json())
  .then(data => _.keyBy(data, 'id'))
  .then((data)=>{
    return fetch(`${PARAMS_URL}`)
      .then(response => response.json())
      .then(params=>_.merge(data, params))
      .catch(err => console.log(err))
  })
  .then(data => {
    _.map(data, function(data) {
        counts.total.score += data.score;
        if(data.sentiment){
          if(data.sentiment == 'positive'){
            counts.positive.score += data.score;
            counts.positive.emojis += data.char;
          }
          if(data.sentiment == 'negative'){
            counts.negative.score += data.score;
            counts.negative.emojis += data.char;
          }
        }
    });
    return data;
  })
  .then(object => {
    emoji_store = object;
    emoji_list =  _.sortBy(emoji_store, [(emoji) => - emoji.score]);
    emoji_list = _.take(emoji_list, 50);
    renderDropDown("#emoji-dropdown-left", emoji_list);
    renderDropDown("#emoji-dropdown-right", emoji_list);
    // console.log(JSON.stringify(emoji_store));
    //  = emoji_store.map(item =>`${item.char} - ${item.id}`);
    let evsource = new EventSource(`${STREAM_URL}/subscribe/eps`);
    evsource.onmessage = (event) => {
      const updates = JSON.parse(event.data);
      // console.log(updates);
      _.mapKeys(updates, (value, key) =>{
          if(emoji_store[key].count == 0){

          }
          emoji_store[key].count += value;
          if(audio_on && emoji_store[key].midiValue){
            playEmojiTone(emoji_store[key]);
          }

          if(emoji_store[key].sentiment == "positive"){
            counts.positive.count += value;
            counts.positive.score += value;
          }
          if(emoji_store[key].sentiment == "negative"){
            counts.negative.count += value;
            counts.negative.score += value;
          }
          emoji_store[key].count += value;
          emoji_store[key].score += value;
          counts.total.count += value;
          counts.total.score += value;
          // console.log(counts);
          updateCharts();
      });
    }
  })
  .catch(err => console.log(err));
