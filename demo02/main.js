const remained = document.getElementById("remained");
const liters = document.querySelector(".liters");
const percentage = document.getElementById("percentage");
const smallCups = document.querySelectorAll(".smallCup");


updateBigCup()

smallCups.map(value, idx, arr)

const arr = [1, 2, 3, 4];

const cb = (value, idx, arr) => {
    console.log('执行cb了，接收到的参数--', value, idx, arr);
}

arr.forEach(cb);


const callback = (value, idx, arr) => {
    //  这里的逻辑，都是我们写的
}

smallCups.map(callback);

// 添加监听事件
smallCups.forEach((cup, idx) => {
    
    cup.addEventListener('click', () => {
        console.log(`正在点击第${idx}个小水杯`);
        highlightCups(idx);

        // 在检查被点击水杯是亮起还是熄灭
        if (smallCups[idx].classList.contains('active')) {
            //  被点击的小水杯是亮起
            smallCups[idx].classList.remove('active');
            // smallCups[idx].classList.add('unactive');
            for (let i = idx; i < smallCups.length; i++) {
                const nextCup = smallCups[i];
                nextCup.classList.remove('active');
            }
        } else {
            //  不是亮起的
        }
    });
})

// smallCups伴随点击事件的样式变化
function highlightCups(idx) {
    if (idx === 7 && smallCups[idx].classList.contains("full")){idx--}
    else if (smallCups[idx].classList.contains("full") && !smallCups[idx].nextElementSibling.classList.contains("full")){idx--}
    

    smallCups.forEach((cup, idx2) => {
        if(idx2 <= idx) {
            cup.classList.add("full");
        } else {
            cup.classList.remove("full");
        }

    })

    updateBigCup()
}

function updateBigCup() {
    const fullCups = document.querySelectorAll('.smallCup.full').length;
    const totalCups = smallCups.length;

    if(fullCups === 0) {
        percentage.style.visibility = 'hidden';
        percentage.style.height = 0;
    } else {
        percentage.style.visibility = 'visible';
        percentage.style.height = `${fullCups / totalCups * 330}px`;
        percentage.innerText = `${fullCups / totalCups * 100}%`;
    }

    if(fullCups === totalCups) {
        remained.style.visibility = 'hidden';
        remained.style.height = 0;
    } else {
        remained.style.visibility = 'visible';
        liters.innerText = `${2 - (250 * fullCups / 1000)}L`;
    }
}
