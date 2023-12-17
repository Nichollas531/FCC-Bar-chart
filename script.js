d3.select("body").append("h2").text("hello project");

//-----------------
let dataset = [];
fetch("json/GDP-data.json")
  .then((response) => {
    return response.json();
  })
  .then((obj) => {
    dataset = obj;
    console.log(dataset.data[8][1]);
  })
  .catch((e) => {
    console.log("something's off");
    console.log(e);
  });
//-----------------
const w = 800;
const h = 400;
const padding = 60;
const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, (d) => dataset.data[d][1])])
  .range([padding, w - padding]);
const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, (d) => dataset.data[d][1])])
  .range([h - padding, padding]);

const svg = d3
  .select("body")
  .append("svg")
  .attr("height", h + "px")
  .attr("width", w + "px");

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg
  .append("g")
  .attr("transform", "translate(0, " + (h - padding) + ")")
  .call(xAxis)
  .attr("id", "x-axis");

svg
  .append("g")
  .attr("transform", "translate(" + padding + ", 0)")
  .call(yAxis)
  .attr("id", "y-axis");

d3.select("svg")
  .selectAll("rect")
  .data(dataset.data[d][1])
  .enter()
  .append("rect")
  .attr("class", "bar")
  .style("height", (d) => d + "px");
