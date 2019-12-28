import React, { Component } from 'react';
import classNames from 'classnames';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-flash';
import 'videojs-playlist';
import 'videojs-playlist-ui';
import 'videojs-playlist-ui/dist/videojs-playlist-ui.css';
import '../components';
import defaultSettings from '../../../../config/defaultSettings';
import styles from './index.less';

const { publicPath } = defaultSettings;

const defaultOptions: VideoJsPlayerOptions = {
  // aspectRatio: '16:9',
  // fluid: true,
  techOrder: ['html5', 'flash'],
  controls: true,
};

const flashOptions = {
  flash: {
    swf: `${publicPath}video-js.swf`,
  },
};

export interface BasePlayerProps {
  options?: VideoJsPlayerOptions;
  onReady?: (player: VideoJsPlayer) => void;
  style?: React.CSSProperties;
  className?: string;
  videoClassName?: string;
}

export default class BasePlayer extends Component<BasePlayerProps> {
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
      // console.log('flash tech', videojs.getTech('flash'));
      // console.log('html5 tech', videojs.getTech('html5'));
      onReady(this);
      this.on('error', () => {
        console.error('VIDEOJS: ERROR: videoJsOptions:', videoJsOptions);
      });
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    const { style, className, videoClassName } = this.props;
    return (
      <div style={style} className={classNames(styles.basePlayer, className)}>
        {/* data-vjs-player ref: https://docs.videojs.com/tutorial-react.html */}
        <div data-vjs-player="true">
          <video
            ref={node => {
              if (node) {
                this.videoNode = node;
              }
            }}
            className={classNames('video-js', videoClassName)}
          />
          <div className="vjs-playlist" />
        </div>
      </div>
    );
  }
}
