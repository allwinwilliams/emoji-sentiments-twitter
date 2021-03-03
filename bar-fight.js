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

    this.left = left;
    this.right = right;

    this.graphWidth = this.width - this.margins.left - this.margins.right;
    this.graphHeight = this.height - this.margins.top - this.margins.bottom;

    this.DOM_element = DOM_element;

    this.svg = d3.select(this.DOM_element)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('class', 'bar-fight-chart');

    this.barChart = this.svg
      .append('g')
      .attr('width', this.graphWidth)
      .attr('height', this.graphHeight)
      .attr('transform', `translate(${this.margins.left}, ${this.margins.top})`)
      .attr('class', 'bar-fight-chart-content');

    this.textGroup = this.svg
      .append('g')
      .attr('class', 'text-elements')
      .attr('transform', `translate(${this.width / 12}, ${0})`);

    this.counts = {
      left: {
        emoji_codes: this.left,
        count: 0,
        color: '#00bfd7',
        DOM_elements: {
          label: this.textGroup
            .append('text')
            .text(this.renderEmojiChars(this.left))
            .attr('font-size', '2em')
            .attr('text-align', 'center')
            .attr('transform', `translate(${0}, ${50})`),
          count: this.textGroup
            .append('text')
            .text(0)
            .attr('text-align', 'center')
            .attr('transform', `translate(${0}, ${100})`)
        }
      },
      right: {
        emoji_codes: this.right,
        count: 0,
        color: '#ff652f',
        DOM_elements: {
          label: this.textGroup
            .append('text')
            .attr('font-size', '2em')
            .attr('text-align', 'center')
            .attr('transform', `translate(${1200}, ${50})`),
          count: this.textGroup
            .append('text')
            .text(0)
            .attr('text-align', 'center')
            .attr('transform', `translate(${1200}, ${100})`)
        }
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

  renderEmojiChars(side){
    let emoji_chars = _.reduce(side, (text, emoji_code) => {
      // return text + dataValues(emoji_code).char
      if(dataValues(emoji_code) != undefined){
        return text + dataValues(emoji_code).char
      }
      return text + ""
    }, "");
    // console.log(side, mycount);
    return emoji_chars;
  }

  updateChart(){
    if(this.isOnlyLive == true){
      let left_count = this.sum_counts(this.left);
      let right_count = this.sum_counts(this.right);
      this.counts.left.count = left_count;
      this.counts.right.count = right_count;

      this.updateText(this.left, this.right);

      updateBar(this.barChart, left_count, right_count);
    }else{
      updateBar(this.barChart, counts.positive.score, counts.negative.score);
    }
  }

  updateText(){
    this.counts.left.DOM_elements.label
      .text(this.renderEmojiChars(this.left));

    this.counts.right.DOM_elements.label
      .text(this.renderEmojiChars(this.right));

    this.counts.left.DOM_elements.count
      .text(this.counts.left.count)
      .attr('fill', this.counts.left.color);

    this.counts.right.DOM_elements.count
      .text(this.counts.right.count)
      .attr('fill', this.counts.right.color);
  }

  render(){
    this.barChart
      .selectAll('rect')
      .data([this.counts.left, this.counts.right])
      .enter()
      .append('rect')
      .attr('class', 'sentiments')
      .attr('height', graphHeight)
      .attr('fill', d => d.color);
      // .attr('id', d => `bar-${d.name}`);
  }
}

let fight_1 = new BarFight(1500,
  100,
  margins = {'top': 10, 'right': 300, 'bottom': 100, 'left': 300},
  isOnlyLive = true,
  DOM_element = "#fight-1",
  left = ['1F602'],
  right = ['1F62D']
);

fight_1.render();

let fight_2 = new BarFight(1500,
  100,
  margins = {'top': 10, 'right': 300, 'bottom': 100, 'left': 300},
  isOnlyLive = true,
  DOM_element = "#fight-2",
  left = ['2764'],
  right = ['1F494']
);


fight_2.render();

let fight_3 = new BarFight(1500,
  100,
  margins = {'top': 10, 'right': 300, 'bottom': 100, 'left': 300},
  isOnlyLive = true,
  DOM_element = "#fight-3",
  left = ['1F44D'],
  right = ['1F44E']
);

fight_3.render();

setInterval(()=>{
  fight_1.updateChart();
  fight_2.updateChart();
  fight_3.updateChart();
}, 100);
