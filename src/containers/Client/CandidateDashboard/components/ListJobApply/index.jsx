import { ExclamationCircleOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Modal,
  Pagination,
  Row,
} from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { DataNull } from 'components/DataNull'
import { get } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userIDSelector } from 'stores/moduleAuth/selectors'
import { recruitmentApplySelector } from 'stores/moduleCandidate/selectors'
import { dispatchDeleteApplyJobRequest, dispatchFetchListEmployerAttention, dispatchFetchListRecruitmentApply } from 'stores/moduleCandidate/thunks'
import { detailRecruimentSelector } from 'stores/moduleRecruitment/selectors'
import { dispatchfetchDetailRecruitment } from 'stores/moduleRecruitment/thunks'
import { v4 } from 'uuid'
import './style.scss'

function ListJobApply() {
  const userID = useSelector(userIDSelector)
  const dispatch = useDispatch()
  const [current, setCurrent] = useState(1)
  const recruitmentapplybyuserid = useSelector(recruitmentApplySelector)
  const detailRecruitment = useSelector(detailRecruimentSelector)

  useEffect(() => {
    dispatch(dispatchFetchListRecruitmentApply({
      id: userID, vacancy: '', limit: 5, page: 1,
    }))
  }, [dispatch])

  const [formState, setFormState] = useState({
    vacancy: '',
  })

  const handleChangeVacancy = (event) => {
    const { value } = event.target
    setFormState(() => ({
      ...formState,
      vacancy: value,
    }))
  }

  const onFinish = () => {
    setCurrent(1)
    dispatch(dispatchFetchListRecruitmentApply({
      id: userID, vacancy: formState.vacancy, limit: 5, page: 1,
    }))
  }

  const handleChangePage = (value) => {
    setCurrent(value)
    dispatch(dispatchFetchListRecruitmentApply({
      id: userID, vacancy: formState.vacancy, limit: 5, page: value,
    }))
  }

  const [visible, setVisible] = useState(false)

  const onClose = () => {
    setVisible(false)
  }

  const handleDeitalRecruitment = (id) => {
    setVisible(true)
    dispatch(dispatchfetchDetailRecruitment(id))
  }

  const datas = detailRecruitment

  const data = get(recruitmentapplybyuserid, 'data', [])

  const handelDelete = (id) => {
    setCurrent(1)
    dispatch(dispatchDeleteApplyJobRequest(id))
  }

  const handleDeleteApplyJob = (event) => {
    Modal.confirm({
      title: 'Th??ng b??o',
      icon: <ExclamationCircleOutlined />,
      content: `B???n c?? mu???n hu??y apply job ${event.vacancy}`,
      okText: 'X??a',
      onOk: () => handelDelete(event.ids),
      cancelText: 'H???y',
    })
  }

  const renderData = () => {
    let jsx = []
    jsx = data.map((value) => (
      <div key={v4()}>
        <Row className="list-employers-content">
          <Col className="list-employers-content-avatar" span={5}>
            <img src={value.photo} alt="avatar" />
          </Col>
          <Col className="list-employers-content-title" span={15}>
            <h5>{value.vacancy}</h5>
            <Row className="list-employers-content-title-dung">
              <Col span={12}>
                <p>
                  S??? l?????ng:
                  {value.quantity}
                </p>
                <p>
                  Vi?? tri??:
                  {value.career}
                </p>
                <p>
                  ??i??a chi??:
                  {value.city}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  Ha??n n????p:
                  {value.end_date}
                </p>
                <p>
                  M????c l????ng:
                  {value.salary}
                </p>
                <p>
                  Hi??nh th????c:
                  {value.type_of_work}
                </p>
              </Col>
            </Row>
          </Col>
          <Col className="list-employers-content-button" span={4}>
            <Button
              type="primary"
              onClick={() => handleDeitalRecruitment(value.id)}
            >
              Chi ti???t
            </Button>

            <Button
              type="primary"
              onClick={() => handleDeleteApplyJob(value)}
            >
              H???y ???ng tuy???n
            </Button>
          </Col>
        </Row>
      </div>
    ))
    return jsx
  }

  return (
    <div className="list-employer-db">
      <div className="list-employer-db__search">
        <Form
          onFinish={onFinish}
          className="list-employer-db__search-form"
          style={{ height: '32px' }}
        >
          <Form.Item
            name="vacancy"
            className="list-employer-db__search-form-input"
            onChange={handleChangeVacancy}
          >
            <Input placeholder="T??m ki???m tin tuy???n d???ng" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              T??m ki???m
            </Button>
          </Form.Item>
        </Form>
        <Drawer
          title="Chi ti???t vi???c l??m"
          width={720}
          closable
          onClose={onClose}
          visible={visible}
          className="drawer-recruitment"
          footer={(
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                H???y
              </Button>
            </div>
          )}
        >
          <Row className="detail-content">
            <Avatar shape="square" size={100} src={datas.photo} />
            <h5>{datas.vacancy}</h5>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                S??? l?????ng:
                {' '}
                {datas.quantity}
              </p>
              <p>
                V??? tr???:
                {' '}
                {datas.rank}
              </p>
              <p>
                H??nh th???c:
                {' '}
                {datas.type_of_work}
              </p>
            </Col>
            <Col span={12}>
              <p>
                M???c l????ng:
                {' '}
                {datas.salary}
              </p>
              <p>
                H???n n???p:
                {' '}
                {datas.end_date}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <p>
                M?? t???:
                {' '}
                {datas.description}
              </p>
              <p>
                Quy???n l???i ???????c h?????ng:
                {' '}
                {datas.entitlements}
              </p>
              <p>
                Y??u c???u c??ng vi???c:
                {' '}
                {datas.job_requirements}
              </p>
              <p>
                Y??u c???u h??? s??:
                {' '}
                {datas.requested_documents}
              </p>
              <p>
                ?????a ch???:
                {' '}
                {datas.city}
              </p>
            </Col>
          </Row>
          <div
            className="ant-divider ant-divider-horizontal"
            role="separator"
          />

          <Row className="detail-content">
            <Avatar shape="square" size={100} src={datas.avatar} />
            <h5>{datas.company}</h5>
          </Row>
          <Row>
            <Col span={24}>
              <p>
                Website:
                {' '}
                {datas.website}
              </p>
              <p>
                Ng?????i li??n h???:
                {' '}
                {datas.contact}
              </p>
              <p>
                ?????a ch??? c??ng ty:
                {' '}
                {datas.address}
              </p>
            </Col>
          </Row>
        </Drawer>
      </div>
      <div className="list-employers">
        {
          data.length ? renderData() : DataNull()
        }

        {data.length === 0 ? (
          ''
        ) : (
          <div className="custom-pagination">
            <Pagination
              onChange={handleChangePage}
              defaultCurrent={1}
              defaultPageSize={5}
              total={recruitmentapplybyuserid.total}
              current={current}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default ListJobApply
