// Initialize Vue
let area = new Vue({
  el: '#vue',
  data: {
    inputColor: {
      red: '50',
      green: '100',
      blue: '150',
      hex: '000000'
    },
    colors:[],
    sendWingFlag: false
  },
  methods:{
    addColor: function(value){
      console.log()
      this.colors.push({color: value});
    },
    updateWingColor: function(){
      let red = Number(this.inputColor.red) < 16 ? '0' + Number(this.inputColor.red).toString(16) : Number(this.inputColor.red).toString(16);
      let green = Number(this.inputColor.green) < 16 ? '0' + Number(this.inputColor.green).toString(16) : Number(this.inputColor.green).toString(16);
      let blue = Number(this.inputColor.blue) < 16 ? '0' + Number(this.inputColor.blue).toString(16) : Number(this.inputColor.blue).toString(16);
      this.inputColor.hex = '' +  red + green + blue;
    },
    pushData: function(){
      db.ref("/colors").push({
        color: this.color.hex
      });
    }
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
//入力内容を更新した時
let changeData = function(){
  db.ref("/colors").push({
    color: area._data.inputColor.hex
  });
  sendWingAnime();
}
//htmlロードが完了したらボタンにイベントを設定
window.onload = function() {
  // cssアニメ発火
  newButterfly();
  document.getElementById("btnChangeData").onclick = changeData;
};


function newButterfly(){
  area._data.sendWingFlag = false;
  document.getElementById('wingl1').style.animationName = 'flying1';
  document.getElementById('wingl2').style.animationName = 'flying1';
  document.getElementById('wingl2').style.animationDelay = '0.5s';
  document.getElementById('wingr1').style.animationName = 'flying1';
  document.getElementById('wingr2').style.animationName = 'flying1';
  document.getElementById('wingr2').style.animationDelay = '0.5s';
}

function sendWingAnime(){
  document.getElementById('wingl1').style.animationName = 'flying1-send';
  document.getElementById('wingl2').style.animationName = 'flying1-send';
  document.getElementById('wingl2').style.animationDelay = '0.1s';
  document.getElementById('wingr1').style.animationName = 'flying1-send';
  document.getElementById('wingr2').style.animationName = 'flying1-send';
  document.getElementById('wingr2').style.animationDelay = '0.1s';

  area._data.sendWingFlag = true;
  setTimeout(function () {
    newButterfly();
  }, 1000);
}
