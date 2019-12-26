import React, { Component } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-flash';

const defaultOptions = {
  aspectRatio: '16:9',
  controls: true,
};

// const flashOptions = {
//   techOrder: ["flash", "html5"],
//   flash: {
//     swf: "https://unpkg.com/@brightcove/videojs-flashls-source-handler/dist/video-js.swf",
//   },
// }

export interface PlayerProps {
  options?: VideoJsPlayerOptions;
  onReady?: (player: VideoJsPlayer) => void;
  style?: React.CSSProperties;
  className?: string;
}

export default class Player extends Component<PlayerProps> {
  videoNode?: HTMLVideoElement;
  player?: VideoJsPlayer;

  componentDidMount() {
    const { options, onReady = () => {} } = this.props;

    const videoJsOptions: VideoJsPlayerOptions = {
      ...defaultOptions,
      ...options,
    };

    // instantiate Video.js
    this.player = videojs(this.videoNode, videoJsOptions, function onPlayerReady(
      this: VideoJsPlayer,
    ) {
      onReady(this);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    const { style, className } = this.props;
    return (
      <div style={style} className={className}>
        {/* data-vjs-player ref: https://docs.videojs.com/tutorial-react.html */}
        <div ata-vjs-player="true">
          <video
            ref={node => {
              if (node) {
                this.videoNode = node;
              }
            }}
            className="video-js vjs-big-play-centered"
          />
        </div>
      </div>
    );
  }
}
