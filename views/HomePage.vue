<template>
    <div class="container">
        <div class="row justify-content-center">
            <div v-for="item in bookList" :key="item" class="col-3 mx-4 my-3 p-4 book-container">
                <div class="text-center">
                    <img src="https://m.media-amazon.com/images/I/412JSB73D2L._SY445_SX342_.jpg" alt="" style="width: 200px; height: 300px">
                </div>
                <p class="mt-4 fw-bold">{{ item.title }}</p>
                <p class="mt-2 fs-6"><span class="me-5">- {{item.author}}</span></p>
                <div>
                    <button class="issue-btn px-3" @click="issueBook(item)">Issue Book</button>
                    <span class="mx-2 text-danger fw-bold" v-if="item.quantity == 0">Out of Stock !!</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import store from '../src/stores';

export default {
    data() {
        return {
            bookList: []
        }
    },
    async created() {
        await this.getAllBooksData()
    },

    methods: {
        async getAllBooksData() {
            try {
                this.userName = store.getters.getUser.name;
                let token = store.getters.getToken;
                let booksList = await axios.get('/getAllBooksData', { headers: { Authorization: token }});

                if (booksList.data.statusCode == 200) {
                    this.bookList = booksList.data.records;
                }
                
            } catch (error) {
                console.log("Error while get books: ", error);
            }
        },

        async issueBook(bookId) {
            try {
                if (bookId.quantity > 0) {
                    let issueBook = await axios.post('/requestBookIssue', {
                        bookId: bookId._id,
                    }, 
                    { headers: { Authorization: store.getters.getToken }})

                    if (issueBook.data.statusCode == 200) {
                        alert("Issue Request Submitted Successfully !!");
                    } else {
                        alert(issueBook.data.message)
                    }
                } else {
                    alert("This Book is currently Out of Stock !!")
                }
                
                
            } catch (error) {
                console.log("Error while issue book: ", error);
            }
        }
    },
}
</script>

<style>
.book-container {
  border-radius: 4px;
  transition: background-color 0.9s ease;
  cursor: pointer;

}

.book-container:hover {
  background-color: #56b9bea3;
}

.issue-btn{
    padding: 8px;
    border: none;
    border-radius: 50px;
    background-color: #10898d;
    color: white;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.414);
    transition: background-color 0.3s ease;
}

.issue-btn:hover{
    background-color: #0c676a;
}

</style>