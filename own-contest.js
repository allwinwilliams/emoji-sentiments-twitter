
let emoji_list = []
let renderDropDown = (DOMElement, list) => {
  var dropDown = d3.select(DOMElement)
      .append("select")
      .attr("class", "selection")
      .attr("name", "emoji-list")

    dropDown
      .append('option')
      .text('Select emoji')
      .attr('disabled', 'true')
      .attr('class', 'disable');


  var options = dropDown
    .selectAll("option:not([disabled])")
    .data(list)
    .enter()
    .append("option");

  options
    .text(d =>  d.char)
    .attr("value", d =>  d.id);

  $("#emoji-dropdown-left select").change(() => {
      own_fight.left = [$('#emoji-dropdown-left select').val()];
      own_fight.render();
  });

  $("#emoji-dropdown-right select").change(() => {
      own_fight.right = [$('#emoji-dropdown-right select').val()];
      own_fight.render();
  });
}


// $('#emoji-dropdown-left select').val();
// $('#emoji-dropdown-right select').val();
