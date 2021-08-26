let sound, synth, am_1, am_2;
let audio_on = false;
let audio_enabled = false;
let playEmojiTone = (emoji) => {
  // if(emoji.sentiment == "positive"){
  //   am_1.triggerAttackRelease(Tone.Midi(emoji.midiValue).toFrequency(), 1);
  // } else if (emoji.sentiment == "negative"){
  //   am_2.triggerAttackRelease(Tone.Midi(emoji.midiValue).toFrequency(), 1);
  // }
  // console.log(emoji.midiValue);
  // if(emoji.sentiment == "positive"){
  //
  // }
  synth.triggerAttackRelease(
    Tone.Midi(emoji.midiValue).toFrequency(),
    0.1, "+0.001n", 0.6
  );
}

$('#audio-button').click(async () => {
  if(audio_enabled == false){
    console.log('audio is ready');
    await Tone.start();
    // am_1 = new Tone.AMSynth(Tone.Synth).toDestination();
    // am_2 = new Tone.AMSynth(Tone.Synth).toDestination();
    // sound = Tone.Synth;
    sound = Tone.MonoSynth;
    synth = new Tone.PolySynth(sound).toDestination();
    // synth.maxPolyphony = 64;

    // synth.triggerAttackRelease([Tone.Midi(60).toFrequency()], 0.1);
    audio_enabled = true;
  }
  if(audio_on == false){
    audio_on = true;
    $('#audio-off').removeClass('d-none');
    $('#audio-on').addClass('d-none');
  } else if(audio_on == true){
    audio_on = false;
    $('#audio-off').addClass('d-none');
    $('#audio-on').removeClass('d-none');
  }

});


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
