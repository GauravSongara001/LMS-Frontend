<template>
    <div class="row">
        <div class="col-3 mb-3">
            <input type="text" class="form-control" placeholder="Search Here" v-model="filterQuery" id="filterData" />
        </div>
        <div class="col-3">
            <button class="btn btn-success text-white" @click="$emit('filterData', filterQuery)"><i class="bi bi-search"></i></button>
            <button class="btn btn-danger text-white mx-2" @click="clearData">Clear</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isDateFilter: {
            type: Boolean,
            default: false
        },
        
    },

    data() {
        return {
            filterQuery: "",
        }
    },

    created() {
        
    },

    methods: {
        clearData(){
            this.filterQuery = "";
            this.$emit('filterData', this.filterQuery)
        }
    },
}
</script>

<style>

</style>