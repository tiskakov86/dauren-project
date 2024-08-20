<template>
    <div>
        <c-nas-punkt :isVillage="true"/>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import CNasPunkt from '@/components/cNasPunkt.vue';

@Component({
    components: {
      'c-nas-punkt': CNasPunkt
    }
})
export default class CVillage extends Vue {
    
}
</script>