<template>
    <div class="container">
        <div class="d-flex flex-wrap justify-content-center mt-5">
            <form class="col-4 mt-5" enctype="multipart/form-data">
                 <div class="form-group mb-4">
                    <label for="Name" class="mb-2">Name</label>
                    <input type="text" class="form-control" id="Name" v-model="userName" placeholder="Enter Name">
                </div>
                <div class="form-group mb-4">
                    <label for="email" class="mb-2">Email address</label>
                    <input type="text" class="form-control" id="email" v-model="userEmail" placeholder="Enter email">
                </div>
                <div class="form-group mb-4">
                    <label for="userImage" class="mb-2">Profile Image</label>
                    <input type="file" class="form-control" id="userImage" ref="userImage">
                </div>
                <div class="form-group mb-4">
                    <label for="password" class="mb-2">Password</label>
                    <input type="password" class="form-control" id="password" v-model="userPassword" placeholder="Password">
                </div>
                <button type="submit" class="btn w-100 text-white login-btn" @click="registerUser">Sign Up</button>
                <div class="d-flex justify-content-center mt-3">
                    Existing user? <router-link to="/login" class="link-text mx-2" style="text-decoration: none;">Login Here</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            userName: "",
            userEmail: "",
            userPassword: "",
            userRole: "",
        }
    },

    methods: {
        async registerUser(e) {
            try {
                e.preventDefault();
                
                let obj = {
                    name: this.userName,
                    email: this.userEmail,
                    password: this.userPassword,
                }

                let formData = new FormData();
                formData.append("data", JSON.stringify(obj));
                
                let userImage = this.$refs.userImage.files[0];
                formData.append("userImage", userImage);

                let register = await axios.post('/register', formData)
                
                console.log('register: ', register);

                if (register.data.statusCode == 200) {
                    alert("User Registerd Successfully!!")
                    this.$router.push("/login")
                } else {
                    alert(register.data.message)
                }
                
            } catch (error) {
                console.log("Error while register User: ", error.message);
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