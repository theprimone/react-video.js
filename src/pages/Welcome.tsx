import React, { useState, useEffect } from 'react';
import { VideoJsPlayer } from 'video.js';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Radio, Input, Form, Button } from 'antd';
import defaultSettings from '../../config/defaultSettings';
import Player from '@/components/Player';
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
  const [url, setUrl] = useState('rtmp://fms.105.net/live/rmc1');

  useEffect(() => {
    player?.dispose();
    setPlayer(undefined);
    setVideoKey(videoKey + 1);
  }, [techOrder]);

  function handleApply() {
    player?.src(url);
    player?.autoplay(true);
  }

  return (
    <PageHeaderWrapper title="Live Player">
      <Card>
        <Player
          key={videoKey}
          options={{
            techOrder: [techOrder],
            sources: [{ src: url }],
            poster: `${publicPath}icons/videojs.png`,
          }}
          className={styles.video}
          onReady={_player => {
            setPlayer(_player);
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
