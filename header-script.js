let updateCounts = () => {
  $('#live-count').text(`${counts.positive.count + counts.negative.count}`);
  $('#total-count').text(`${counts.positive.score + counts.negative.score}`);
  let positive_percent = 0;
  let negative_percent = 0;
  if(isOnlyLive){
    positive_percent = Math.round(100 * counts.positive.count / (counts.positive.count + counts.negative.count));
    negative_percent = Math.round(100 * counts.negative.count / (counts.positive.count + counts.negative.count));
  } else {
    positive_percent = Math.round(100 * counts.positive.score / (counts.positive.score + counts.negative.score));
    negative_percent = Math.round(100 * counts.negative.score / (counts.positive.score + counts.negative.score));
  }
  $('#trivia')
    .html(`<h3>The positive emojis make up
      <b class='positive'>${positive_percent || 0} %</b>
      and the negative ones are at
      <b class='negative'>${negative_percent || 0} %</b>
    .</h3>`)
};

let switchToLive = () => {
  $('#counter-reset-button').css('visibility', 'visible');
  $('#live-count-selector').addClass('active');
  $('#total-count-selector').removeClass('active');
  isOnlyLive = true;
  _.map(fights, (fight) =>{
    fight.isOnlyLive = true;
  });
};

let switchToTotal = () => {
  $('#counter-reset-button').css('visibility', 'hidden');
  $('#total-count-selector').addClass('active');
  $('#live-count-selector').removeClass('active');
  isOnlyLive = false;
  _.map(fights, (fight) =>{
    fight.isOnlyLive = false;
  });
};

let updateBar = (bar, positive, negative) => {
    const distance = graphWidth / (positive + negative);
    bar
    .selectAll('rect')
    .data([positive, negative])
    .attr('width', d => d * distance)
    .attr('transform', (d,i) =>{
      if(i == 1){
        return `translate(${positive * distance}, 0)`
      }
    })
};

let updateLabelTexts = (element, data, isLive) =>{
  let positive_count = isLive? data.positive.count : data.positive.score;
  let negative_count = isLive? data.negative.count : data.negative.score;
  d3.select('#text-positive-count')
    .text(positive_count);

  d3.select('#text-negative-count')
    .text(negative_count);

  // d3.select('#text-label-positive')
  //   .text(data.positive.emojis);
  //
  // d3.select('#text-label-negative')
  //   .text(data.negative.emojis);
};

let updateCharts = () => {
  updateCounts();
  updateLabelTexts(barChart, counts, isOnlyLive);
  if(isOnlyLive == true){
    updateBar(barChart, counts.positive.count, counts.negative.count);
  }else{
    updateBar(barChart, counts.positive.score, counts.negative.score);
  }
}

const width = 1500;
const height = 400;
const margin = {'top': 100, 'right': 300, 'bottom': 100, 'left': 300};
const graphWidth = width - margin.left - margin.right;
const graphHeight = height - margin.top - margin.bottom;

let isOnlyLive = true;

const svg = d3.select('#header-chart-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('id', 'header-chart');

const barChart = svg.append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`)
  .attr('id', 'total-bar-chart');

const barElements = barChart
  .selectAll('rect')
  .data([counts.positive, counts.negative])
  .enter()
  .append('rect')
  .attr('class', 'sentiments')
  .attr('height', graphHeight)
  .attr('fill', d => d.color)
  .attr('id', d => `bar-${d.name}`);

const textLabelGroup = svg
  .append('g')
  .attr('id', 'text-elements')
  .attr('transform', `translate(${100}, ${100})`);

const textLabels = textLabelGroup
  .selectAll('g')
  .data([counts.positive, counts.negative])
  .enter()
  .append('g')
  .attr('class', 'count-labels')
  .attr('id', d => `text-label-${d.name}`);

d3.select('#text-label-positive')
  .append('text')
  .text('Positive')
  .attr('fill', '#00bfd7')
  .attr('transform', `translate(${0}, ${30})`);

d3.select('#text-label-negative')
  .append('text')
  .text('Negative')
  .attr('fill', '#ff652f')
  .attr('transform', `translate(${1200}, ${30})`);

d3.select('#text-label-positive')
  .append('text')
  .attr('id', 'text-positive-count')
  .attr('fill', '#00bfd7')
  .attr('font-weight', 'bold')
  .attr('font-size', '1.5em')
  .attr('transform', `translate(${0}, ${80})`);

d3.select('#text-label-negative')
  .append('text')
  .attr('id', 'text-negative-count')
  .attr('fill', '#ff652f')
  .attr('font-weight', 'bold')
  .attr('font-size', '1.5em')
  .attr('transform', `translate(${1200}, ${80})`);

let positive_label = d3.select('#text-label-positive')
  .append('text')
  .text('')
  .attr('fill', '#00bfd7')
  .attr('font-size', '1.2em')
  .attr('transform', `translate(${0}, ${80})`)
  .attr('x', '0')
  .attr('y', '10');

positive_label
  .append('tspan')
  .text('❤️😂😍😊💕😘😁👌')
  .attr('x', '0')
  .attr('y', '50');
positive_label
  .append('tspan')
  .text('😉👍😎😋😄💗💛💞')
  .attr('x', '0')
  .attr('y', '80');
positive_label
  .append('tspan')
  .text('😆😀😃😬😇😚😙😗')
  .attr('x', '0')
  .attr('y', '110');


let negative_label = d3.select('#text-label-negative')
  .append('text')
  .text('')
  .attr('fill', '#ff652f')
  .attr('font-size', '1.2em')
  .attr('transform', `translate(${1200}, ${80})`);

  negative_label
    .append('tspan')
    .text('😭😒😔😩😏💔😢')
    .attr('x', '0')
    .attr('y', '50');
  negative_label
    .append('tspan')
    .text('😑😞😕😡😫👈😤')
    .attr('x', '0')
    .attr('y', '80');
  negative_label
    .append('tspan')
    .text('😣😓😠😖👎😰')
    .attr('x', '0')
    .attr('y', '110');
$(document).ready(() => {
  // setInterval(() => {
  //   if(isOnlyLive == true){
  //     updateBar(barChart, counts.positive.count, counts.negative.count);
  //   }else{
  //     updateBar(barChart, counts.positive.score, counts.negative.score);
  //   }
  //   updateCounts();
  // }, 50);
});
