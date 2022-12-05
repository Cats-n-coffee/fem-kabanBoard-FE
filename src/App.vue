<template>
  <Modal />
  <TransitionGroup name="list">
    <Sidebar :hide-sidebar="hideSidebar" key="sidebar-1" />
    <div class="persistent-content" key="content-1">
      <TopbarVue msg="prop msg" />
      <MainContent />
      <button @click="handleShowSidebar" class="sidebar-show">
        Show
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import TopbarVue from './components/topbar/Topbar.vue';
import Sidebar from './components/sidebar/Sidebar.vue';
import MainContent from './components/boardContent/MainContent.vue';
import Modal from './components/common/Modal.vue';
import { useHideSidebar } from '@/stores/appGlobals';

const sidebarStore = useHideSidebar();
const { hideSidebar } = storeToRefs(sidebarStore);
const { handleShowSidebar } = sidebarStore;
</script>

<style scoped lang="less">
.persistent-content {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  transition: 500ms ease-in;

  @media screen and (min-width: 600px) {
    &.enlarge {
      transform: translateX(-265px);
    }
  }

  @media screen and (min-width: 1000px) {
    &.enlarge {
      transform: translateX(-300px);
    }
  }
}

.sidebar-show {
  display: none;
  position: absolute;
  left: 0;
  bottom: 5%;

  @media screen and (min-width: 600px) {
    display: block;
  }
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
