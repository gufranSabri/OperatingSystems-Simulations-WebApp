function makeStorageAllocationTable(){
    $("#scrollableTextOutput").html("")
    $("#scrollableTextOutput").append("First Fit")
    $("#scrollableTextOutput").append("<table id='ff'></table><br>")
    $("#scrollableTextOutput").append("Best Fit")
    $("#scrollableTextOutput").append("<table id='bf'></table><br>")
    $("#scrollableTextOutput").append("Worst Fit")
    $("#scrollableTextOutput").append("<table id='wf'></table><br>")
    
    var ff = document.getElementById("ff");
    var bf = document.getElementById("bf");
    var wf = document.getElementById("wf");

    var headingRow = ff.insertRow(0)
    headingRow.insertCell(0).innerHTML = "<strong>Processes</strong>"
    headingRow.insertCell(1).innerHTML = "<strong>Holes</strong>"

    headingRow = bf.insertRow(0)
    headingRow.insertCell(0).innerHTML = "<strong>Processes</strong>"
    headingRow.insertCell(1).innerHTML = "<strong>Holes</strong>"

    headingRow = wf.insertRow(0)
    headingRow.insertCell(0).innerHTML = "<strong>Processes</strong>"
    headingRow.insertCell(1).innerHTML = "<strong>Holes</strong>"

    let res = firstFit()
    for (let i = 0; i < res.length; i++) {
        var row = ff.insertRow(i+1)
        var c1 = row.insertCell(0)
        var c2 = row.insertCell(1)

        c1.innerHTML = res[i][0]
        c2.innerHTML = res[i][1]
    }

    res = bestFit()
    for (let i = 0; i < res.length; i++) {
        var row = bf.insertRow(i+1)
        var c1 = row.insertCell(0)
        var c2 = row.insertCell(1)

        c1.innerHTML = res[i][0]
        c2.innerHTML = res[i][1]
    }

    res = worstFit()
    for (let i = 0; i < res.length; i++) {
        var row = wf.insertRow(i+1)
        var c1 = row.insertCell(0)
        var c2 = row.insertCell(1)

        c1.innerHTML = res[i][0]
        c2.innerHTML = res[i][1]
    }

}
function firstFit(){
    let data = getInputForSA()
    let holes = data[0]
    let processes = data[1]

    for (let i = 0; i < processes.length; i++) {
        if(processes[i]==undefined)continue
        for (let j = 0; j < holes.length; j++) {
            if(Array.isArray(holes[j])) continue
            if(processes[i]<=holes[j]){
                holes[j] = [processes[i],holes[j]]
                processes[i]=undefined
                i=-1
            }
        }
    }
    for (let i = 0; i < holes.length; i++) {
        if(Array.isArray(holes[i]))continue
        holes[i] = ["-", holes[i]]
    }
    return holes
}
function bestFit(){
    let data = getInputForSA()
    let holes = data[0]
    let processes = data[1]

    for (let i = 0; i < processes.length; i++) {
        if(processes[i]==undefined)continue

        let bestIndex = -1, smallestGap = Number.MAX_VALUE
        for (let j = 1; j < holes.length; j++) {
            if(Array.isArray(holes[j])) continue
            if(smallestGap>(holes[j]-processes[i])&&(holes[j]-processes[i]>=0)){
                smallestGap = holes[j]-processes[i]
                bestIndex = j
            }
        }
        if(bestIndex==-1)break
        holes[bestIndex] = [processes[i],holes[bestIndex]]
        processes[i]=undefined
        i=-1
    }
    for (let i = 0; i < holes.length; i++) {
        if(Array.isArray(holes[i]))continue
        holes[i] = ["-", holes[i]]
    }
    return holes
}
function worstFit(){
    let data = getInputForSA()
    let holes = data[0]
    let processes = data[1]
    
    for (let i = 0; i < processes.length; i++) {
        if(processes[i]==undefined)continue

        let bestIndex = -1, largestGap = Number.MIN_VALUE
        for (let j = 1; j < holes.length; j++) {
            if(Array.isArray(holes[j])) continue
            if(largestGap<(holes[j]-processes[i])&&(holes[j]-processes[i]>=0)){
                largestGap = holes[j]-processes[i]
                bestIndex = j
            }
        }
        if(bestIndex==-1)break
        holes[bestIndex] = [processes[i],holes[bestIndex]]
        processes[i]=undefined
        i=-1
    }
    for (let i = 0; i < holes.length; i++) {
        if(Array.isArray(holes[i]))continue
        holes[i] = ["-", holes[i]]
    }
    return holes
}

function getInputForSA(){
    let holes = $("#saih").val().split(" ").map(function(item){return parseInt(item);})
    let processes = $("#saip").val().split(" ").map(function(item){return parseInt(item);})
    // let holes = [100, 500, 200, 300, 600]
    // let processes = [212, 417, 112, 426]
    
    return [holes, processes]
}
