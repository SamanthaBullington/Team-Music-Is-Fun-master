import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
        console.log(res);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  setCurrentSong(id) {
    const song = ProxyState.songs.find(s => s.id === id)
    if (!song) {
      throw new Error("Invalid Song ID")
    }
    ProxyState.currentSong = song
    ProxyState.songs = ProxyState.songs
  }
  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    const res = await sandBoxApi.get()
    console.log(res.data)
    ProxyState.playlist = res.data.map(s => new Song(s))
    console.log(ProxyState.playlist)
    //TODO What are you going to do with this result
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info

   */
  async addSong() {
    const res = await sandBoxApi.post('', ProxyState.currentSong)
    console.log(res.data);
    const newSong = new Song(res.data)
    ProxyState.songs = [...ProxyState.songs, newSong]
    ProxyState.currentSong = newSong
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
  }
}

const service = new SongsService();
export default service;
