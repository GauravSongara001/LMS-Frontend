<template>
    <div class="container mt-5">
        <FilterDataVue class="mb-4" @filterData="getUserList"/>
        <table class="table table-striped transparent-table mb-5">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in userList" :key="item">
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.roles.roleName }}</td>
                    <td>
                        <button class="btn btn-success btn-sm" @click="updateUser(item._id)"><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-danger btn-sm mx-2" @click="deleteUser(item._id)"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import store from '../../../src/stores'
import FilterDataVue from '../../../src/components/FilterData.vue'
export default {
    data() {
        return {
            userList: [],
            start: 0,
            end: 10,
        }
    },

    async created() {
        await this.getUserList()
    },

    components: {
        FilterDataVue,
    },

    methods: {
        async getUserList(query) {
            try {
                console.log('query -------------: ', query);
                const token = store.getters.getToken;

                let list = await axios.post('/admin/getUsersList', {
                    start: parseInt(this.start),
                    end: parseInt(this.end),
                    filterData: query ? query : ""
                }, 
                { headers: { Authorization : token } })
                
                console.log('list -------------: ', list);

                if (list.data.statusCode == 200) {
                    this.userList = list.data.records;
                }
            } catch (error) {
                console.log("Error while get user List: ", error);
            }
        },

        async updateUser(id) {
            try {
                
                this.$router.push('/updateUser/' + id);

            } catch (error) {
                console.log("Error while Update user : ", error);
            }
        },

        async deleteUser(id) {
            try {
                let deleteUser = await axios.post('/admin/deleteUser', { _id: id }, { headers: { Authorization: store.getters.getToken }});
                if (deleteUser.data.statusCode == 200) {
                    alert("User Deleted Successfully");
                    await this.getUserList()
                }
                
            } catch (error) {
                console.log("Error while delete user : ", error);
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

.transparent-table tbody th,
.transparent-table tbody td {
    background-color: transparent;
}
</style>