import axios from "axios";
import { store } from "@/store/createStore.js"
import { ElMessage } from 'element-plus'

function generalRequest(url, data) {
    return axios.post(
        'http://localhost:9090' + url,
        // url,
        {
            data: data
        },
        {
            headers: {
                Authorization: 'Bearer ' + store.state.jwtToken
            }
        }
    ).then(res => {
        if (res.status == 500) {

            ElMessage({
                type: 'warnning',
                message: '后端报错'
            });
            return;
        }
        if (res.status == 404) {
            ElMessage({
                type: 'warnning',
                message: '后端方法不存在'
            });
            return;
        }
        return res.data
    }).catch(() => {
        return;
    })
}
export function message(self, msg) {

  self.$message({
    message: msg,
    type: 'warnning',
  })

}
export function getAuthHeader() {
  return {
    Authorization: 'Bearer ' + store.state.jwtToken
  }
}
function getUimsConfig() {
    return generalRequest('/api/auth/getUimsConfig', null)
}


function getStudentIntroduceData(data) {
    return generalRequest('/api/teach/getStudentIntroduceData', data)
}
function studentInit(data) {
    return generalRequest('/api/teach/studentInit', data)
}
function teacherInit(data) {
    return generalRequest('/api/teach/teacherInit', data)
}
function studentQuery(data) {
    return generalRequest('/api/teach/studentQuery', data)
}
function studentDelete(data) {
    return generalRequest('/api/teach/studentDelete', data)
}
function studentEditInit(data) {
    return generalRequest('/api/teach/studentEditInit', data)
}
function teacherEditInit(data) {
    return generalRequest('/api/teach/teacherEditInit', data)
}
function studentEditSubmit(data) {
    return generalRequest('/api/teach/studentEditSubmit', data)
}


function courseInit(data) {
    return generalRequest('/api/teach/courseInit', data)
}
function courseQuery(data) {
    return generalRequest('/api/teach/courseQuery', data)
}
function courseDelete(data) {
    return generalRequest('/api/teach/courseDelete', data)
}
function courseEditInit(data) {
    return generalRequest('/api/teach/courseEditInit', data)
}
function courseEditSubmit(data) {
    return generalRequest('/api/teach/courseEditSubmit', data)
}


function informationInit(data) {
    return generalRequest('/api/teach/informationInit', data)
}
function informationQuery(data) {
    return generalRequest('/api/teach/informationQuery', data)
}
function informationDelete(data) {
    return generalRequest('/api/teach/informationDelete', data)
}
function informationEditInit(data) {
    return generalRequest('/api/teach/informationEditInit', data)
}
function informationEditSubmit(data) {
    return generalRequest('/api/teach/informationEditSubmit', data)
}


function practiceInit(data) {
    return generalRequest('/api/teach/practiceInit', data)
}
function practiceQuery(data) {
    return generalRequest('/api/teach/practiceQuery', data)
}
function practiceDelete(data) {
    return generalRequest('/api/teach/practiceDelete', data)
}
function practiceEditInit(data) {
    return generalRequest('/api/teach/practiceEditInit', data)
}
function practiceEditSubmit(data) {
    return generalRequest('/api/teach/practiceEditSubmit', data)
}


function scoreInit(data) {
    return generalRequest('/api/teach/scoreInit', data)
}
function scoreQuery(data) {
    return generalRequest('/api/teach/scoreQuery', data)
}
function scoreDelete(data) {
    return generalRequest('/api/teach/scoreDelete', data)
}
function scoreEditInit(data) {
    return generalRequest('/api/teach/scoreEditInit', data)
}
function scoreEditSubmit(data) {
    return generalRequest('/api/teach/scoreEditSubmit', data)
}

function activityInit(data) {
    return generalRequest('/api/teach/activityInit', data)
}
function activityQuery(data) {
    return generalRequest('/api/teach/activityQuery', data)
}
function activityDelete(data) {
    return generalRequest('/api/teach/activityDelete', data)
}
function activityEditInit(data) {
    return generalRequest('/api/teach/activityEditInit', data)
}
function activityEditSubmit(data) {
    return generalRequest('/api/teach/activityEditSubmit', data)
}

function honorInit(data) {
    return generalRequest('/api/teach/honorInit', data)
}
function honorQuery(data) {
    return generalRequest('/api/teach/honorQuery', data)
}
function honorDelete(data) {
    return generalRequest('/api/teach/honorDelete', data)
}
function honorEditInit(data) {
    return generalRequest('/api/teach/honorEditInit', data)
}
function honorEditSubmit(data) {
    return generalRequest('/api/teach/honorEditSubmit', data)
}

