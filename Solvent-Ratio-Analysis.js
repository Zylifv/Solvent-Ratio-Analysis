let knownValuesRatio = 0;
const knownValuesRatioDisplay = document.getElementById("known-values-ratio-display");
const diluentValue = document.getElementById("known-diluent-value");
const chemComparisonValue = document.getElementById("chem-comparison-value");
const calculateKnownsRatioBtn = document.getElementById("calcualte-knowns-ratio-btn");
const mainListForm = document.getElementById("main-list");
const addBtn = document.getElementById("add-btn");
const convertBtn = document.getElementById("convert-btn");
let idCount = 1;
let newValuesArr = [];


function calculateKnownsRatio() {
  knownValuesRatio = Number((chemComparisonValue.value / diluentValue.value).toFixed(4));
  document.getElementById("calculated-ratio-val-num").value = knownValuesRatio;
  document.getElementById("known-values").style.display = "none";
}

addBtn.addEventListener("click", () => {

    idCount++;//keeps track of what id to assign each new label & input
    idCount >= 25 ? addBtn.disabled = true : addBtn.disabled = false;
    if (idCount <= 25) {//prevents the number of items exceeding n as thats what the algorithm cap is for now.
    
      //creates new labels and inputs based on when the user clicks the add button
    let newItem = document.createElement("label");
    let newItemContent = document.createTextNode(`${idCount}:`);
    let newItemVal = document.createElement("input");
    let btn = document.createElement("button");
      newItem.setAttribute("for", `chem${idCount}`);
      newItem.setAttribute("id", `chem${idCount}`);
      newItem.classList.add("chemNum");
      newItemVal.setAttribute("type", "number");
      newItemVal.setAttribute("id", JSON.stringify(idCount));
      newItemVal.setAttribute("for", `chem${idCount}`);
      newItemVal.classList.add("chems");
      newItemVal.setAttribute("value", "1");
      newItemVal.setAttribute("min", "0.001");
      btn.classList.add("discard");
      btn.setAttribute("type", "button");
      btn.setAttribute("id", newItem.id);
      btn.textContent = "X";
      newItem.appendChild(newItemContent);
      newItem.appendChild(btn);
        document.getElementById("main-list").appendChild(newItem);
        document.getElementById("main-list").appendChild(newItemVal);
      

        btn.onclick = function removeItem() {
        let parent = document.getElementById("main-list");
          if (btn.id === `chem${idCount}`) {
            parent.removeChild(document.getElementById(newItem.id));
            parent.removeChild(document.getElementById(newItemVal.id));
        idCount--;
        idCount >= 25 ? addBtn.disabled = true : addBtn.disabled = false;
          }
       }
    } else {
      return;
    }
});

convertBtn.addEventListener("click", () => {
  
  if (!document.getElementById("calculated-ratio-val-num").value) {
    alert("Please enter a valid Main peak/Chemical Comparison value.")
    return;
  } else {
    addBtn.style.display = "none";
    convertBtn.style.display = "none";
    
    let comparisonValue = Number(document.getElementById("new-ratio-val-num").value);
    const total = Number(diluentValue.value) + Number(chemComparisonValue.value);
    const sum = [...document.getElementsByClassName("chems")].map((i) => Number(i.value));
  
    for (let i = 0; i < sum.length; i++) {
      newValuesArr.push(Number((((sum[i] / comparisonValue) * sum[i]) * knownValuesRatio).toFixed(4)))
    }
    console.log(newValuesArr);
    const newTotal = (total - newValuesArr.reduce((acc, el) => acc + el, 0));
  
    const newDiluentValueNum = Number((diluentValue.value) * (newTotal / total)).toFixed(4);
    const newMainPeakValueNum = Number((chemComparisonValue.value) * (newTotal / total)).toFixed(4);
    document.getElementById("calculated-ratio-val-num").value = newDiluentValueNum;
    document.getElementById("new-ratio-val-num").value = newMainPeakValueNum;
    document.getElementById("new-ratio-val").textContent = "Main Peak:"
    //Changes the "new-ratio-val" name so its easier to manage states, allows user to reference original diluent value without adding another box.

    document.getElementById("1").value = newValuesArr[0].toFixed(3); //guaranteed to be displayed
      for (let i = 2; i <= sum.length; i++) {
        document.getElementById(`${i}`) ? document.getElementById(`${i}`).value = newValuesArr[i-1].toFixed(3) : "";
      }
    }
  });

function printThisPage() {
  window.print();
}

function resetPage() {
  history.go(0); //CodePen doesnt allow for location.reload();
}
