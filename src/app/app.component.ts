import { Component } from '@angular/core';

import * as d3 from "d3";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'app';

	ngOnInit() {

		var svg = d3.select("svg"),
			margin = {top: 20, right: 20, bottom: 30, left: 40},
			width = +svg.attr("width") - margin.left - margin.right,
			height = +svg.attr("height") - margin.top - margin.bottom;
		
		var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
			y = d3.scaleLinear().rangeRound([height, 0]);
		
		var g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		d3.tsv("assets/bar.tsv", function(d) {
		d.frequency = +d.frequency;
		return d;
		}, function(error, data) {
		if (error) throw error;
		
		x.domain(data.map(function(d) { return d.letter; }));
		y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
		
		g.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));
		
		g.append("g")
			.attr("class", "axis axis--y")
			.call(d3.axisLeft(y).ticks(10, "%"))
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("Frequency");
		
		g.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.letter); })
			.attr("y", function(d) { return y(d.frequency); })
			.attr("width", x.bandwidth())
			.attr("height", function(d) { return height - y(d.frequency); });
		});

		// var svg = d3.select("svg"),
		// margin = {top: 20, right: 20, bottom: 30, left: 50},
		// width = +svg.attr("width") - margin.left - margin.right,
		// height = +svg.attr("height") - margin.top - margin.bottom,
		// g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// var parseTime = d3.timeParse("%d-%b-%y");

		// var x = d3.scaleTime()
		// .rangeRound([0, width]);

		// var y = d3.scaleLinear()
		// .rangeRound([height, 0]);

		// var area = d3.area()
		// .x(function(d) { return x(d.date); })
		// .y1(function(d) { return y(d.close); });

		// d3.tsv("assets/data.tsv", function(d) {
		// d.date = parseTime(d.date);
		// d.close = +d.close;
		// return d;
		// }, function(error, data) {
		// if (error) throw error;

		// x.domain(d3.extent(data, function(d) { return d.date; }));
		// y.domain([0, d3.max(data, function(d) { return d.close; })]);
		// area.y0(y(0));

		// g.append("path")
		// .datum(data)
		// .attr("fill", "steelblue")
		// .attr("d", area);

		// g.append("g")
		// .attr("transform", "translate(0," + height + ")")
		// .call(d3.axisBottom(x));

		// g.append("g")
		// .call(d3.axisLeft(y))
		// .append("text")
		// .attr("fill", "#000")
		// .attr("transform", "rotate(-90)")
		// .attr("y", 6)
		// .attr("dy", "0.71em")
		// .attr("text-anchor", "end")
		// .text("Price ($)");
		// });
	}

}