function attdenceInit(data) {
    return generalRequest('/api/teach/attdenceInit', data)
}
function attdenceQuery(data) {
    return generalRequest('/api/teach/attdenceQuery', data)
}
function attdenceDelete(data) {
    return generalRequest('/api/teach/attdenceDelete', data)
}
function attdenceEditInit(data) {
    return generalRequest('/api/teach/attdenceEditInit', data)
}
function attdenceEditSubmit(data) {
    return generalRequest('/api/teach/attdenceEditSubmit', data)
}

function courseInfoInit(data) {
    return generalRequest('/api/teach/courseInfoInit', data)
}
function courseInfoQuery(data) {
    return generalRequest('/api/teach/courseInfoQuery', data)
}
function courseInfoDelete(data) {
    return generalRequest('/api/teach/courseInfoDelete', data)
}
function courseInfoEditInit(data) {
    return generalRequest('/api/teach/courseInfoEditInit', data)
}
function courseInfoEditSubmit(data) {
    return generalRequest('/api/teach/courseInfoEditSubmit', data)
}

function familyMemberInit(data) {
    return generalRequest('/api/teach/familyMemberInit', data)
}
function familyMemberQuery(data) {
    return generalRequest('/api/teach/familyMemberQuery', data)
}
function familyMemberDelete(data) {
    return generalRequest('/api/teach/familyMemberDelete', data)
}
function familyMemberEditInit(data) {
    return generalRequest('/api/teach/familyMemberEditInit', data)
}
function familyMemberEditSubmit(data) {
    return generalRequest('/api/teach/familyMemberEditSubmit', data)
}

function homeworkInit(data) {
    return generalRequest('/api/teach/homeworkInit', data)
}
function homeworkQuery(data) {
    return generalRequest('/api/teach/homeworkQuery', data)
}
function homeworkDelete(data) {
    return generalRequest('/api/teach/homeworkDelete', data)
}
function homeworkEditInit(data) {
    return generalRequest('/api/teach/homeworkEditInit', data)
}
function homeworkEditSubmit(data) {
    return generalRequest('/api/teach/homeworkEditSubmit', data)
}

function countInit(data) {
    return generalRequest('/api/teach/countInit', data)
}
function countQuery(data) {
    return generalRequest('/api/teach/countQuery', data)
}
function countDelete(data) {
    return generalRequest('/api/teach/countDelete', data)
}
function countEditInit(data) {
    return generalRequest('/api/teach/countEditInit', data)
}
function countEditSubmit(data) {
    return generalRequest('/api/teach/countEditSubmit', data)
}


function getPersonImage(data) {
  return generalRequest('/api/teach/getPersonImage', data)
}
function studentHomepageInit(data) {
    return generalRequest('/api/teach/studentInit', data)
}

function getName(data) {
    return generalRequest('/api/auth/getName', data)
}

export {
    generalRequest,
    getStudentIntroduceData,
    getUimsConfig,

    studentInit,
    studentQuery,
    studentDelete,
    studentEditInit,
    studentEditSubmit,
    getPersonImage,

    teacherInit,
    teacherEditInit,

    courseInit,
    courseQuery,
    courseDelete,
    courseEditInit,
    courseEditSubmit,

    informationInit,
    informationQuery,
    informationDelete,
    informationEditInit,
    informationEditSubmit,

    practiceInit,
    practiceQuery,
    practiceDelete,
    practiceEditInit,
    practiceEditSubmit,

    scoreInit,
    scoreQuery,
    scoreDelete,
    scoreEditInit,
    scoreEditSubmit,

    activityInit,
    activityQuery,
    activityDelete,
    activityEditInit,
    activityEditSubmit,

    honorInit,
    honorQuery,
    honorDelete,
    honorEditInit,
    honorEditSubmit,

    attdenceInit,
    attdenceQuery,
    attdenceDelete,
    attdenceEditInit,
    attdenceEditSubmit,

    courseInfoInit,
    courseInfoQuery,
    courseInfoDelete,
    courseInfoEditInit,
    courseInfoEditSubmit,

    familyMemberInit,
    familyMemberQuery,
    familyMemberDelete,
    familyMemberEditInit,
    familyMemberEditSubmit,

    homeworkInit,
    homeworkQuery,
    homeworkDelete,
    homeworkEditInit,
    homeworkEditSubmit,
    
    countInit,
    countQuery,
    countDelete,
    countEditInit,
    countEditSubmit,

    studentHomepageInit,
    getName,
}



export function downloadPost(url, label, data) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + store.state.jwtToken
        },
        body: JSON.stringify({
            data: data
        })
    };
    return fetch(url, requestOptions)
        .then(async response => {
            const blob = await response.blob()

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = response.status;
                return Promise.reject(error)
            }
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = label
            link.click()
            URL.revokeObjectURL(link.href)
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}