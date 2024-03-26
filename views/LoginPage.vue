<template>
    <div class="container" style="margin-top: 200px;">
        <div class="d-flex flex-wrap justify-content-center">
            <form class="col-4">
                <div class="form-group mb-4">
                    <label for="email" class="mb-2">Email address</label>
                    <input type="email" class="form-control" v-model="userEmail" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group mb-4">
                    <label for="password" class="mb-2">Password</label>
                    <input type="password" v-model="userPassword" class="form-control" id="password" placeholder="Password">
                </div>
                <button @click="loginUser" class="btn w-100 text-white login-btn">Sign In</button>
                <div class="d-flex justify-content-center mt-3">
                    Not a user? <router-link to="/register" class="link-text mx-2" style="text-decoration: none;">Register Here</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import store from '../src/stores';
export default {
    data() {
        return {
            userEmail: "",
            userPassword: "",
        }
    },

    methods: {
        async loginUser(e) {
            try {
                e.preventDefault();
                
                let dataObj = {
                    email: this.userEmail,
                    password: this.userPassword
                }

                let loginUser = await axios.post('/login', {
                    data: dataObj
                })

                if (loginUser.data.statusCode == 200) {
                    alert("Login Success!!");
                    let user = loginUser.data.userdata;
                    let token = loginUser.data.token;
                    localStorage.setItem("userdata", JSON.stringify(user))
                    localStorage.setItem("token", JSON.stringify(token))
                    await store.dispatch('login', { user, token })
                    this.$router.push('/')
                } else {
                    alert("Invalid Credentials!!")
                }

            } catch (error) {
                console.log("Error while login user: ", error);
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