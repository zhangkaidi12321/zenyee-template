import React from 'react'
import { Tooltip } from 'antd'
import style from './index.less'

interface ButtonsGroupModal {
  buttons: Array<any>;
  direction: 'column' | 'row';
  onItemClick: any;
}

const Group = (params: ButtonsGroupModal): JSX.Element => {
  const { buttons = [], direction='column', onItemClick } = params
  return (
    <div style={{ flexDirection: direction }} className={style.buttonsContainer}>
      {
        buttons.map((v, i) => {
          return <div key={i} className={style.buttonsItemWrapper}>
            {
              v.tooltip ?
                <Tooltip
                  title={<div className={`${style.tooltipTextWrapper} theme`}>{v.tooltip}</div>}
                  overlayClassName={style.tooltipOverlay}
                  placement="right"
                >
                  <div
                    // eslint-disable-next-line consistent-return
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onItemClick) onItemClick(v.label)
                      else return null
                    }}
                    className={`${v.active ? 'theme' : ''} ${style.buttonsItem}`}
                  >
                    <i className={`fa ${v.label}`} />
                  </div>
                </Tooltip>
                :
                <div
                  // eslint-disable-next-line consistent-return
                  onClick={() => {
                    if (onItemClick) onItemClick(v.label)
                    else return null
                  }}
                  className={`${v.active ? 'theme' : ''} ${style.buttonsItem}`}
                >
                  <i className={`fa ${v.label}`} />
                </div>
            }
          </div>
        })
      }
    </div>
  )
}

export default Group