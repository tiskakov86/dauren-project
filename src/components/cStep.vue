<template>
    <div>
      <div v-for="(formEl, formIndx) of formData" :key="`formIndx${formIndx}`">
        <div class="circle-button-with-text">
          <b-button @click="formEl.isExpanded=!formEl.isExpanded" class="circle-button">
            <i :class="!formEl.isExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="circle-icon-color"></i>
          </b-button>
          <!-- <span class="circle-button-text">{{ formEl.obslPredpId }}</span> -->
          <span class="circle-button-text">{{ formEl.id }}</span>
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
   
  <script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import CNumberInput from '@/components/cNumberInput.vue';
  import '@/assets/css/step-file.css'
  
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

    @Prop({
        required: true,
        default: null
    })
    private documentData!: any[] | null;

    private formData: any[] = []; // список форм (для редактирования)


    private mounted() {
      this.getForm();
      this.$watch('documentData', () => {
        this.getForm();
      })
    }

    private getForm() {
      this.formData = [];
      if (this.documentData === null) { return; }
      for (const elDoc of this.documentData) {
        const obj: any = {};
        for (const fieldKey in this.stepFrame.fields) {
          obj[fieldKey] = { ...this.stepFrame.fields[fieldKey]};
          obj[fieldKey].val = fieldKey in elDoc ? elDoc[fieldKey] : null;
        }
        this.formData.push({obslPredpId: elDoc.obslPredpId, fields: obj, isExpanded: true, id: elDoc.id });
      }
    }

    private changeData(formIndx: number, key: string, value: any) {
      if (!value || !value.hasOwnProperty('val')) {
        console.error('Invalid value object:', value);
        return;
      }
      this.$emit('change', {formIndx: formIndx, key: key, value: value});
    }
}
  </script>