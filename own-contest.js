
let emoji_list = []
let renderDropDown = (DOMElement, list) => {
  var dropDown = d3.select(DOMElement)
      .append("select")
      .attr("class", "selection")
      .attr("name", "emoji-list")

  dropDown
    .append('option')
    .text('Select emoji');

  var options = dropDown.selectAll("option")
    .data(list)
    .enter()
    .append("option");

  options.text(function(d) {
      return d.char;
    })
    .attr("value", function(d) {
      return d.id;
    });

  $("#emoji-dropdown-left select").change(() => {
      console.log('left changed');
      own_fight.left = [$('#emoji-dropdown-left select').val()];
      own_fight.render();
  });

  $("#emoji-dropdown-right select").change(() => {
      console.log('right changed');
      own_fight.right = [$('#emoji-dropdown-right select').val()];
      own_fight.render();
  });
}


// $('#emoji-dropdown-left select').val();
// $('#emoji-dropdown-right select').val();
