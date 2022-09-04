/*
* 気ままに勉強会 30
* YouTube Data API
* reference https://developers.google.com/youtube/v3/getting-started?hl=ja
*/
// demo_YouTubeAPI 
function Main() {
  const sheet  = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート名を入れてください！');
  const range = sheet.getDataRange();
  range.clearContent();

  const youtube_url = "https://www.youtube.com/watch?v=";
  const channelId = '取得したいchannelのIDをセットする箇所です';
  const channel = YouTube.Channels.list([
    'snippet',
    'contentDetails',
  ], {
    'id': channelId
  });

  let dat = [];
  let values = new Array("Thumbnail","Title","publishedAt","ID","description","URL");
  const columns = values.length;
  dat.push(values);

  for (let i = 0; i < channel.items.length; i++) {
    const item = channel.items[i];
    const contentDetails = item.contentDetails;
    const playlistId = contentDetails.relatedPlaylists.uploads;
    const videoIds = getYouTubeVideoID(playlistId);
    const videos = getYouTubeVideos(setNextPageToken(videoIds, 50));

    for(let j = 0; j < videos.length; j++){
      values = new Array(null,null,null,null,null,null);
      values[0] = videos[j].snippet.thumbnails.default.url;
      values[1] = videos[j].snippet.title;
      values[2] = Utilities.formatDate(new Date(videos[j].snippet.publishedAt), "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");
      values[3] = videos[j].id;
      values[4] = videos[j].snippet.description;
      values[5] = youtube_url + values[3];
      dat.push(values);
    }
    sheet.getRange(1,1,dat.length,columns).setValues(dat);
  }
}
// 全てのYouTube動画のID取得
function getYouTubeVideoID(id, pageToken) {
  const playlistItemsInfo = YouTube.PlaylistItems.list([
    'contentDetails'
  ], {
    'playlistId': id,
    'maxResults': 50,
    pageToken,
  });

  let videoIds = playlistItemsInfo.items.map(item => item.contentDetails.videoId);
  const nextPageToken = playlistItemsInfo.nextPageToken;

  if (nextPageToken) videoIds = [...videoIds, ...getYouTubeVideoID(id, nextPageToken)];

  return videoIds;
}
// IDからYouTube Videoの情報を取得
function getYouTubeVideos(ids) {
  let videos = [];

  for(let i = 0, l = ids.length; i < l; i++) {
    const videoInfo = YouTube.Videos.list([
      'snippet',
      'statistics',
    ], {
      'id': ids[i].join(','),
    });
    videos = [...videos, ...videoInfo.items];
  }
  return videos;
}
// 再帰のために取得するPageToken
function setNextPageToken(array, number) {
  const length = Math.ceil(array.length / number)
  return new Array(length).fill().map((_, i) =>
    array.slice(i * number, (i + 1) * number)
  )
}