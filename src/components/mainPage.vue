<template>
    <div>
      <b-progress :value="progress" :max="100"  animated v-if="progress>0 && progress<100"></b-progress>
      <b-card no-body>
        <b-tabs card v-model="indxStep" lazy v-if="stepLst && stepLst.length">
          <b-tab :title="step.name_ru" active v-for="(step, stepIndx) of stepLst" :key="`stepIndx_${stepIndx}`" lazy>
            <!-- <c-step :stepFrame="fieldEl" v-for="(fieldEl, fieldIndx) of step.fields" :key="`stepIndx_${stepIndx}_fieldIndx_${fieldIndx}`"/> -->
            <c-step :stepFrame = "step" :documentData="documentData"/>
          </b-tab>
        </b-tabs>
      </b-card>
        <!-- 
        <b-button>Button</b-button>
          <b-button variant="danger">Button</b-button>
          <b-button variant="success">Button</b-button>
          <b-button variant="outline-primary">Button</b-button> -->
            
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import CStep from '@/components/cStep.vue';
  import stepFieldsSeloFrame from '@/assets/json/stepFieldsSelo.json'; // json структура шагов и их полей для Села
  
  @Component({
    name: 'main-page',
    components: {
      'c-step': CStep
    }
  })
  export default class MainPage extends Vue {
    private indxStep = 0;
    private stepLst: any[] = [];

    private idDoc = '10600b81-f65d-4873-9057-6cee0dbff6a6';
    private documentData: any[] | null = null;
    private progress = 0;

    private mounted() {
      console.log('stepFieldsFrame', stepFieldsSeloFrame);
      this.loadDocument();
      this.$watch('idDoc', () => { this.loadDocument(); });
    }

    // установить текущую структуру для шагов
    private async setStepFrame() {
      const curStepLst: any = JSON.parse(JSON.stringify(stepFieldsSeloFrame)); // ----!!! будет выбор json для села или города (сейчас только село)
      /*for (const el of curStepLst) {
        const fieldsMap = new Map(Object.entries(el.fields));
        el.fields = fieldsMap;
      }
      console.log('curStepLst', curStepLst);*/
      this.stepLst = curStepLst;
      console.log('----stepLst', this.stepLst);
      await this.$nextTick();
      if (this.stepLst.length) { this.indxStep = 0; }
    }

    private async loadDocument() {
      this.progress = 0;
      this.stepLst = [];
      this.documentData = null;
      if (this.idDoc===null) { return; }
      
      await this.setStepFrame();
      // ----
      try {
        const response = await fetch(`http://85.159.27.162:85/api/SeloForms/GetSeloFormsByDocId?idDoc=${encodeURI(this.idDoc)}`, {
            method: 'GET',
        });
        
        if (!response.ok) {
            throw new Error('loadDocument response was not ok');
        }
        const data = await response.json();
        console.log('loadDocument:', data);
        this.documentData = data;
        this.progress = 100;
      } catch (error) {
        console.error('Error loadDocument:', error);
        this.progress = 0;
      }
    }
  }

  </script>
  