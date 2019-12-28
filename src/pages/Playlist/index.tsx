import React from 'react';
import { VideoJsPlayer } from 'video.js';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card } from 'antd';
import defaultSettings from '../../../config/defaultSettings';
import { LivePlayer } from '@/components/Player';
import styles from './index.less';

const { publicPath } = defaultSettings;

const playlist = [
  {
    name: 'CCTV-1',
    description:
      "CCTV-1 (CCTV General Channel) is the primary channel in CCTV, the national flagship terrestrial television network of the People's Republic of China.",
    sources: [
      {
        src: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
      },
    ],
    poster: `${publicPath}/icons/videojs.png`,
  },
  {
    name: 'CCTV-3',
    description:
      "CCTV-3 is the art focused channel of the CCTV (China Central Television) Network in the People's Republic of China. ",
    sources: [
      {
        src: 'http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8',
      },
    ],
    poster: `${publicPath}/icons/videojs.png`,
  },
  {
    name: 'CCTV-5+',
    description:
      "CCTV-5+ (Sports Plus) formerly CCTV-HD is China Central Television's channel designed to broadcast sports events in HD.",
    sources: [
      {
        src: 'http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8',
      },
    ],
    poster: `${publicPath}/icons/videojs.png`,
  },
  {
    name: 'CCTV-6',
    description:
      'China Movie Channel is a trade name of what is literally translated as the "Film Satellite Channel Programme Production Centre"',
    sources: [
      {
        src: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8',
      },
    ],
    poster: `${publicPath}/icons/videojs.png`,
  },
  {
    name: 'Live 247 - rmc1',
    description: 'Live 247 - rmc1',
    sources: [
      {
        src: 'rtmp://fms.105.net/live/rmc1',
      },
    ],
    poster: `${publicPath}/icons/videojs.png`,
  },
];

export default (): React.ReactNode => {
  return (
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
};
