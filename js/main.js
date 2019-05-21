'use strict';
{
  // id=cvの要素を取得
  var cv = document.getElementById("cv");

  if(cv && cv.getContext) {
    var ctx = cv.getContext("2d");

    // Squareオブジェクト関数の作成
    // set属性値をセット
    var Square = function(){
      return this.set();
    }

    // Squareオブジェクトのプロトタイプメソッドsetを作成
    Square.prototype.set = function(){
      var radian = Math.random() * (Math.PI * 360);
      this.x = cv.width * Math.random();
      this.y = cv.height * Math.random();
      this.to_x = Math.cos(radian);
      this.to_y = Math.sin(radian);
      this.speed = Math.random() * 3 + 2;
      this.size = Math.random() * 4 + 1;
    }

    // Squareオブジェクトのプロトタイプメソッドmoveを作成(現在位置を書き換えるメソッド)
    Square.prototype.move = function(){
      this.x += this.to_x * this.speed;
      this.y += this.to_y * this.speed;
      this.out_square_in();
    }
    /* out_square_inは、各インスタンスが canvasの画面外に出てしまった場合に、
    インスタンスが再度画面内に入るよう位置調整する */
    Square.prototype.out_square_in = function(){
      if(this.x + this.size < 0) this.x = cv.width;
      if(cv.width < this.x) this.x = 0 - this.size;
      if(this.y + this.size < 0) this.y = cv.height;
      if(cv.height < this.y) this.y = 0 - this.size;
    }


    // インスタンス変数の作成し空の配列を入れる
    var instances = [];
    // for文で100回の繰り返しを定義
    for(var i = 1; i <= 100; i++){
      // 配列.pushで一番最後に要素を追加し、Squareオブジェクトのインスタンスを入れる
      instances.push( new Square());
    }

    /* draw関数を定義して全てのインスタンスを画面に描画するため関数
    この関数を一定間隔で使用することにより、アニメーションを実現 */
    function draw(){
      var p;
      ctx.fillStyle = "#2EFEF7" //背景色
      ctx.fillRect(0, 0, cv.width, cv.height);
      // for文を使用して「配列 instances に格納しているインスタンスの数だけ処理を実行
      for (var i = 0; i < instances.length; i++) {
        p = instances[i];
        ctx.fillStyle = "#FA58D0";
        // 描画後のインスタンスの縦、横、サイズの指定
        ctx.fillRect( p.x, p.y, p.size, p.size);
        p.move();
      }
    }
    // 動きを一定間隔で実行する
    setInterval(draw,40);
  }
}
