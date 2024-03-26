<template>
    <div class="container" style="margin-top: 100px;">
        <div class="d-flex flex-wrap justify-content-center">
            <form class="col-4" enctype="multipart/form-data">
                <div class="form-group mb-4">
                    <label for="Name" class="mb-2">Name</label>
                    <input type="text" class="form-control" id="Name" v-model="userName" placeholder="Enter Name">
                </div>
                <div class="form-group mb-4">
                    <label for="email" class="mb-2">Email address</label>
                    <input type="text" class="form-control" id="email" v-model="userEmail" placeholder="Enter email">
                </div>
                <div class="form-group mb-4">
                    <label for="role" class="mb-2">Role</label>
                    <select id="role" class="form-select" v-model="userRole">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div class="form-group mb-4">
                    <label for="role" class="mb-2">Upload Image</label>
                    <input type="file" ref="userImage" id="userImage">
                </div>
                <button type="submit" class="btn w-100 text-white login-btn" @click="updateUser">Sign Up</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import store from '../../../src/stores'
export default {
    data() {
        return {
            userId: this.$route.params.id,
            userName: "",
            userEmail: "",
            userPassword: "",
            userRole: "",
        }
    },

    async created() {
        await this.getSingleUserDetails()
    },

    methods: {
        async getSingleUserDetails(){
            try {
                let userData = await axios.get('/admin/getSingleUserDetails', { headers: { Authorization: store.getters.getToken }, params: { id: this.userId }});

                if (userData.data.statusCode == 200) {
                    this.userName = userData.data.result.name;
                    this.userEmail = userData.data.result.email;
                    this.userRole = userData.data.result.role.roleName;
                }

            } catch (error) {
                console.log("Error while get single user details: ", error);
            }
        },

        async updateUser(e) {
            try {
                e.preventDefault();
                
                let dataObj = {
                    name : this.userName,
                    email : this.userEmail,
                    role : this.userRole,
                }

                let updateUser = await axios.post('/admin/updateUserData', {
                    data: dataObj,
                    condition: { _id: this.userId }
                }, 
                { headers: { Authorization: store.getters.getToken }})
                
                console.log('updateUser -------: ', updateUser);

                if (updateUser.data.statusCode == 200) {
                    alert("User Updated Successfully")
                    this.$router.push('/userList');
                } else {
                    alert("Error while update User")
                }
            } catch (error) {
                console.log("Error while update user: ", error);
            }
        }
    },
}
</script>

<style scoped>
.login-btn{
    background-color: #046169;
}

.login-btn:hover{
    background-color: #02474d;
}

</style>