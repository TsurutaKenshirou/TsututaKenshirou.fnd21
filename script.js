'use strict'
// 1行目に記載している 'use strict' は削除しないでください

const synth = new Tone.Synth().toDestination();//tone.〇〇が音の種類　toDestinationが音の出す位置。マスタースピーカーのこと

function drawKeyboard() {// 鍵盤の描画メソッド
  let element = document.getElementById("textbox");//HTMLのテキストボックス部分
  console.log(element.value);//出力鍵盤数はとれているか
  let eValue = parseInt(element.value);//テキストボックス内のものはtextであり数値でも文字列扱い。parseIntで数値に変換する
  console.log(typeof eValue);//数値になったか確認した
  if (!isNaN(eValue)) {//もしもeValueが数値だったら（数値以外だったら、を反転させた）
  const keyboardreset = document.getElementById("keyboard");//起動時のキーボード初期化のための情報取得
  keyboardreset.innerHTML = "";//innerHTMLを空っぽにする。これでボタンを連打して無尽蔵に増やすことができなくなる。が変な挙動も面白かった
  // 鍵盤の生成(音階を表す文字列を配列に入れておきます)
  const musicalScaleArray = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];//これを見てtone.jsが音を配置する
  let baseKey;  //resultの部分　
  // 1つ1つ鍵盤を作っていく作業
  for (let i = 0; i < element.value; i++) {
    // 鍵盤をボタンとして作成する
    const key = document.createElement("button");//htmlのbodyタグ内にボタンを作成、これが鍵盤になる
    // idに音階の情報を付与(スタートはC3にしたい)
    key.id = `key_${musicalScaleArray[i % musicalScaleArray.length]}${Math.floor(i / 12) + 3}`;//テンプレートリテラルで記入する
    console.log(key.id);
    //keyのidタグは　key_C3となり3オクターブ目のドが出る。i/12としているのは、12鍵盤を超えて12/12となったとき1残り、3が足されて4、
    //key_c4となり1オクターブあげることができる。

    // クリックしている間に音が出るという仕様にする
    key.onmousedown = play;//マウスのイベント。addEventListenerでなく、HTMLにJavascriptから直接書きに行く。
    key.onmouseup = stop;
    key.onmouseleave = stop;

    // 黒鍵が白鍵かによってデザインを変えるので、そのためのclassをそれぞれ付与
    if (musicalScaleArray[i % 12].indexOf("#") > -1) {//indexOf 個別に抜き取られた音階Arrayの要素に#がついていたら、#の位置、1を返す。なかったら-1を返す
      console.log(musicalScaleArray[i % 12]);//i % 12 とやるとc、c#、d、d#と配列がループする。
      // 黒鍵(#がついている)
      key.classList.add("black");//ループ処理　.classList.addとすればボタン（key)にclassを足せる
    } else {
      // 白鍵
      key.classList.add("white");//白鍵盤のクラスを追加する。
      baseKey = document.createElement("div");
    }
    baseKey.appendChild(key);//キーはボタンの事
    document.getElementById("keyboard").appendChild(baseKey);
  }
} else {
  return alert("数値をいれてね");
} 
};

// 音の再生 toneJSのしくみ
const play = async (e) => {
  await Tone.start();
  // 鍵盤のidから音階を取得
  const scale = e.target.id.split("_")[1];
  // 指定した音を再生する
  synth.triggerAttack(scale);
};

// 音の停止
const stop = async (e) => {
  synth.triggerRelease();
};
