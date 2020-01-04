import React from 'react';
import { VideoJsPlayer } from 'video.js';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card } from 'antd';
import { LivePlayer } from '@/components/Player';
import { playlist } from './playlist';
import styles from './index.less';

export default () => (
  <PageHeaderWrapper>
    <Card>
      <LivePlayer
        options={{
          autoplay: true,
        }}
        className={styles.video}
        onReady={(_player: VideoJsPlayer) => {
          (_player as any).playlist(playlist);
          (_player as any).playlistUi();
        }}
      />
    </Card>
  </PageHeaderWrapper>
);
