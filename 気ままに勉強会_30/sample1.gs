/*
* 気ままに勉強会
* スクリプトでデータ型を修正する
* 【方法】
* データを配列に格納して、同じ範囲に代入するだけ！
*/
// sampleコード ほぼ値貼り付け
function myFunction() {
  // 1. シートを指定する
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('-シート名を入れてね！-');
  // 2. データがある範囲を取得する
  const range = sheet.getDataRange();
  // 3. 範囲のデータを配列に格納する
  const values = range.getValues();
  // 4. 範囲に配列を代入する
  range.setValues(values);
}
