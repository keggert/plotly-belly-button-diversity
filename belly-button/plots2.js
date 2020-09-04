function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        // Filter our data to get the desired sample number for the object
        var resultsArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var result = resultsArray[0];
        // Use d3 to select the panel with an id of sample-metadata
        var panel = d3.select("#sample-metadata");
        // We need to use html("") to clear any existing data
        panel.html("");
        // We need to use object.entries to add each key and value pair to our panel
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

function buildChart(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultsArray = samples.filter(sampleObject => sampleObject.id == sample);
        var result = resultsArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        // Bubble Chart Time
        var bubbleLayout = {
            title: "Cultures of Bacteria Per Sample",
            margin: { t: 0},
            hovermode: "closest",
            xaxis: { title: "OTU ID"},
            margin: { t: 30}
        };

        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }
        ];
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [
          {
            y: yticks,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
          }
        ];
    
        var barLayout = {
          title: "Top 10 Bacteria Cultures Discovered",
          margin: { t: 30, l: 150 }
        };
    
        Plotly.newPlot("bar", barData, barLayout);
      });
    }
    

function init() {
    // Grab a reference to our dropdown select element
    var selector = d3.select("#selDataset");

    // Use sample names list to populate select options
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;

        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Use the first sample from the list to build initial plots
        var firstSample = sampleNames[0];
        buildChart(firstSample);
        buildMetadata(firstSample);
    });
}

function optionChanged(newSample) {
    // Fetch new data everytime a new sample gets selected
    buildChart(newSample);
    buildMetadata(newSample);
}

// Initialize our dashboard
init();