Reveal.initialize({
  scrollActivationWidth: 0,
  width: "100%",
  height: "100%",
  margin: 0.1,
  minScale: 1,
  maxScale: 1,
  touch: false,
  hash: true,
  transition: "fade", // none/fade/slide/convex/concave/zoom
  backgroundTransition: "none", // none/fade/slide/convex/concave/zoom
  plugins: [RevealAudioSlideshow, RevealMenu],
  audio: {
    prefix: "audio/",
    suffix: ".mp3",
    advance: 500,
    autoplay: false,
    defaultAudios: true, // try to play audios with names such as audio/1.2.ogg
    playerOpacity: 1,
  },
  menu: {
    custom: [
      {
        title: "সূরাসমুহ",
        icon: '<i class="fa fa-list">',
        src: "list.html",
      },
    ],
  },
});
