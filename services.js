const SNAPSHOT_URL = "https://api.emojitracker.com";
const STREAM_URL = "https://stream.emojitracker.com";
const PARAMS_URL = "./params.json";

let counts = {total: 0, positive: 0, negative: 0};
let emoji_store = {};

fetch(`${SNAPSHOT_URL}/v1/status`)
  .then(response => {
    console.log(`${response.status} - API is working fine...`);
  });

fetch(`${SNAPSHOT_URL}/v1/rankings`)
  .then(response => response.json())
  .then(data => _.keyBy(data, 'id'))
  .then(data => _.mapValues (data, o => {
    o.count = 0;
    return o;
  }))
  .then((data)=>{
    return fetch(`${PARAMS_URL}`)
      .then(response => response.json())
      .then(params=>_.merge(data, params))
      .catch(err => console.log(err))
  })
  .then(object => {
    emoji_store = object;
    console.log(JSON.stringify(emoji_store));
    //  = emoji_store.map(item =>`${item.char} - ${item.id}`);
    let evsource = new EventSource(`${STREAM_URL}/subscribe/eps`);
    evsource.onmessage = (event) => {
        const updates = JSON.parse(event.data);
        // console.log(updates);
        _.mapKeys(updates, (value, key) =>{
            if(emoji_store[key].count == 0){

            }
            emoji_store[key].count += value;
            if(emoji_store[key].sentiment == "positive"){
              counts.positive += value;
            }
            if(emoji_store[key].sentiment == "negative"){
              counts.negative += value;
            }
            emoji_store[key].count += value;
            counts.total += value;
            console.log(counts);
        })
    }
  })
  .catch(err => console.log(err));
