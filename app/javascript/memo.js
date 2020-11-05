function memo() {
  // getElementByIdを用いて「投稿する」ボタンの情報を取得
  const submit = document.getElementById("submit");
  // 投稿するボタンを「click」した場合に実行される関数を定義
  submit.addEventListener("click", (e) => {
    // メモ投稿のフォームに入力された情報を送信
    const formData = new FormData(document.getElementById("form"));
    // 非同期通信を実装するために必要なXMLHttpRequestのオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // リクエストの内容を引数へ追記
    XHR.open("POST", "/posts", true);
    // 返却されるデータ形式はJSON
    XHR.responseType = "json";
    // メモ投稿のフォームに入力された情報を送信
    XHR.send(formData);
    // 「HTMLのメモ部分」を描画する処理を記述
    XHR.onload = () => {
      // 200以外のHTTPステータスが返却された場合の処理
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      // HTMLを描画する場所を指定する際に使用
      const list = document.getElementById("list");
      // メモの入力フォームをリセットするための記述
      const formText = document.getElementById("content");
      // 「メモとして描画する部分のHTML」を定義してる
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      // 「メモの入力フォームに入力されたままの文字」はリセットされます
      formText.value = "";
    };
    e.preventDefault();
  });
}
// window（ページ）をload（読み込み）時に実行
window.addEventListener("load",memo);