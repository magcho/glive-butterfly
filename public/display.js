// Initialize Vue
let area = new Vue({
  el: '#vue',
  data: {
    colors:[],
    currentId:0
  },
  methods:{
    addColor: function(value){
      let count = this.currentId;
      this.colors.push({
        hex: value,
        id: count,
        x: getRandom(0,1430)-150, // 720
        y: getRandom(0,848)-128, // 1280
        deg: getRandom(0,360)
      });
      this.currentId++;
    },
  }
});

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBU1srwD4hPGBRGrxWMtdHGNa3SVv29NSQ",
  authDomain: "glive-lisa.firebaseapp.com",
  databaseURL: "https://glive-lisa.firebaseio.com",
  projectId: "glive-lisa",
  storageBucket: "glive-lisa.appspot.com",
  messagingSenderId: "598846560816"
};
firebase.initializeApp(config);


const db = firebase.database();
const chatAll = db.ref("/colors");

//初期読み込み
chatAll.once("value", function(snapshot) {
  let data = snapshot.val();
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      area.addColor(data[key].color);
    }
  }
});
//DB内容が変更されたとき実行される
chatAll.limitToLast(1).on("value", function(snapshot) {
  let data = snapshot.val();
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      area.addColor(data[key].color);
    }
  }
});


/**
 * 指定した範囲の整数値の乱数を返す
 * @method getRand
 * @param  {int} min [description]
 * @param {int} max
 * @return {int}     [description]
 */
function getRandom( min, max ) {
  return  Math.floor( Math.random() * (max + 1 - min) ) + min;
}



setInterval(function () {
  let delCount = 0;
  for (var i in area._data.colors) {
    if (area._data.colors.hasOwnProperty(i)) {
      if(area._data.colors[i-delCount].x >= -300 && area._data.colors[i].y >= -218){
        area._data.colors[i-delCount].x--;
        area._data.colors[i-delCount].y--;
      }else{
        // del dom object
        area._data.colors.splice(i-delCount,1);
        delCount++;
      }
    }
  }
}, 10);
