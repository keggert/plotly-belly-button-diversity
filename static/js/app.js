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

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
    });

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
    // Reference dropdown select element
    var dropdownMenu = d3.select("#selDataset");
    // Use the list of samples names to populate the different select options
    d3.json("./data/samples.json").then((data) => {
    
    });

}

function changeOptions(newSample) {
    // Fetch new data when a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Finish by initializaing the dashboard
init();