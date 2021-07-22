export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    return `
    <div class="bg-light m-3 p-3 shadow">
    <div class="card-columns">
        <div class="card">
            // <img class="" src="" alt="">
            <div class="card-body">
            </div>
        </div>
        <p>${this.artist} - ${this.title}</p>
    </div>
</div>
        `;
  }

  get playlistTemplate() {
    return `

        `;
  }
}
