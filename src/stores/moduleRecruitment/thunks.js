/* eslint-disable no-unused-vars */
import * as recruitmentsAPI from 'api/recruitmentsAPI'
import { toastSuccess, toastWarning } from 'helpers/toastify'
import { get, head } from 'lodash'
import { dispatchFetchListCvAppliedRequest } from 'stores/moduleEmployer/thunks'
import Store from 'stores/store'
import {
  fetchDetailRecruitmentSuccess,

  fetchInfoEditRecruitmentSuccess, fetchInfoSuccess,

  fetchListRecruitmentByEmployerIDSuccess, fetchListRecruitmentOrderSuccess,
  fetchListRecruitmentSuccess,
} from './slices'

export const fetchInformationRequest = () => async (dispatch) => {
  try {
    const resp = await recruitmentsAPI.fetchDashboard()
    const { data } = resp
    dispatch(fetchInfoSuccess(get(data, 'result', [])))
  } catch (error) {
    toastWarning('Fetch information fail')
  }
}

export const fetchListRecruitmentOrderRequest = () => async (dispatch) => {
  try {
    const resp = await recruitmentsAPI.fetchRecruitmentOrder()
    const { data } = resp
    dispatch(fetchListRecruitmentOrderSuccess(data.result))
  } catch (erorr) {
    toastWarning('Fetch list fail')
  }
}

export const fetchListRecruitment = (payload) => async (dispatch) => {
  try {
    const resp = await recruitmentsAPI.fetchListRecruiment(payload)
    const { data } = resp
    dispatch(fetchListRecruitmentSuccess(get(data, 'result', {})))
  } catch (err) {
    toastWarning('Fetch list fail')
  }
}

export const dispatchfetchLitsRecruitmentByEmployerID = (payload) => async (dispatch) => {
  try {
    const resp = await recruitmentsAPI.fetchLitsRecruitmentByEmployerID(payload)
    const { data } = resp
    dispatch(fetchListRecruitmentByEmployerIDSuccess(get(data, 'result', {})))
  } catch (err) {
    toastWarning('Fetch list fail')
  }
}

export const dispatchfetchLitsRecruitmentByUserID = (payload) => async (dispatch) => {
  try {
    const resp = await recruitmentsAPI.fetchLitsRecruitmentByUserID(payload)
    const { data } = resp
    dispatch(fetchListRecruitmentByEmployerIDSuccess(get(data, 'result', {})))
  } catch (err) {
    toastWarning('Fetch list fail')
  }
}

export const dispatchfetchDetailRecruitment = (payload) => async (dispatch) => {
  try {
    const resp = await recruitmentsAPI.fetchDetailRecruitment(payload)
    const { data } = resp
    const result = head(get(data, 'result', [])) || {}
    dispatch(fetchDetailRecruitmentSuccess(result))
  } catch (err) {
    toastWarning('Fetch list fail')
  }
}

export const dispatchApplyJob = (payload) => async (dispatch) => {
  try {
    const resp = await recruitmentsAPI.applyJobAPI(payload)
    toastSuccess('???ng tuy???n th??nh c??ng !')
  } catch (error) {
    toastWarning('???ng tuy???n th???t b???i !')
  }
}

export const dispatchFetchInfoEditRecruitment = (id) => async (dispatch) => {
  try {
    const resp = await recruitmentsAPI.getRecruitmentEditAPI(id)
    const { data } = resp
    const result = head(get(data, 'result', [])) || {}
    dispatch(fetchInfoEditRecruitmentSuccess(result))
  } catch (err) {
    toastWarning('Fetch edit recruitment fail')
  }
}

export const dispatchAddRecruitmentRequest = (data) => async (dispatch) => {
  try {
    const resp = await recruitmentsAPI.addRecruitmentAPI(data)
    toastSuccess('Th??m tin tuy???n d???ng th??nh c??ng!')
  } catch (err) {
    toastWarning('Them that bai !')
  }
}

export const dispatchUpdateRecruitmentRequest = (id, data) => async () => {
  try {
    const resp = await recruitmentsAPI.updateRecruitmentAPI(id, data)
    toastSuccess('C???p nh???t tin  tuy???n d???ng th??nh c??ng!')
  } catch (error) {
    toastWarning('Update that bai !')
  }
}

export const dispatchDeleteRecruitmentRequest = (id) => async (dispatch) => {
  const { store } = Store
  const userID = get(store.getState(), 'authState.user.id')
  try {
    const resp = await recruitmentsAPI.deleteRecruitmentAPI(id)
    dispatch(dispatchfetchLitsRecruitmentByUserID({
      id: userID, vacancy: '', active: '', limit: 5, page: 1,
    }))
    toastSuccess('X??a tin  tuy???n d???ng th??nh c??ng!')
  } catch (error) {
    toastWarning('Delete that bai !')
  }
}
