import React from 'react'
import { Spin, Icon } from 'antd'

import Wraper from './Wraper'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const Spinner = () => (
  <Wraper>
    <Spin indicator={antIcon} />
  </Wraper>
)

export default Spinner;