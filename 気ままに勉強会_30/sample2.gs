/*
* 気ままに勉強会
* スクリプトでデータ型を修正する
* 【方法】
* UNIXタイムスタンプを変換する例
*/

function myFunction() {
  // 1. シートを指定する
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('-シート名を入れてね！-');
  // 2. データがある範囲を取得する
  const range = sheet.getDataRange();
  // 3. 範囲のデータを配列に格納する
  let values = range.getValues();

  // UNIXタイムスタンプを変換する例
  //   ---
  for(let i=1; i < values.length; i++){
      if(Object.prototype.toString.call(values[i][0]) == '[object String]'){
          values[i][0] = Utilities.formatDate(new Date(Number(values[i][0])),"Asia/Tokyo","yyyy/MM/dd HH:mm:ss")
        } 
    }
  //   ---
    
  // 4. 範囲に配列を代入する
  range.setValues(values);
}