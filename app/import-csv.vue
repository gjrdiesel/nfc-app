<template>
    <div class="row">
        <div class="col-12">
            <router-link class="btn btn-default" to="/">&longleftarrow; Back</router-link>
        </div>
        <div class="col-12 m-auto">
            <h1>Import a CSV</h1>
            <div class="alert alert-danger" role="alert">
                This will erase all data, be sure to have exported the CSVs first!
            </div>
            <div class="alert alert-danger" role="alert">
                CSV must be formatted like: <br/><br/>
                <pre>Member Id,Category,User,Display Name,Created Date,Sandbox_Info : UID
1,Example,test@gmail.com,Justin Reasoner,2019-09-20 20:19:19,
2,Example,test@gmail.com,Jared Serfozo,2019-09-21 20:19:19</pre>

                It must be in the same order and include a header as shown above.
            </div>
            <form enctype="multipart/form-data" method="post" action="/import" class="my-3">
                <input type="file" name="import">
                <br><br>
                <button type="submit">Import</button>
            </form>
        </div>
    </div>
</template>
<script>
    import Axios from "axios";

    export default {
        methods: {
            handleSubmit() {
                axios.post('/import', csv);
            }
        }
    }
</script>
