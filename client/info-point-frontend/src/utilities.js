import axios from 'axios'

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
