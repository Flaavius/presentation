import * as d3 from "d3";

const chartWidth = 550;

export const buildChart = ({
  selector = "",
  data = {},
  onHover = (data: any) => {},
}) => {
  if (!selector) return;

     // set the dimensions and margins of the graph
  const width = chartWidth;
  const height = 450;
  const margin = 60;

     // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  const radius = Math.min(width, height) / 2 - margin;

     // append the svg object to the div called 'my_dataviz'
  const svg = d3.select(selector)
     .append("svg")
     .attr("width", width)
     .attr("height", height)
     .append("g")
     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

     // set the color scale
  const color = d3.scaleOrdinal()
     .domain(["a", "b", "c", "d", "e", "f", "g", "h"])
     .range(d3.schemeDark2);

     // Compute the position of each group on the pie:
  const pie = d3.pie()
     .sort(null) // Do not sort group by size
     .value((d) => d.value);
  const data_ready = pie(d3.entries(data));

     // The arc generator
  const arc = d3.arc()
     .innerRadius(radius * 0.5)         // This is the size of the donut hole
     .outerRadius(radius * 0.8);

     // Another arc that won't be drawn. Just for labels positioning
  const outerArc = d3.arc()
     .innerRadius(radius * 0.9)
     .outerRadius(radius * 0.9);

     // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
     .selectAll("allSlices")
     .data(data_ready)
     .enter()
     .append("path")
     .on('mouseover', function(data) {
       d3.select(this)
       .attr("fill", "#de411b")
       .style("opacity", 1);
       onHover(data.data.key);
     })
     .on("mouseout", function(d) {
      d3.select(this)
      .attr("fill", color(d.data.key))
      .style("opacity", .7);
     })
     .attr("d", arc)
     .attr("fill", function(d) { return(color(d.data.key)); })
     .attr("stroke", "white")
     .style("stroke-width", "2px")
     .style("opacity", 0.7);

     // Add the polylines between chart and labels:
  svg
     .selectAll("allPolylines")
     .data(data_ready)
     .enter()
     .append("polyline")
     .attr("stroke", "black")
     .style("fill", "none")
     .attr("stroke-width", 1)
     .attr("points", function(d) {
       const posA = arc.centroid(d); // line insertion in the slice
       const posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
       const posC = outerArc.centroid(d); // Label position = almost the same as posB
       const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
       posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
       return [posA, posB, posC];
     });

     // Add the polylines between chart and labels:
  svg
     .selectAll("allLabels")
     .data(data_ready)
     .enter()
     .append("text")
     .text( function(d) { console.log(d.data.key) ; return d.data.key; } )
     .attr("transform", function(d) {
         const pos = outerArc.centroid(d);
         const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
         pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
         return "translate(" + pos + ")";
     })
     .style("text-anchor", function(d) {
         const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
         return (midangle < Math.PI ? "start" : "end");
     });
};

const data = [
  {
    name: "Java",
    value: 20,
  },
  {
    name: "React",
    value: 20,
  },
  {
    name: "PostgresSQL",
    value: 20,
  },
  {
    name: "NodeJS",
    value: 20,
  },
  {
    name: "JUnit",
    value: 30,
  },
  {
    name: "AWS",
    value: 20,
  },
  {
    name: "NightWatch",
    value: 20,
  },
];

export const buildBarChart = ({
  selector = "",
}) => {
  if (!selector) return;

  const width = 550;
  const paddingLeft = 100;

  const scale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, 400]);

  const transition = d3.transition().duration(600).ease(d3.easeElasticOut);

  const container = d3
    .select(selector)
    .html("")
    .append("svg")
    .attr("width", width)
    .attr("height", 250);

  const xAxis = d3.axisBottom(scale).scale(scale);

  container.append("g").attr("transform", `translate(${paddingLeft}, 230)`).call(xAxis);

  container
    .append("g")
    .attr("transform", `translate(${paddingLeft}, 200)`)
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("height", 26)
    .style("fill", "#de411b")
    .attr("x", 0)
    .attr("y", (d, i) => i * -30)
    .transition(transition)
    .attr("width", () => Math.round(Math.random() * 400));

  container
    .append("g")
    .attr("transform", "translate(0, 230)")
    .selectAll("text")
    .data(data)
    .join("text")
    .text((d) => d.name)
    .attr("x", 10)
    .attr("y", (d, i) => (i * -30) - 13)
    .attr("fill", "#de411b");

};
