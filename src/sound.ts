class Sound {
  public sound: HTMLAudioElement;

  constructor() {
    this.sound = document.createElement('audio');
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
  }

  play(src: string): void {
    this.sound.src = src;
    this.sound.play();
  }
}

export default Sound;
