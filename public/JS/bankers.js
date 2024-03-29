function bankers(){
    let data = getInputForBankers()
    let allocations = data[0]
    let need = data[1]
    let available = data[2]

    let textRes = "<p>Safe sequence exists. System is in safe state</p>"
    let diagramRes = ""
    let sequence = []

    let count = 0;
    while(true){
        let foundNextProcess = false
        let breakFlag = true
        
        count+=1
        if(count==1000)break
        for (let i = 0; i < need.length; i++) {
            let currAvailable = available[available.length-1]
            if(need[i]==undefined)continue
            if(checkIfAvailableMeetsNeeds(need[i],currAvailable)){
                foundNextProcess = true
                diagramRes+="<div class='processBox'><span>P"+(i+1)+"</span></div>"
                sequence.push((i+1))

                let nextAvailable = []
                for (let j = 0; j < need[i].length; j++)nextAvailable.push((allocations[i][j]+currAvailable[j]))

                need[i]= undefined
                available.push(nextAvailable)
            }
        }
        for (let i = 0; i < need.length; i++) {
            if(need[i]==undefined)continue
            breakFlag=false
        }
        if(breakFlag)break
        if(!foundNextProcess){
            textRes = "<p>Safe sequence does not exist. System is in unsafe state</p>"
            diagramRes = ""
            break
        }
    }
    $("#scrollableTextOutput").html(textRes)
    $("#scrollableDiagramOutput").html(diagramRes)
}
function checkIfAvailableMeetsNeeds(a1, a2){
    for (let i = 0; i < a1.length; i++) {
        if(a1[i]>a2[i])return false
    }
    return true
}


function getInputForBankers(){
    // let allocations = [
    //     [0,1,0],
    //     [2,0,0],
    //     [3,0,2],
    //     [2,1,1],
    //     [0,0,2],
    // ]
    // let max = [
    //     [7,5,3],
    //     [3,2,2],
    //     [9,0,2],
    //     [2,2,2],
    //     [4,3,3],
    // ]
    // let available = [[3,3,2]]

    let allocations = [], max = [], available = []
    let need = []
    let numP = parseInt($("#numProcesses").val())

    $("#av").val($("#av").val().trim().replace( "  "," ").replace("  "," "))

    available.push($("#av").val().split(" ").map(function(item){return parseInt(item);}))
    for (let i = 1; i <=numP; i++) {
        $("#P" + i + "ar").val($("#P" + i + "ar").val().trim().replace("   "," ").replace("  "," "))
        $("#P" + i + "ar").val($("#P" + i + "mr").val().trim().replace("   "," ").replace("  "," "))
        allocations.push($("#P" + i + "ar").val().split(" ").map(function(item){return parseInt(item);}))
        max.push($("#P" + i + "mr").val().split(" ").map(function(item){return parseInt(item);}))
    }

    for (let i = 0; i < allocations.length; i++) {
        let temp = []
        for (let j = 0; j < allocations[0].length; j++)temp.push(max[i][j] - allocations[i][j])
        need.push(temp)
    }
    
    return [allocations, need, available]
}