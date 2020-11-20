// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
    .select("scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// Load data

d3.csv("assets/data/data.csv").then(function (demoData) {

    // Print the Demographics Data
    console.log(demoData);

    //extract data for analysis
    demoData.forEach(function (data) {
        //`Healthcare vs. Poverty` or `Smokers vs. Age`.
        data.state = data.state;
        data.healthcare = +data.healthcare
        data.poverty = +data.poverty
        data.smokes = +data.smokes
        data.age = +data.age

        console.log(data.state);
    });

    //scale functions
    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(demoData, d => d.healthcare)])
        .range([0, chartWidth]);

    var xLinearScale2 = d3.scaleLinear()
        .domain([20, d3.max(demoData, d => d.smokes)])
        .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(demoData, d => d.poverty)])
        .range([chartHeight, 0]);

    var yLinearScale2 = d3.scaleLinear()
        .domain([0, d3.max(demoData, d => d.age)])
        .range([chartHeight, 0]);

    //  axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //append axes to chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    //create circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(demoData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.healthcare))
        .attr("cy", d => yLinearScale(d.poverty))
        .attr("r", "15")
        .attr("fill", "pink")
        .attr("opacity", ".5");

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left + 40)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Healthcare vs. Poverty");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
        .attr("class", "axisText")
        .text("Smokers vs. Age");

}).catch(function (error) {
    console.log(error);



});
