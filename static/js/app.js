// Use D3 JSON to fetch data from JSON file
// Incoming data is internally referred to as incomingData

d3.json("./data/samples.json").then((data) => {
    console.log(data);


    var barData = {
        x: microbe.sample_values.slice(0, 10).reverse(),
        y: microbe.otu_ids,
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
    }

    var barLayout = {
        title: "Top 10 Bacteria Cultures",
    }


    Plotly.newPlot("bar", barData, barLayout)
});