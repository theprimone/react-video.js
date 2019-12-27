import React from 'react';
import videojs, { VideoJsPlayer } from 'video.js';
import ReactDOM from 'react-dom';

const vjsComponent = videojs.getComponent('Component');

export interface WrapperProps extends Omit<React.HTMLAttributes<any>, 'children'> {
  vjsComponent: videojs.Component;
  content: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ content, vjsComponent, ...rest }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      {...rest}
    >
      {content}
    </div>
  );
};

export default class vjsWrapper extends vjsComponent {
  constructor(player: VideoJsPlayer, options: videojs.ComponentOptions) {
    super(player, options);

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
    console.log(this.options_);
    ReactDOM.render(
      <Wrapper vjsComponent={this} {...(this.options_ as WrapperProps)} />,
      this.el(),
    );
  }
}
