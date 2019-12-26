import React, { Component } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-flash';
import defaultSettings from '../../../config/defaultSettings';

const { publicPath } = defaultSettings;

const defaultOptions = {
  aspectRatio: '16:9',
  controls: true,
};

const flashOptions = {
  flash: {
    swf: `${publicPath}video-js.swf`,
  },
};

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
      ...flashOptions,
      ...options,
    };

    // instantiate Video.js
    this.player = videojs(this.videoNode, videoJsOptions, function onPlayerReady(
      this: VideoJsPlayer,
    ) {
      console.log('flash tech', videojs.getTech('flash'));
      console.log('html5 tech', videojs.getTech('html5'));
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
