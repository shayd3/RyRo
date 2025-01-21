<script setup lang="tsx">
import { ref } from 'vue';

const url = ref('');
const shortenedUrl = ref('');

const shortenUrl = async () => {
    shortenedUrl.value = 'ryro.xyz/abc123';
};
</script>

<template>
    <div class="flex flex-auto flex-column align-items-center justify-content-center">
        <h1>RyRo</h1>
        <div class="">
            <InputGroup>
                <FloatLabel>
                    <InputText id="url_over_label" v-model="url" />
                    <label for="url_over_label">Enter URL</label>
                </FloatLabel>
                <Button @click="shortenUrl">Shorten</Button>
            </InputGroup>
        </div>
        <div v-if="shortenedUrl" class="">
            <p>Shortened URL: <a :href="shortenedUrl" target="_blank">{{ shortenedUrl }}</a></p>
        </div>
    </div>
</template>
