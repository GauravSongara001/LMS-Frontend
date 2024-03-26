<template>
    <div class="container mt-5">
        <table class="table table-striped transparent-table">
            <thead>
                <tr>
                    <th scope="col">Sr. No.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Issue Date</th>
                    <th scope="col">Return Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in issuedBooksList" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.book_ID.title }}</td>
                    <td>{{ item.book_ID.author }}</td>
                    <td>{{ item.issueDate }}</td>
                    <td>{{ item.returnDate }}</td>
                    <td>{{ item.status }}</td>
                    <td>
                        <button class="btn btn-secondary btn-sm mx-2">Return</button>
                        <button class="btn btn-secondary btn-sm mx-2">Re-Issue</button>
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
            issuedBooksList: [],
            start: 0,
            end: 10,
        }
    },

    async created() {
        await this.getUserIssuedBooksList()
    },

    methods: {
        async getUserIssuedBooksList() {
            try {
                const token = store.getters.getToken;

                let list = await axios.post('/getUserIssuedBooksList', {
                    start: parseInt(this.start),
                    end: parseInt(this.end)
                }, 
                { headers: { Authorization : token } })
                
                console.log('list -------------: ', list);

                if (list.data.statusCode == 200) {
                    this.issuedBooksList = list.data.records;
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
                    await this.getUserIssuedBooksList()
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