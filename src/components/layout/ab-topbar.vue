<script lang="ts" setup>
import {
  Me,
  Pause,
  PlayOne,
  Power,
  Refresh,
  Format,
} from '@icon-park/vue-next';

const search = ref('');
const show = ref(false);
const showAdd = ref(false);

const { onUpdate, offUpdate, start, pause, shutdown, restart, resetRule } =
  useProgramStore();
const { running } = storeToRefs(useProgramStore());

const items = [
  {
    id: 1,
    label: 'Start',
    icon: PlayOne,
    handle: start,
  },
  {
    id: 2,
    label: 'Pause',
    icon: Pause,
    handle: pause,
  },
  {
    id: 3,
    label: 'Restart',
    icon: Refresh,
    handle: restart,
  },
  {
    id: 4,
    label: 'Shutdown',
    icon: Power,
    handle: shutdown,
  },
  {
    id: 5,
    label: 'Reset Rule',
    icon: Format,
    handle: resetRule,
  },
  {
    id: 6,
    label: 'Profile',
    icon: Me,
    handle: () => {
      show.value = true;
    },
  },
];

onBeforeMount(() => {
  onUpdate();
});

onUnmounted(() => {
  offUpdate();
});
</script>

<template>
  <div h-60px bg-theme-row text-white rounded-12px fx-cer px-24px>
    <div fx-cer space-x-16px>
      <img src="/favicon-light.svg" alt="favicon" wh-24px />
      <img src="/AutoBangumi.svg" alt="AutoBangumi" h-24px rel top-2px />
    </div>

    <ab-search v-model:value="search" hidden />

    <div ml-auto>
      <ab-status-bar
        :items="items"
        :running="running"
        @click-add="() => (showAdd = true)"
      ></ab-status-bar>
    </div>

    <ab-change-account v-model:show="show"></ab-change-account>

    <ab-add-bangumi v-model:show="showAdd"></ab-add-bangumi>
  </div>
</template>
