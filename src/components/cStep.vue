<template>
    <div>
      <div v-for="(formEl, formIndx) of formData" :key="`formIndx${formIndx}`">
        <div class="button-with-text">
          <b-button @click="formEl.isExpanded=!formEl.isExpanded" class="circle-button">
            <i :class="!formEl.isExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="icon-color"></i>
          </b-button>
          <!-- <span class="button-text">{{ formEl.obslPredpId }}</span> -->
          <span class="button-text">{{ formEl.id }}</span>
        </div>
        <b-collapse v-model="formEl.isExpanded">
          <b-card>
            <table v-if="formEl.fields">
              <tr v-for="([key, value], indxField) in Object.entries(formEl.fields)" :key="`formIndx${formIndx}_indxField_${indxField}_${key}`">
                <td style="padding-right: 10px;">{{ value.name_ru }}</td>
                <td>
                  <b-form-checkbox v-if="value.type=='boolean'" v-model="value.val" :disabled="!edited" @change="changeData(formIndx, key, value)"></b-form-checkbox>
                  <template v-else>
                    <template v-if="value.type=='double' || value.type=='int'">
                      <c-number-input  style="margin-top: 10px;" v-model="value.val" :disabled="!edited" @change.native="changeData(formIndx, key, value)"/>
                    </template>
                    <b-input v-else-if="value.type=='string'" type="text" style="margin-top: 10px;" v-model="value.val" :disabled="!edited" @change="changeData(formIndx, key, value)"></b-input>
                    <template v-else>Тип не определён</template>
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
  import CNumberInput from '@/components/cNumberInput.vue';
  
  @Component({
    name: 'c-step',
    components: {
      'c-number-input': CNumberInput
    }
  })
  export default class CStep extends Vue {
    @Prop({
        required: true,
        default: []
    })
    private stepFrame!: any;

    @Prop({
        required: true,
        default: false
    })
    private edited!: boolean;

    private formData: any[] = []; // список форм (для редактирования)

    @Prop({
        required: true,
        default: null
    })
    private documentData!: any[] | null;

    private inputArr = [1, 2, 3, 4, 5, 6];

    private mounted() {
      this.getForm();
      this.$watch('documentData', () => {
        this.getForm();
      })
    }

    private getForm() {
      this.formData = [];
      if (this.documentData === null) { return; }
      console.log('stepFrame', JSON.parse(JSON.stringify(this.stepFrame)));
      console.log('documentData', JSON.parse(JSON.stringify(this.documentData)));
      for (const elDoc of this.documentData) {
        const obj: any = {};
        for (const fieldKey in this.stepFrame.fields) {
          obj[fieldKey] = { ...this.stepFrame.fields[fieldKey]};
          obj[fieldKey].val = fieldKey in elDoc ? elDoc[fieldKey] : null;
        }
        this.formData.push({obslPredpId: elDoc.obslPredpId, fields: obj, isExpanded: true, id: elDoc.id });
      }
      console.log('formData', this.formData);
    }

    private changeData(formIndx: number, key: string, value: any) {
      console.log('changeData called with:', { formIndx, key, value });
      if (!value || !value.hasOwnProperty('val')) {
        console.log('Invalid value object:', value);
        return;
      }
      this.$emit('change', {formIndx: formIndx, key: key, value: value});
    }
}
  </script>