<template>
  <button
    class="cursor-pointer rounded-full border-2 font-bold text-white drop-shadow-md transition delay-100 duration-150 ease-in-out hover:drop-shadow-none disabled:!cursor-not-allowed disabled:!opacity-50"
    :class="[widthNum, height, colorVariants[props.color]]"
    @click="clickHandler"
  >
    <div class="flex items-center justify-center">
      <p>
        <slot name="text"></slot>
      </p>
      <slot name="icon"></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
  import { computed, Ref, ref } from 'vue'
  import { ButtonColorTypeValue } from '../../types'

  const props = defineProps<{
    widthNum: `w-${number}`
    size: 'sm' | 'md' | 'lg' | 'xl'
    color: ButtonColorTypeValue
  }>()

  const colorVariants: Ref<Record<ButtonColorTypeValue, string>> = ref({
    purple: 'bg-purple border-purple hover:bg-purple-dark hover:border-purple-dark',
    yellow: 'bg-yellow border-yellow hover:bg-yellow-dark hover:border-yellow-dark',
    blue: 'bg-blue border-blue hover:bg-blue-dark hover:border-blue-dark',
    pink: 'bg-pink border-pink hover:bg-pink-dark hover:border-pink-dark'
  })

  const height = computed<string>(() => {
    switch (props.size) {
      case 'sm': {
        return 'h-7'
      }
      case 'md': {
        return 'h-10'
      }
      case 'lg': {
        return 'h-12'
      }
      case 'xl': {
        return 'h-16'
      }
      default:
        // return empty string but not reachable
        return ''
    }
  })

  const emit = defineEmits(['onClick'])

  const clickHandler = () => {
    emit('onClick')
  }
</script>
