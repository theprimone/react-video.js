import React from 'react';
import videojs, { VideoJsPlayer } from 'video.js';
import ReactDOM from 'react-dom';
import { Wrapper, WrapperProps } from '../Wrapper';
import styles from './index.less';

const vjsComponent = videojs.getComponent('Component');

export interface InfoWindowProps extends WrapperProps {}

const InfoWindow: React.FC<InfoWindowProps> = ({ content, vjsComponent, ...rest }) => {
  const wrapper = (
    <div className={styles.info}>
      <span
        className={styles.infoClose}
        onClick={() => {
          if (vjsComponent) {
            vjsComponent.dispose();
          }
        }}
      >
        [x]
      </span>
      {content}
    </div>
  );
  return <Wrapper vjsComponent={vjsComponent} content={wrapper} {...rest} />;
};

export default class vjsInfoWindow extends vjsComponent {
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
      <InfoWindow vjsComponent={this} {...(this.options_ as WrapperProps)} />,
      this.el(),
    );
  }
}
