function buildMetadata(sample) {
    // Use D3 JSON to fetch data from JSON file
    d3.json("./data/samples.json").then((data) => {
        console.log(data);
        var metadata = data.metadata;
            console.log(metadata);
    // Filter the data for the object with the desired sample number
        var resultsArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultsArray[0];
    // Use D3 to select the panel with an id of sample-metadata
        var panel = d3.select("#sample-metadata");
    // Using html to clear any existing metadata
        panel.html("")
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new tags for each key-value in the metadata.
        Object.entries(data).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
        
    // BONUS: Build the Gauge Chart
    buildGauge(result.wfreq);
    });
}
    
function buildCharts(sample) {
    d3.json("./data/samples.json").then((data) => {
        var samples = data.samples;
        var resultsArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultsArray[0];
          
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

    // Bar chart
    // Slice and reverse will need to be used to get the 10 top values
        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        }

        var barLayout = {
            title: "Top 10 Bacteria Cultures",
        }


    Plotly.newPlot("bar", barData, barLayout)
});

    // Bubble Chart
        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: markers,
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }
        Plotly.newPlot("bubble", bubbleData, bubbleLayout)

function init () {
    // Reference dropdown select element
    var dropdown = d3.select("#selDataset");
    // Use the list of samples names to populate the different select options
    d3.json("./data/samples.json").then((sampleName) => {
        sampleName.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        })
    });

    // Use first sample from list to build our initial plots
    const firstSample = sampleName[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);

}

function changeOptions(newSample) {
    // Fetch new data when a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Finish by initializaing the dashboard
init();