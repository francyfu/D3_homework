// @TODO: YOUR CODE HERE!
// read the data from the csv file 

// set up the defalut views for x and y on page load
var xView = "poverty";
var yView = "obesity";

d3.csv(".\\assets\\data\\data.csv").then(function(dataset){
        
        showVisual(dataset, xView, yView); 
        
});

// Create the svg canvas height and width 

var svgHeight = 500;
var svgWidth = 900; 

// margins to move your svg to the down and to the right 

var margin = {
    top: 50, 
    right: 50,
    bottom: 20, 
    left: 50
}

var padding = {
    top: -49,
    right: 19,
    left: 0
}

// Adjust your svg position 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Append svg to the index.html 
var svg = d3.select("#scatter")
          .append("svg")
          .attr("width", width)
          .attr("height", height) 
          .attr("class", "scatter")
          .append("g")
          .attr("tranform", `translate( ${margin.left}, ${margin.top})`);


function showVisual(data, xView, yView){

    data.map(d =>{
       // I've only cleans a small sample of the data. 
       // you will need to handle the rest
        data.poverty = +d[xView];
        data.obesity = +d[yView];
        
    });

        // we need to get the min and max of x & y in the dataset to pass to .domain()
        var xValues  = data.map(d => parseFloat(d[xView]));
        var yValues  = data.map(d => parseFloat(d[yView])); 
        // console.log(xValues,yValues);

        // use extent to grab the min and max of the selected Scale and Axis
        var xScale = d3.scaleLinear()
                .domain(d3.extent(xValues))
                .range([margin.right, width+margin.right]);

        var yScale = d3.scaleLinear()
                .domain(d3.extent(yValues))
                .range([height-40, margin.top]); 


        // Add the x & y Axis
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);



        // add the x & y scales to the index.html <svg> tag 
        svg.append("g")
                .attr("class", "xAxis")
                .attr("transform", `translate(${padding.top},  ${height - margin.bottom})`)
                .call(xAxis);

        svg.append("g")
                .attr("class", "yAxis")
                .attr("transform", `translate(${padding.right}, ${padding.right})`)
                .call(yAxis);

        // Create the <circle></circle> element 


        var scatter = svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => xScale( d[xView] ))
                .attr("cy", d => yScale( d[yView] ))
                .attr("r", 15)
                .attr("fill", "yellow")
                .attr("stroke","black")
                .attr("stroke-width","2")
                .attr("class","statetext");

        var statetext = svg.selectAll("statetext")
        .data(data)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("dx", d => xScale( d[xView] ))
        .attr("dy", d => yScale( d[yView] ))
        .attr("font-size","10px")
        .attr("text-anchor","middle")
        .attr("fill","black")
        
        svg.append("text")
        .attr("x", "transform", `translate(${width / 2}, ${height + margin.top + 20})`)
        .attr("y", "transform", `translate(${height / 2}, ${width + margin.right + 20})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "green")
        .text("Poverty");
        
        // chartGroup.append("text")
        // .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
        // .attr("text-anchor", "middle")
        // .attr("font-size", "16px")
        // .attr("fill", "orange")
        // .text("Evening Donut Craving Level");

        

}