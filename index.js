d3.json("alcoholdata.json", function(error, data){
    if(error){
        console.log("error on getting json data");
    }
    else{
        visualizeData(data);
    }

});

function visualizeData(data){
    //reformat the data into array
    var rData = [];
    rData = data.map(function(obj){
        return obj.alcohol;
    });
    console.log(rData);
    
    var newData = [];
    for(var i = 0; i<40; i++){
        newData.push(rData[i]);
    }
    console.log(newData);
    
    //set up parameters
    var margin = {top:20, right:20, bottom:30, left:40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var x = d3.scale.linear().domain([0, 40]).range([0, width]);
    var y = d3.scale.linear().domain([150, 400]).range([height, 0]);
    
    var xAxis = d3.svg.axis().scale(x);
    var yAxis = d3.svg.axis().scale(y).orient("left");
    
    var line = d3.svg.line()
                .x(function(d, i){return x(i);})
                .y(function(d, i){return y(d);});
    //svg container
    var svgContainer = d3.select("body").append("svg")
                    .attr("width", width+margin.left+margin.right)
                    .attr("height", height+margin.top+margin.bottom)
                    .append("g")
                    .attr("transform", "translate("+margin.left+","+ margin.top+")");
    //add x and y axises
    svgContainer.append("g")
            .attr("transform", "translate(0,"+ height+")")
            .call(xAxis);
    svgContainer.append("g")
                .call(yAxis);
    //add the line graph
    var path = svgContainer.append("path")
                .datum(newData)
                .attr("d",line)
                .attr("stroke","black")
                .attr("stroke-width", 2)
                .attr("fill", "none");
    tick();
    function tick(){
        newData.push(rData[40]);
        path.attr("d", line)
            .attr("transform", null)
            .transition()
            .duration(500)
            .ease("linear")
            .attr("transform", "translate("+x(0)+",0)")
            .each("end", tick);
        rData.shift();
        newData.shift();
    }
}
