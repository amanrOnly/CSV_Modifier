$(document).ready(function() {
    let inputFile, modifier;

    // Get file input and modifier input
    $("#file-input").change(function(event) {
        inputFile = event.target.files[0];
    });
    $("#modifier-input").change(function(event) {
        modifier = event.target.value;
    });

    // Handle submit button click
    $("#submit-button").click(function() {
        if (!inputFile || !modifier) {
            alert("Please select a CSV file and enter a modifier.");
            return;
        }

        // Read input CSV file
        let reader = new FileReader();
        reader.readAsText(inputFile);
        reader.onload = function(event) {
            // Get contents of CSV file
            let csv = event.target.result;

            // Split contents into rows
            let rows = csv.split("\n");

            // Modify rows
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i].split(",");
                // Modify name column
                if (row[0]) {
                    if(row[0]!="Name" || row[0]!="name"){
                        row[0] = modifier + row[0];
                    }
                }
                rows[i] = row.join(",");
            }

            // Join rows back into a single string
            let modifiedCsv = rows.join("\n");
            // Set href of download link to modified CSV
            let encodedUri = "data:text/csv;charset=utf-8," + encodeURI(modifiedCsv);
            $("#download-link").attr("href", encodedUri);
            $("#download-link").removeAttr("hidden");
        };
    });
});