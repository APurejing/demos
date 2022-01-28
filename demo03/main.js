//   
const API_URL = 'https://themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const imgSrc = 'https://th.wallhaven.cc/small/rd/rdyyjm.jpg';

const createImg = (src) => {
    let startTime = Date.now();
    const img = new Image();
    img.src = src;
    console.log('设置图片src的时间', startTime);
    img.onerror = () => {
        console.log('图片加载报错了--', error);
    }
    img.onload = (e) => {
        let endTime = Date.now();
        console.log('图片加载完了，这个时候，距离设置src，以及onload的时间间隔--', endTime - startTime);
    };
    let startTime2 = Date.now();
    console.log('设置图片onload的时间--', startTime2);
    // document.body.appendChild(img);
}

// createImg(imgSrc);


const reverseArr = (arr) => {
    const result = [];
    const len = arr.length;
    for (let i = len - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    return result;
}


// Get initial movies
//  API_URL 获取电影的数据
// getMovies(API_URL)

// getMoviesByXHR(API_URL);

function getMoviesByXHR(url) {
    let startTime = Date.now();
    // readystate 是 xhr 的一个状态
    const xhr = new XMLHttpRequest();
    console.log('xhr对象刚刚创建--', xhr.readyState);
    xhr.open('GET', url);
    console.log('xhr对象调用open方法--', xhr.readyState);
    xhr.send();
    console.log('xhr对象调用send方法--', xhr.readyState);
    xhr.onreadystatechange = function (e) {
        console.log('xhr的readyState变了，这里的回调函数就会触发--', xhr.readyState);
        if (xhr.readyState === 4 && xhr.status === 200) {
            let endTime = Date.now();
            console.log('从开始发请求，到拿到服务器数据的时间--', endTime - startTime);
            const res = xhr.response;
            console.log(typeof res);
            const data = JSON.parse(res);
            console.log('解析后的数据', typeof data);
            console.log('电影的数据--', data);
            //  在这里拿到电影数据了，我们还要拿一个图片数据
            const img = new Image();
            img.src = src;
            console.log('设置图片src的时间', startTime);
            img.onerror = () => {
                console.log('图片加载报错了--', error);
            }
            img.onload = (e) => {
                let endTime = Date.now();
                console.log('图片加载完了，这个时候，距离设置src，以及onload的时间间隔--', endTime - startTime);
                //  
            };
            let startTime2 = Date.now();
            console.log('设置图片onload的时间--', startTime2);
        }
    }
}


//  用Promise对象来封装xhr


const requestWithXhrInPromise = (apiUrl) => {
    return new Promise((resolve, reject) => {
        console.log('这里是Promise');
        const xhr = new XMLHttpRequest();
        console.log('xhr对象刚刚创建--', xhr.readyState);
        xhr.open('GET', apiUrl);
        console.log('xhr对象调用open方法--', xhr.readyState);
        xhr.send();
        console.log('xhr对象调用send方法--', xhr.readyState);


        xhr.onreadystatechange = function (e) {
            console.log('xhr的readyState变了，这里的回调函数就会触发--', xhr.readyState);
            if (xhr.readyState === 4 && xhr.status === 200) {
                const res = xhr.response;
                console.log(typeof res);
                const data = JSON.parse(res);
                console.log('解析后的数据', typeof data);
                console.log('电影的数据--', data);
                resolve(data);
                
            } else if (xhr.status !== 200) {
                //  表示这次请求出错了
                reject('这次请求嗝屁了，没数据----');
            }
        }
    });
}

//  使用刚刚封装的方法

// requestWithXhrInPromise(API_URL)
//     .then((data) => {
//         //  如果Promise调用了 resolve
//         //  那么就会执行这个函数
//         console.log('data--', data);
//     })
//     // .then(() => {
       
//     // })
//     // .then(() => {
        
//     // })
//     .catch((error) => {
//         console.log('http请求的promise完成了，但是出错了--', error);
//     })
//     .finally(() => {
        
//     })



//  


const mockRequest = () => {
    return new Promise((resolve, reject) => {
        let startTime = Date.now();
        //  我们模拟，三秒后，能拿到服务器数据
        console.log('开始发请求', startTime)
        setTimeout(() => {
            let endTime = Date.now();
            console.log('请求成功啦', endTime)
            console.log('请求耗费的时间--', endTime - startTime);
            const mandomNum = Math.random();
            console.log('随机数--', mandomNum);
            reject({
                status: 404,
                data: {
                    desc: '抱歉，没有找到相应数据'
                }
            })
            if (mandomNum > 0.5) {
                //  成功啦
                resolve({
                    status: 200,
                    data: {
                        desc: '我们拿到服务器数据啦'
                    }
                })
            } else {
                reject({
                    status: 404,
                    data: {
                        desc: '抱歉，没有找到相应数据'
                    }
                })
            }
        }, 3000)
    })
};

const task1 = () => {
    return new Promise((resolve, reject) => {
        console.log('任务1开始啦');
        setTimeout(() => {
            console.log('任务1完成啦')
            resolve('任务1完成')
        }, 1000)
    })
};

const task2 = (task1Data = '222') => {
    return new Promise((resolve, reject) => {
        console.log('任务2开始啦, 接收到任务1的数据--', task1Data);
        setTimeout(() => {
            console.log('任务2完成啦')
            resolve('任务2完成')
        }, 2000)
    })
};

const task3 = (task2Data = '333') => {
    return new Promise((resolve, reject) => {
        console.log('任务3开始啦,接收到task2的数据--', task2Data);
        setTimeout(() => {
            console.log('任务3完成啦')
            resolve('任务3完成')
        }, 3000)
    })
};


const executeTask =  () => {
     console.log('1');
     task1().then(() => {
         return task2()
     }).then(() => {
         return task3()
     }).then(() => {
         console.log('任务全部完成啦');
     });
     console.log('2');
   
     console.log('3')
     
     console.log('4');
}

executeTask();



const request = async () => {

    let a = await  mockRequest().catch(error => {
        return error;
    });
    
     await mockRequest();

    // await mockRequest();
    console.log('promiseRTesult--', promiseResult);
}

//
// let promiseResult = null;
// mockRequest().then((data) => {
//     promiseResult = data;
//     console.log('--', promiseResult);

// }).catch((error) => {
//     promiseResult = error;
//     console('error--', promiseResult);
    
// });

// console.log('不用await--, promiseResult--', promiseResult)

// request();


// mockRequest().then((data) => {
//     console.log('Promise状态为fulfilled--', data)
// } ).catch((error) => {
//     console.log('Promise状态为rejected--', error)
//     //  Promise  状态为 reject
// })




// 宿主
async function getMovies(url) {
    //  fetch 是个异步方法，用 await 来等异步方法完成
    let startTime = Date.now();
    const res = await fetch(url);
    let end
    //  res 是服务器返回的结果，是个object，res有个json方法
    console.log('--', res, typeof res);
    const data = await res.json();

    // showMovies(data.results)
}



function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie; // 解构赋值?

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}"> 
            <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h3>Overview</h3>
            ${overview}
            </div>
        `
        main.appendChild(movieEl)

    });
}// 缩进？

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value; // ??

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()

    }
})

