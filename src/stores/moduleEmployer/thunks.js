import { deleteApplyJobAPI } from 'api/candidateAPI'
import { getCvByEmployerIdAPI } from 'api/cvAPI'
import * as employerAPI from 'api/employerAPI'
import { sendMail, sendMailInterView, sendMailReject } from 'api/mailAPI'
import { push } from 'connected-react-router'
import { toastSuccess, toastWarning } from 'helpers/toastify'
import { get, head } from 'lodash'
import { routes } from 'routes/routes'
import Store from 'stores/store'

import {
  fetchListEmployerOrderSuccess,
  fetchInfoEmployerSuccess,
  fetchListEmployerSuccess,
  fetchDashboardEmployerSuccess,
  fetchlistCvAppliedSuccess,
  fetchListCvAttentionSuccess,
} from './slices'

export const fetchListEmployerOrderRequest = () => async (dispatch) => {
  try {
    const resp = await employerAPI.fetchListEmployerOrder()
    const { data } = resp
    dispatch(fetchListEmployerOrderSuccess(get(data, 'result', [])))
  } catch (error) {
    toastWarning('fetch List Employer Order fail !')
  }
}

export const fetchListEmployerRequest = (payload) => async (dispatch) => {
  try {
    const resp = await employerAPI.fetchListEmployer(payload)
    const { data } = resp
    dispatch(fetchListEmployerSuccess(get(data, 'result', [])))
  } catch (error) {
    toastWarning('fetch List Employer fail !')
  }
}

export const fetchInfoEmployerRequest = (id) => async (dispatch) => {
  try {
    const resp = await employerAPI.fetchInforEmployerById(id)
    const { data } = resp
    const result = head(get(data, 'result', [])) || {}
    dispatch(fetchInfoEmployerSuccess(result))
  } catch (error) {
    toastWarning('fetch info Employer fail !')
  }
}

export const fetchInfoEmployerByUserIDRequest = (id) => async (dispatch) => {
  try {
    const resp = await employerAPI.getInfoEmployerByUserIdAPI(id)
    const { data } = resp
    const result = head(get(data, 'result', [])) || {}
    dispatch(fetchInfoEmployerSuccess(result))
  } catch (error) {
    toastWarning('fetch info Employer fail !')
  }
}

export const dispatchFetchDashboardEmployerRequest = (id) => async (dispatch) => {
  try {
    const resp = await employerAPI.dashboardEmployerAPI(id)
    dispatch(fetchDashboardEmployerSuccess(get(resp, 'data.result', {})))
  } catch (error) {
    toastWarning('Fetch dashboard employer fail')
  }
}

export const dispatchUpdateInfoEmployerRequest = ({ id, data }) => async (dispatch) => {
  try {
    const resp = await employerAPI.updateInfoEmployerByUserIdAPI({ id, data })
    const { store } = Store
    const userID = get(store.getState(), 'authState.user.id')
    dispatch(fetchInfoEmployerByUserIDRequest(userID))
    toastSuccess('C???p nh???t th??ng tin th??nh c??ng !')
  } catch (error) {
    toastWarning('update infor fail')
  }
}

export const dispatchFetchListCvAppliedRequest = ({ id, ...rest }) => async (dispatch) => {
  try {
    const resp = await getCvByEmployerIdAPI({ id, ...rest })
    dispatch(fetchlistCvAppliedSuccess(get(resp, 'data.result', {})))
  } catch (error) {
    toastWarning('fetch list fail')
  }
}

export const dispatchSendMailReject = (data) => async () => {
  console.log('data', data)
  try {
    const resp = await sendMailReject(data)
    toastSuccess('???? g???i mail t??? ch???i cho ???ng vi??n !')
  } catch (error) {
    toastWarning('G???i mail th???t b???i !')
  }
}

export const deleteAppliedJob = (id, totalData) => async (dispatch) => {
  const { store } = Store
  const userID = get(store.getState(), 'authState.user.id')
  try {
    const resp = await deleteApplyJobAPI(id)
    dispatch(dispatchFetchListCvAppliedRequest({
      id: userID, name: '', limit: 5, page: 1,
    }))
    dispatch(dispatchSendMailReject(totalData))
  } catch (error) {
    toastWarning('t??? ch???i th???t b???i')
  }
}

export const dispatchAttentionCV = (data) => async (dispatch) => {
  try {
    const resp = await employerAPI.attentionCVAPI(data)
    toastSuccess('???? ????a v??o danh s??ch quan t??m !')
    dispatch(push(routes.listCvAttentionPage.path))
  } catch (error) {
    toastWarning('Quan t??m th???t b???i!')
  }
}

export const getAttentionCV = (id) => async (dispatch) => {
  try {
    const resp = await employerAPI.getAttentionCV(id)
    dispatch(fetchListCvAttentionSuccess(get(resp, 'data.result', [])))
  } catch (error) {
    toastWarning('Get list cv that bai')
  }
}

export const dispatchSendMail = (data) => async () => {
  console.log('data', data)
  try {
    const resp = await sendMail(data)
    toastSuccess('G???i mail th??nh c??ng !')
  } catch (error) {
    toastWarning('G???i mail th???t b???i !')
  }
}

export const dispatchSendMailInterView = (data) => async () => {
  console.log('data', data)
  try {
    const resp = await sendMailInterView(data)
    toastSuccess('G???i mail th??nh c??ng !')
  } catch (error) {
    toastWarning('G???i mail th???t b???i !')
  }
}
