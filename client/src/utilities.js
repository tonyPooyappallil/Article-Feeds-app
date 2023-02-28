import axios from 'axios'
import useWindowSize from 'windowsize-hook-react'

export const articleUpdate = async (id, value) => {
  let data = axios
    .put('https://busy-plum-bee-cuff.cyclic.app/article', {
      id,
      value
    })
    .then(function (data) {
      let actualData = data.data.data
      return actualData
    })
    .catch(function (error) {
      console.log(error)
      alert(
        'Uh oh, the data you provided is incorrect. If you dont have an account yet, please Sign up'
      )
    })
  return data
}

export const userUpdate = async (id, value) => {
  let data = axios
    .put('https://busy-plum-bee-cuff.cyclic.app/user', {
      id,
      value
    })
    .then(function (data) {
      let actualData = data.data
      return actualData
    })
    .catch(function (error) {
      console.log(error)
      alert(
        'Uh oh, the data you provided is incorrect. If you dont have an account yet, please Sign up'
      )
    })
  return data
}
//https://busy-plum-bee-cuff.cyclic.app/article
//http://localhost:3000/article
export const articleCreate = async formData => {
  const data = axios
    .post('https://busy-plum-bee-cuff.cyclic.app/article', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function (data) {
      let actualData = data.data
      return actualData
    })
    .catch(function (error) {
      console.log(error)
      alert(
        'Uh oh, the data you provided is incorrect. If you dont have an account yet, please Sign up'
      )
    })
  return data
}

export const articleBodyUpdate = async value => {
  let data = axios
    .put('https://busy-plum-bee-cuff.cyclic.app/article/body', value, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function (data) {
      let actualData = data.data.data
      return actualData
    })
    .catch(function (error) {
      console.log(error)
      alert(
        'Uh oh, the data you provided is incorrect. If you dont have an account yet, please Sign up'
      )
    })
  return data
}

export const articleDelete = async id => {
  let data = axios
    .delete(`https://busy-plum-bee-cuff.cyclic.app/article/${id}`)
    .then(function (data) {
      let actualData = data.data.data
      return actualData
    })
    .catch(function (error) {
      console.log(error)
      alert(
        'Uh oh, the data you provided is incorrect. If you dont have an account yet, please Sign up'
      )
    })
  return data
}
export const useIsMobile = () => {
  const { width } = useWindowSize()
  return width < 770
}

export const getImg = (imgLink = '') => {
  if (imgLink.includes('1R580Hj4j2hinfoTonPoo')) {
    return `https://busy-plum-bee-cuff.cyclic.app/${imgLink}`
  }
  return imgLink
}
