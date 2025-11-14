const knownValuesRatioDisplay = document.getElementById("known-values-ratio-display");
const diluentValue = document.getElementById("known-diluent-max");
const chemComparisonMax = document.getElementById("chem-comparison-max");
const chemComparisonValue = document.getElementById("chem-comparison-value");
const calculateKnownsRatioBtn = document.getElementById("calculate-knowns-ratio-btn");
let percentOfDiluentTotal;
let percentOfChemTotal;
let totalCorrMax;
const mainListForm = document.getElementById("main-list");
const addBtn = document.getElementById("add-btn");
const convertBtn = document.getElementById("convert-btn");
const mainListItems = document.querySelectorAll(".chemNum");
let knownValuesRatio = 0;
let idCount = 01;
let newValuesArr = [];

document.getElementById("chemicals-list").style.display = "none";

function calculateKnownsRatio() {
  if (!diluentValue.value || !chemComparisonValue.value)
  {
    alert("Please enter a valid value for the Diluent and/or Chemical comparison.")
    return;
  }
  else
  {
    totalCorrMax = Number(diluentValue.value) + Number(chemComparisonMax.value);
    percentOfDiluentTotal = Number(diluentValue.value / totalCorrMax);
    percentOfChemTotal = Number(chemComparisonMax.value / totalCorrMax);
    knownValuesRatio = Number((percentOfChemTotal / percentOfDiluentTotal).toFixed(4));
    document.getElementById("calculated-ratio-val-num").value = knownValuesRatio;
    document.getElementById("known-values").style.display = "none";
    document.getElementById("chemicals-list").style.display = "block";
  }
}

addBtn.addEventListener("click", () => {

    idCount++;//keeps track of what id to assign each new label & input
    idCount >= 30 ? addBtn.disabled = true : addBtn.disabled = false;
    if (idCount <= 30) //prevents the number of items exceeding n as thats what the algorithm cap is for now.
    {
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
          if (btn.id === `chem${idCount}`)
          {
            parent.removeChild(document.getElementById(newItem.id));
            parent.removeChild(document.getElementById(newItemVal.id));
            idCount--;
            idCount >= 30 ? addBtn.disabled = true : addBtn.disabled = false;
          }
       }
    }
    else
    {
      return;
    }
});

convertBtn.addEventListener("click", () => {
  
  if (!document.getElementById("calculated-ratio-val-num").value)
  {
    alert("Please enter a valid Main peak/Chemical Comparison value.")
    return;
  }
  else
  {
    addBtn.style.display = "none";
    convertBtn.style.display = "none";
    let list = document.querySelectorAll("#main-list label button");
      list.forEach((el) => {
        el.disabled = true;
      })
    const total = Number((percentOfDiluentTotal + percentOfChemTotal) * 100);
    console.log("Total:" + total)
    const sum = [...document.getElementsByClassName("chems")].map((i) => Number(i.value));
  
    for (let i = 0; i < sum.length; i++)
    {
      newValuesArr.push(Number((((sum[i] / chemComparisonValue.value) * chemComparisonMax.value) * percentOfDiluentTotal).toFixed(4)))
    }
    const newValuesTotal = newValuesArr.reduce((acc, el) => acc + el);
    console.log(newValuesTotal, total);
    const newTotal = Number(total - newValuesTotal);
    console.log("new total:" + newTotal)
    const newDiluentValueNum = newTotal.toFixed(3);
    document.getElementById("calculated-ratio-val-num").value = newDiluentValueNum;
    document.getElementById("1").value = newValuesArr[0].toFixed(3); //guaranteed to be displayed
      for (let i = 2; i <= sum.length; i++)
      {
        document.getElementById(`${i}`) ? document.getElementById(`${i}`).value = newValuesArr[i-1].toFixed(3) : "";
      }
    }
  });

function printThisPage() {
  window.print();
}

function resetPage() {
  window.history.go(0);
}
