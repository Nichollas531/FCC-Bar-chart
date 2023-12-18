d3.select("body").append("h2").text("hello project");

//-----------------
let dataset = [];
fetch("json/GDP-data.json")
  .then((response) => {
    return response.json();
  })
  .then((obj) => {
    dataset = obj.data;

    const w = 800;
    const h = 400;
    const padding = 60;
    console.log(dataset);
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
      .range([padding, w - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
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

    // Creating bars

    svg
      .selectAll(".bar")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d[1]))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", 10)
      .attr("height", (d) => h - padding - yScale(d[1]));
  })
  .catch((e) => {
    console.log("something's off");
    console.log(e);
  });
//-----------------
