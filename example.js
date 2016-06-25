var dataset = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
    [600, 150]
  ];

                console.log(data);
                  // 创建比例尺
            var xScale = d3.scale.linear()
                                 .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                                 .range([padding, w - padding * 2]);
            var yScale = d3.scale.linear()
                                 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                                 .range([h - padding, padding]);
            var rScale = d3.scale.linear()
                                 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                                 .range([2, 5]);

            //var format = d3.format(".1%");//设置刻度的格式

            // 创建SVG
            var svg = d3.select("body")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);

            svg.selectAll("circle")
               .data(dataset)
               .enter()
               .append("circle")
               .attr("cx", function(d) {
                    return xScale(d[0])+30;//设置原点坐标，以及横轴位移量
               })
               .attr("cy", function(d) {
                    return yScale(d[1]);
               })
               .attr("r", function(d) {
                    return rScale(d[1]);
               });

            svg.selectAll("text")
               .data(dataset)
               .enter()
               .append("text")
               .text(function(d) {
                    return d[0] + "," + d[1];
               })
               .attr("x", function(d) {
                    return xScale(d[0])+30;
               })
               .attr("y", function(d) {
                    return yScale(d[1]);
               })
               .attr("font-family", "sans-serif")
               .attr("font-size", "11px")
               .attr("fill", "red");

            // 定义X轴
            var xAxis = d3.svg.axis()
                              .scale(xScale)
                              .ticks(5)//最多刻度数，连上原点
                              .orient("bottom");
                              //.tickFormat(format);//添加刻度格式
            // 定义Y轴
            var yAxis = d3.svg.axis()
                              .scale(yScale)
                              .orient("left")
                              .ticks(5);
                              //.tickFormat(format);

            // 创建X轴
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + (h - padding) + ")")//设置据下边界的距离
                .call(xAxis);

            // 创建Y轴
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + padding + ",0)")//设置轴据左边界的距离
                .call(yAxis);