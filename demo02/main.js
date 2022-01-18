const smallCup = document.querySelectorAll('.smallCup'); 
const remained = document.getElementById('remained'); 
const percentage = document.getElementById('percentage'); 
const liters = document.querySelector('.liters');

smallCup.forEach((cup, idx) => {
    cup.addEventListener('click', () => activeCups(idx)
    )
});

function activeCups(idx) {
    console.log('下标--',idx, smallCup[idx].classList);
    if (smallCup[idx].classList.contains('full')) {
        // 当前及其后水杯清空
        smallCup.forEach((cup,idx2) => {
            if (idx2 >= idx) {
                smallCup[idx2].classList.remove('full');
                console.log(`this is remove -- ${smallCup[idx2]}, idx2-- ${idx2}`)
            }
        })
    } else {
        // 当前及其前方水杯full
        smallCup.forEach((cup, idx2) => {
            if (idx2 <= idx) {
                smallCup[idx2].classList.add('full');
                console.log(`this is add -- ${smallCup[idx2]}, idx2-- ${idx2}`);
            }
        })
    }

    updateBigCup()
}



function updateBigCup() {
    const fullCup = document.querySelectorAll(".bigCup.smallCup.full").length;
    const totalCup = smallCup.length;
    if (fullCup === 0) {
        percentage.style.visibility = 'hidden';
        percentage.style.height = 0;
        liters.innerText = `2L`;

    } else if(fullCup === totalCup) {
        remained.style.visibility = 'hidden';
        remained.style.height = 0;
        percentage.style.visibility = 'visible';
        percentage.style.height = '330px';
        percentage.innerText = '100%';
    } else {
        remained.style.visibility = 'visible';
        percentage.style.visibility = 'visible';
        remained.style.height = `${(totalCup - fullCup) / totalCup * 330}px`;
        percentage.style.height = `${fullCup / totalCup * 330}px`;
        liters.innerText = `${(totalCup - fullCup) * 250 / 1000}L`;
        percentage.innerText = `${fullCup / totalCup * 100}%`;
    }
}