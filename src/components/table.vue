<template>
    <div class="modal-backdrop">
        <div class="table">
            <p style="font-size: 18px;font-weight: bold;color: #222222">APP Logs</p>
            <pre><code>
                {{log}}
            </code></pre>
            <div class="modal-footer">
                <button type="button" class="btn-close" @click="close">关闭</button>
            </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "Table",
        props: ['log'],
        methods: {
            close(){
                this.$emit("close");
            }
        }
    }
</script>

<style scoped>
    .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .1);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .table{
        background-color: #fff;
        box-shadow: 0 0 20px -5px;
        overflow-x:auto;
        display: flex;
        flex-direction: column;
        border-radius: 16px;
        padding: 10px 15px;
        width: 85%;
        max-width: 600px;
    }
    .modal-footer {
        border-top: 1px solid #eee;
        justify-content: flex-end;
        padding: 4px;
        display: flex;
    }
    .btn-close {
        color: #ffffff;
        background-color: #ff1745;
        border-radius: 20px;
        padding: 4px 15px;
        border: none;
        cursor: pointer;
    }
    pre{
        text-align: left;
        padding-bottom: 10px;
        max-height: 350px;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
    }
    ::-webkit-scrollbar{
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-thumb{
        width: 10px;
        background-color: #378de5;
    }
    .table pre code{
        white-space: pre-line;
        word-break: break-all;
        word-wrap: break-word;
    }
</style>