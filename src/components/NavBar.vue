<template>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="#">GTU Library</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/issuedBooks" class="nav-link">Issued Books</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="userRole == 'admin'" to="/admin/approval" class="nav-link">Approval</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="userRole == 'user'" to="/booksrequests" class="nav-link">Requests</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="userRole == 'admin'" to="/userlist" class="nav-link">Users</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="!isAuthenticated" to="/register" class="nav-link">Register</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="!isAuthenticated" to="/register" class="nav-link">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="isAuthenticated" to="/logout" class="nav-link">Logout</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>

<script>
import store from '../stores';
export default {
    data() {
        return {
            isAuthenticated: false,
            userData: null,
            userRole: "",
        }
    },

    created() {
        this.checkUserAuthenticationStatus();
    },

    watch: {
        '$route'() {
            this.checkUserAuthenticationStatus();
        }
    },

    methods: {
        async checkUserAuthenticationStatus(){
            try {

                this.isAuthenticated = store.getters.isAuthenticated;
                this.userData = store.getters.getUser;
                this.userRole = this.userData ? store.getters.getUser.role.roleName : "";

                console.log('this.isAuthenticated: ', this.isAuthenticated);
                console.log('this.userData: ', this.userData);
                
            } catch (error) {
                console.log("Error while authenticate: ", error);
            }
        }
    },
}
</script>

<style scoped>
.navbar{
    background-color: #10898d;
    color: white;
}
</style>