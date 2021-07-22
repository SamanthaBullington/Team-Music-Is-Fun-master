import { ProxyState } from "../AppState.js";
import songService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  const songs = ProxyState.songs
  let template = ''
  songs.forEach(s => template += `
  <div class="bg-light m-3 p-3 shadow">
  <div class="song card text-center" onclick="app.songsController.setCurrentSong(${s.id})">
          <img class="img-fluid" src="${s.albumArt}" alt="">
          <p><b>${s.artist}</b></p>
          <p><em>${s.title}</em></p>
  </div>
</div>
`)
  document.getElementById('songs').innerHTML = template
}

function _drawCurrentSong() {
  if (!ProxyState.currentSong) {
    document.getElementById('currentsong').innerHTML = '<div class="text-center"><em>No Active Song</em></div>'
    return
  }
  document.getElementById('currentsong').innerHTML = ProxyState.currentSong.Template
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  const playlist = ProxyState.playlist
  const currentSong = ProxyState.currentSong || {}
  let template = ''
  playlist.forEach(s => template += s.Template)
  document.getElementById('playlist').innerHTML = template
}

//Public
export default class SongsController {
  constructor() {
    ProxyState.on('songs', _drawResults)
    ProxyState.on('currentSong', _drawCurrentSong)
    ProxyState.on('playlist', _drawPlaylist)
    this.getMySongs()
    _drawPlaylist()
    //TODO Don't forget to register your listeners and get your data
  }
  async getMySongs() {
    try {
      await songService.getMySongs()
    } catch (error) {
      console.error('failed to get sandbox songs' + error)
    }
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);
      console.log('searching song')
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist

   */
  async addSong() {
    try {
      await songService.addSong()
    } catch (error) {
      console.error('something went wrong with addding the song')
    }
  }

  setCurrentSong(id) {
    try {
      songService.setCurrentSong(id)
    } catch (error) {
      console.error('invalid ID')
    }
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) { }
}
