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
    <div class="card text-center">
            <img class="img-fluid" src="${this.albumArt}" alt="">
            <p><b>${this.artist}</b></p>
            <p><em>${this.title}</em></p>
    </div>
</div>
        `;
  }

  get playlistTemplate() {
    return `

        `;
  }
}
