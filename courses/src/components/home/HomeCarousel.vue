<template>
    <div v-if="courseStore.getHomeSlides">
        <Carousel :items-to-show="1" :wrap-around="true" class="carouselTop">
            <Slide v-for="slide in courseStore.getHomeSlides" :key="slide.id">
            <div class="sliderMessage" :style="{background:`url(${slide.img})`}">
                <div class="sliderContent">
                    {{slide.title}}
                </div>
            </div>
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
    </div>
</template>
<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import {useCourseStore} from'@/stores/courses'
const courseStore=useCourseStore();



</script>