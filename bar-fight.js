class BarFight{
  constructor(
    width = 1500,
    height = 200,
    margins = {'top': 100, 'right': 300, 'bottom': 100, 'left': 300},
    isOnlyLive = true,
    DOM_element = "body",
    left = [],
    right = []
  ){
    this.width = width;
    this.height = height;
    this.margins = margins;
    this.isOnlyLive = isOnlyLive;
    this.DOM_element = DOM_element;
    this.svg = d3.select(this.DOM_element);
    this.left = left;
    this.right = right;
    this.graphWidth = this.width - this.margins.left - this.margins.right;
    this.graphHeight = this.height - this.margins.top - this.margins.bottom;
    this.counts = {
      left: {
        emojis: this.left,
        count: 1,
        color: '#00bfd7'
      },
      right: {
        emojis: this.right,
        count: 1,
        color: '#ff652f'
      }
    };
  }

  updateBar(chart, left, right){
      console.log(chart, left, right);
      const distance = graphWidth / (left + right);
      chart
      .selectAll('rect')
      .data([left, right])
      .attr('width', d => d * distance)
      .attr('transform', (d,i) =>{
        if(i == 1){
          return `translate(${left * distance}, 0)`
        }
      });
  }

  sum_counts(side){
    let mycount = _.reduce(side, (count, emoji_code) => {
      return count + dataValues(emoji_code).count
    }, 0);
    // console.log(side, mycount);
    return mycount;
  }

  updateChart(barChart){
    if(this.isOnlyLive == true){
      let left_count = this.sum_counts(left);
      let right_count = this.sum_counts(right);
      this.counts.left.count = left_count;
      this.counts.right.count = right_count;

      updateBar(barChart, left_count, right_count);
    }else{
      updateBar(barChart, counts.positive.score, counts.negative.score);
    }
  }

  render(){
    let svg = this.svg
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('class', 'bar-fight-chart');

    let barChart = svg
      .append('g')
      .attr('width', this.graphWidth)
      .attr('height', this.graphHeight)
      .attr('transform', `translate(${this.margins.left}, ${this.margins.top})`)
      .attr('class', 'bar-fight-chart-content');

    let barElements = barChart
      .selectAll('rect')
      .data([this.counts.left, this.counts.right])
      .enter()
      .append('rect')
      .attr('class', 'sentiments')
      .attr('height', graphHeight)
      .attr('fill', d => d.color);
      // .attr('id', d => `bar-${d.name}`);

    let textLabelGroup = svg
      .append('g')
      .attr('id', 'text-elements')
      .attr('transform', `translate(${100}, ${100})`);

    return barChart;
  }
}

let fight_1 = new BarFight(1500,
  200,
  margins = {'top': 100, 'right': 300, 'bottom': 100, 'left': 300},
  isOnlyLive = true,
  DOM_element = "#fight-1",
  left = ['1F602'],
  right = ['1F62D']
);
let fight_1_barChart = fight_1.render();

setInterval(()=>{
  fight_1.updateChart(fight_1_barChart);
}, 1000);
