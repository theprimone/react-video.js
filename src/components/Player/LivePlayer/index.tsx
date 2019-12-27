import React from 'react';
import classNames from 'classnames';
import BasePlayer, { BasePlayerProps } from '../BasePlayer';
import styles from './index.less';

const LivePlayer: React.FC<BasePlayerProps> = props => {
  const { className, videoClassName, ...rest } = props;
  return (
    <BasePlayer
      className={classNames(styles.livePlayer, className)}
      videoClassName={classNames('vjs-big-play-centered', className)}
      {...rest}
    />
  );
};

export default LivePlayer;
