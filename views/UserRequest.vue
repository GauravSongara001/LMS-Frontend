<template>
    <div class="container mt-5">
        <table class="table table-striped transparent-table">
            <thead>
                <tr>
                    <th scope="col">Sr. No.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Request Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in booksList" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.book_ID.title }}</td>
                    <td>{{ item.book_ID.author }}</td>
                    <td>{{ item.requestType }}</td>
                    <td>{{ item.status }}</td>
                    <td>
                        <button :disabled="item.status == 'APPROVED'" class="btn btn-danger btn-sm" @click="deleteIssueRequest(item.book_ID._id)">Cancel Request</button>
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
            booksList: [],
            start: 0,
            end: 10,
        }
    },

    async created() {
        await this.getUserBookRequestList()
    },

    methods: {
        async getUserBookRequestList() {
            try {
                const token = store.getters.getToken;

                let list = await axios.post('/getUserBookRequestList', {
                    start: parseInt(this.start),
                    end: parseInt(this.end)
                }, 
                { headers: { Authorization : token } })
                
                console.log('list -------------: ', list);

                if (list.data.statusCode == 200) {
                    this.booksList = list.data.records;
                    this.noOfRecords = list.data.totalRecords;
                }
            } catch (error) {
                console.log("Error while get user List: ", error);
            }
        },

        async deleteIssueRequest(bookId) {
            try {
                let deleteIssueRequest = await axios.post('/deleteIssueRequest', { book_ID: bookId }, { headers: { Authorization: store.getters.getToken }});
                if (deleteIssueRequest.data.statusCode == 200) {
                    alert("Issue Request Removed");
                    await this.getUserBookRequestList()
                }
                
            } catch (error) {
                console.log("Error while delete Issue Request : ", error);
            }
        }
    },
}
</script>

<style scoped>
.transparent-table {
    background-color: transparent;
}

.transparent-table thead th {
    background-color: transparent;
}

.transparent-table tbody th, .transparent-table tbody td {
    background-color: transparent;
}
</style>