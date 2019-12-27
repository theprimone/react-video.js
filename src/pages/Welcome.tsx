import React, { useState, useEffect } from 'react';
import { VideoJsPlayer } from 'video.js';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Radio, Input, Form, Button, Descriptions } from 'antd';
import defaultSettings from '../../config/defaultSettings';
import { LivePlayer } from '@/components/Player';
import styles from './Welcome.less';

const { publicPath } = defaultSettings;

const techOptions = [
  { label: 'html5', value: 'html5' },
  { label: 'flash', value: 'flash' },
];

export default (): React.ReactNode => {
  const [player, setPlayer] = useState<VideoJsPlayer>();
  const [videoKey, setVideoKey] = useState(1);
  const [techOrder, setTechOrder] = useState('flash');
  const [url, setUrl] = useState('rtmp://video.cloudta.net/live/f7a6ead72c67498fb768cd1d5317b7d1');
  // const [url, setUrl] = useState('rtmp://fms.105.net/live/rmc1');
  const [dimension, setDimension] = useState<number[]>([]);

  useEffect(() => {
    player?.dispose();
    setPlayer(undefined);
    setVideoKey(videoKey + 1);
  }, [techOrder]);

  const videoInfo = (
    <Descriptions column={1}>
      <Descriptions.Item label="Url">{url}</Descriptions.Item>
      <Descriptions.Item label="Resolution">
        {dimension[0]} x {dimension[1]}
      </Descriptions.Item>
    </Descriptions>
  );

  useEffect(() => {
    if (player && dimension.length && !player.getChild('InfoWindow')) {
      player.addChild('InfoWindow', { content: videoInfo });
    }
  }, [dimension.length]);

  function handleApply() {
    player?.src(url);
    player?.autoplay(true);
  }

  return (
    <PageHeaderWrapper title="Live Player">
      <Card>
        <LivePlayer
          key={videoKey}
          options={{
            techOrder: [techOrder],
            sources: [{ src: url }],
            poster: `${publicPath}icons/videojs.png`,
          }}
          className={styles.video}
          onReady={(_player: VideoJsPlayer) => {
            setPlayer(_player);

            _player.on('play', () => {
              setDimension([_player.videoWidth(), _player.videoHeight()]);
            });
          }}
        />
        <div className={styles.form}>
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
            <Form.Item label="tech">
              <Radio.Group
                options={techOptions}
                value={techOrder}
                onChange={event => setTechOrder(event.target.value)}
              />
            </Form.Item>
            <Form.Item label="url">
              <Input
                value={url}
                onChange={event => {
                  setUrl(event.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 8 }}
              extra={
                <span>{!player && `instantiating video.js by techOrder: [${techOrder}]...`}</span>
              }
            >
              <Button type="primary" onClick={handleApply} disabled={!player}>
                Apply
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};
