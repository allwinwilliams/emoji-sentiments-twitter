let resetCounter = () => {
    counts.total.count = 0;
    counts.positive.count = 0;
    counts.negative.count = 0;
    startTime = new Date($.now());
    _.mapValues (emoji_store, o => {
      o.count = 0;
    });
};

let updateCounts = () => {
  $('#live-count').text(`${counts.positive.count + counts.negative.count}`);
  $('#total-count').text(`${counts.positive.score + counts.negative.score}`);
};

let switchToLive = () => {
  $('#counter-reset-button').css('visibility', 'visible');
  $('#live-count-selector').addClass('active');
  $('#total-count-selector').removeClass('active');
  isOnlyLive = true;
};

let switchToTotal = () => {
  $('#counter-reset-button').css('visibility', 'hidden');
  $('#total-count-selector').addClass('active');
  $('#live-count-selector').removeClass('active');

  isOnlyLive = false;
};

let updateTime = () => {
  $('#time-passed').text(`${Math.floor((new Date($.now()) - startTime) / 1000) }`);
};

let updateBar = (bar, positive, negative) => {
  console.log(positive, negative);
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

const width = 1200;
const height = 400;
const margin = {'top': 100, 'right': 100, 'bottom': 100, 'left': 100};
const graphWidth = width - margin.left - margin.right;
const graphHeight = height - margin.top - margin.bottom;

let startTime = new Date($.now());

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
  .attr('id', d => `bar-total-${d.name}`);

$(document).ready(() => {
  setInterval(() => {
    if(isOnlyLive == true){
      updateBar(barChart, counts.positive.count, counts.negative.count);
    }else{
      updateBar(barChart, counts.positive.score, counts.negative.score);
    }
    updateCounts();
  }, 50);

  setInterval(() => {
    updateTime();
  }, 1000);
});
