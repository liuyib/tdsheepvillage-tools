import React, { useState } from 'react'
import './index.css'
import config from '../../config'
import towerData from '../../data/tower'
import { Form, InputNumber, Button, Space, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { Option } = Select
const { towers } = config

const Home = () => {
  const [form] = Form.useForm()
  const [total, setTotal] = useState(0)
  const [prices, setPrices] = useState([])

  const onSubmit = () => form.submit()

  const onCalcTotalPrice = (values) => {
    const { towers } = values
    const _prices = []
    let _total = 0

    towers.forEach((val, index) => {
      const { select, level, count } = val
      const tower = towerData[select]
      let price = 0

      // 更换塔类型时，等级变得不合法
      if (!tower[level]) {
        const currRow = form.getFieldValue(`towers`)[index]
        // 重置当前列的塔等级
        currRow.level = config.tower[select].maxLevel
        // 重新计算价钱
        price = tower[currRow.level] * count
      } else {
        price = tower[level] * count
      }

      _total += price
      _prices.push(price)
    })

    setTotal(_total)
    setPrices(_prices)
  }

  return (
    <Form
      className="form"
      name="dynamic_form"
      autoComplete="off"
      form={form}
      onFinish={onCalcTotalPrice}
    >
      <Form.List name="towers">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => {
              const _ = form.getFieldValue('towers')[index]
              const item = _ ? _ : {}

              return (
                <Space key={field.key} className="form-space" align="middle">
                  <Form.Item
                    {...field}
                    className="form-item"
                    name={[field.name, 'select']}
                    fieldKey={[field.fieldKey, 'select']}
                    initialValue={towers[0].value}
                  >
                    <Select style={{ width: '90px' }} onChange={onSubmit}>
                      {towers.map((item) => (
                        <Option key={item.value} value={item.value}>
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prev, curr) => {
                      const prevTowers = prev.towers[index]
                      const currTowers = curr.towers[index]
                      const preVal = prevTowers && prevTowers.select
                      const curVal = currTowers && currTowers.select
                      return preVal !== curVal
                    }}
                  >
                    {() => {
                      const selected =
                        item && item.select ? item.select : 'sentry'

                      return (
                        <Form.Item
                          {...field}
                          className="form-item"
                          label="等级"
                          name={[field.name, 'level']}
                          fieldKey={[field.fieldKey, 'level']}
                          initialValue={1}
                        >
                          <InputNumber
                            className="form-input"
                            style={{ width: '70px' }}
                            min={1}
                            max={config.tower[selected].maxLevel}
                            placeholder="输入等级"
                            onChange={onSubmit}
                          ></InputNumber>
                        </Form.Item>
                      )
                    }}
                  </Form.Item>
                  <Form.Item
                    {...field}
                    className="form-item"
                    label="个数"
                    name={[field.name, 'count']}
                    fieldKey={[field.fieldKey, 'count']}
                    initialValue={1}
                  >
                    <InputNumber
                      className="form-input"
                      style={{ width: '70px' }}
                      min={1}
                      placeholder="输入个数"
                      onChange={onSubmit}
                    ></InputNumber>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    className="form-item form-price"
                    label="价值"
                    name={[field.name, 'price']}
                    fieldKey={[field.fieldKey, 'price']}
                  >
                    <div>{prices[index]}</div>
                  </Form.Item>
                  <MinusCircleOutlined
                    className="icon-minus"
                    onClick={() => remove(field.name)}
                  />
                </Space>
              )
            })}

            <Form.Item>
              <Button
                type="dashed"
                block
                className="form-btn-add"
                icon={<PlusOutlined />}
                onClick={() => {
                  add()
                  onSubmit()
                }}
              >
                点击添加
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>总价值：{total}</Form.Item>
    </Form>
  )
}

export default Home
