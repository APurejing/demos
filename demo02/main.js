const smallCup = document.querySelectorAll('.smallCup'); // 得到一个小水杯集合
const remained = document.getElementById('remained'); // 剩余水量
const percentage = document.getElementById('percentage'); // 百分比
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
}


// 大水杯remained高度 = 小水杯full的个数 / 8 * 330px
// 大水杯percentage高度 = 330px - remained 或者 小水杯not full的个数 / 8 * 330px
// liters = 小水杯full的个数 * 250 / 1000   单位 L
// percentage =小水杯not full的个数 / 8 * 100  单位%

// function updateBigCup() {
//     const fullCup = document.querySelectorAll(".bigCup.smallCup.full").length;
//     remained.style.height = `${fullCup / 8 * 330}px`
//     percentage.style.height = `${(8 - fullCup) / 8 * 330}px`
//     liters.innerText = `${fullCup * 250 / 1000}L`
//     percentage.innerText = `${(8 - fullCup) / 8 * 100}%`
//     console.log(`fullcup-- ${fullCup}, percentage${percentage.innerText}`);
// }

// updateBigCup()