import request from '@/util/request'

export function getRecordList() {
    return request({
        url: '/attendanceRecord/getRecordList',
        method: 'post'
    })
}