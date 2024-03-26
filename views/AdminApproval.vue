<template>
    <div class="container mt-5">
        <table class="table table-striped transparent-table mt-3">
            <thead>
                <tr>
                    <th scope="col">Sr. No.</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Request Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in approvalList" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.user_ID.name }}</td>
                    <td>{{ item.book_ID.title }}</td>
                    <td>{{ item.book_ID.author }}</td>
                    <td>{{ item.requestType }}</td>
                    <td>{{ item.status }}</td>
                    <td>
                        <button :disabled="item.status == 'APPROVED' || item.status == 'REJECTED'" class="btn btn-success btn-sm mx-2" @click="approveIssueRequest(item.book_ID._id, item.user_ID._id)">Approve</button>
                        <button :disabled="item.status == 'APPROVED' || item.status == 'REJECTED'" class="btn btn-danger btn-sm mx-2" @click="deleteIssueRequest(item.book_ID._id, item.user_ID._id)">Reject</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import store from '../src/stores'
export default {
    data() {
        return {
            approvalList: [],
            start: 0,
            end: 10,
        }
    },

    async created() {
        await this.getAdminApprovalRequestList()
    },

    methods: {
        async getAdminApprovalRequestList() {
            try {
                const token = store.getters.getToken;

                let list = await axios.post('/admin/getApprovalRequestList', {
                    start: parseInt(this.start),
                    end: parseInt(this.end)
                }, 
                { headers: { Authorization : token } })
                
                console.log('list -------------: ', list);

                if (list.data.statusCode == 200) {
                    this.approvalList = list.data.records;
                    this.noOfRecords = list.data.totalRecords;
                }
            } catch (error) {
                console.log("Error while get user List: ", error);
            }
        },

        async deleteIssueRequest(bookId, userId) {
            try {
                let deleteIssueRequest = await axios.post('/admin/rejectIssueRequest', { book_ID: bookId, user_ID: userId }, { headers: { Authorization: store.getters.getToken }});
                if (deleteIssueRequest.data.statusCode == 200) {
                    alert("Issue Request Removed");
                    await this.getAdminApprovalRequestList()
                }
                
            } catch (error) {
                console.log("Error while delete Issue Request : ", error);
            }
        },

        async approveIssueRequest(bookId, userId) {
            try {
                let approveIssueRequest = await axios.post('/admin/approveIssueRequest', { book_ID: bookId, user_ID: userId }, { headers: { Authorization: store.getters.getToken }});
                if (approveIssueRequest.data.statusCode == 200) {
                    alert("Request Approved");
                    await this.getAdminApprovalRequestList()
                }
                
            } catch (error) {
                console.log("Error while approve Issue Request : ", error);
            }
        }
    },
}
</script>

<style scoped>
.transparent-table {
    background-color: transparent;
    border-top: 1px solid silver;
}

.transparent-table thead th {
    background-color: transparent;
}

.transparent-table tbody th, .transparent-table tbody td {
    background-color: transparent;
}
</style>