<template>
    <div>
      <div v-for="(semEl, semIndx) of semData" :key="`semIndx_${semIndx}`">
        <div class="button-with-text">
          <b-button @click="semEl.isExpanded=!semEl.isExpanded" class="circle-button">
            <i :class="!semEl.isExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="icon-color"></i>
          </b-button>
          <span class="button-text">{{ semEl.obslPredpId }}</span>
        </div>
        <b-collapse v-model="semEl.isExpanded">
          <b-card>
            <table v-if="semEl.fields">
              <tr v-for="([key, value], indxField) in Object.entries(semEl.fields)" :key="`semIndx_${semIndx}_indxField_${indxField}_${key}`">
                <td style="padding-right: 10px;">{{ value.name_ru }}</td>
                <td>
                  <b-form-checkbox v-if="value.type=='boolean'" v-model="value.val"></b-form-checkbox>
                  <template v-else>
                    <b-input type="text" style="margin-top: 10px;" v-model="value.val"></b-input>
                  </template>
                </td>
              </tr>
            </table>
            
          </b-card>
        </b-collapse>
        <!-- <b-card-text>{{ `Компонент шаг ${step.id}!!!!` }}</b-card-text> -->
      </div>
  </div>
  </template>
  <style scoped>

    .button-with-text {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }
    .circle-button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid #000; /* Обозначаем границы */
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin-right: 10px; /* Отступ между кнопкой и текстом */
    }

    .circle-button:hover .icon-color {
      color: #007bff; /* Цвет при наведении */
    }

    .icon-color {
      color: black; /* Задайте цвет иконки */
    }

    .button-text {
      font-size: 16px; /* Размер шрифта для текста */
      color: #000; /* Цвет текста */
    }
  </style> 
   
  <script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  
  @Component({
    name: 'c-step'
  })
  export default class CStep extends Vue {
    @Prop({
        required: true,
        default: []
    })
    private stepFrame!: any;

    private semData: any[] = []; // список сэм (для редактирования)

    @Prop({
        required: true,
        default: null
    })
    private documentData!: any[] | null;

    private inputArr = [1, 2, 3, 4, 5, 6];

    private mounted() {
      this.getSem();
      this.$watch('documentData', () => {
        this.getSem();
      })
    }

    private getSem() {
      this.semData = [];
      if (this.documentData === null) { return; }
      for (const elDoc of this.documentData) {
        const obj: any = {};
        for (const fieldKey in this.stepFrame.fields) {
          obj[fieldKey] = { ...this.stepFrame.fields[fieldKey]};
          obj[fieldKey].val = fieldKey in elDoc ? elDoc[fieldKey] : null;
        }
        this.semData.push({obslPredpId: elDoc.obslPredpId, fields: obj, isExpanded: false });
      }
      console.log('semData', this.semData);
    }
}
  </script>