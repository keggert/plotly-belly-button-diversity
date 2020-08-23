function buildMetadata(sample) {
    // Use D3 JSON to fetch data from JSON file
    d3.json("./data/samples.json").then((data) => {
        console.log(data);
    var metadata = data.metadata;
        console.log(metadata);
    // Use D3 to select the panel with an id of sample-metadata
    var panel = d3.select("#sample-metadata");
    // Using html to clear any existing metadata
    panel.html("")

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

function init () {
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.
}

init();