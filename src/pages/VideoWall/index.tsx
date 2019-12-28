import React, { useState, useEffect } from 'react';
import { VideoJsPlayer } from 'video.js';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Radio, Input, Form, Button, Row, Col } from 'antd';
import defaultSettings from '../../../config/defaultSettings';
import { LivePlayer } from '@/components/Player';

const { publicPath } = defaultSettings;

const sources = [
  {
    src: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
  },
  {
    src: 'http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8',
  },
  {
    src: 'http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8',
  },
  {
    src: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8',
  },
  {
    src: 'rtmp://fms.105.net/live/rmc1',
  },
];

function setColSpan() {
  if (sources.length === 1) {
    return 24;
  } else if (sources.length > 1 && sources.length <= 4) {
    return 12;
  }
  return 8;
}

export default (): React.ReactNode => {
  return (
    <PageHeaderWrapper>
      <Card>
        <Row gutter={[16, 16]}>
          {sources.map(item => {
            return (
              <Col span={setColSpan()} key={item.src}>
                <LivePlayer
                  options={{
                    sources: [{ src: item.src }],
                    poster: `${publicPath}icons/videojs.png`,
                    // autoplay: true,
                  }}
                  style={{ height: 400 }}
                />
              </Col>
            );
          })}
        </Row>
      </Card>
    </PageHeaderWrapper>
  );
};
