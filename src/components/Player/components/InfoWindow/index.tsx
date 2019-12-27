import React, { Component } from 'react';
import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import ReactDOM from 'react-dom';
import videojs from 'video.js';

const vjsComponent = videojs.getComponent('Component');

class InfoWindow extends Component<any> {
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <h1 style={{ color: 'white' }}>{this.props.body}</h1>
      </div>
    );
  }
}

export default class vjsInfoWindow extends vjsComponent {
  constructor(player: VideoJsPlayer, options: VideoJsPlayerOptions) {
    super(player, options);
    console.log('vjsInfoWindow options', options);

    /* Bind the current class context to the mount method */
    this.mount = this.mount.bind(this);

    /* When player is ready, call method to mount React component */
    player.ready(() => {
      this.mount();
    });

    /* Remove React root when component is destroyed */
    this.on('dispose', () => {
      ReactDOM.unmountComponentAtNode(this.el());
    });
  }

  /**
   * We will render out the React EpisodeList component into the DOM element
   * generated automatically by the VideoJS createEl() method.
   *
   * We fetch that generated element using `this.el()`, a method provided by the
   * vjsComponent class that this class is extending.
   */
  mount() {
    ReactDOM.render(<InfoWindow vjsComponent={this} body="InfoWindow" />, this.el());
  }
}
