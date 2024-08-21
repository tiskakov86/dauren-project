<template>
    <div>
        <div v-for="(formEl, formIndx) of formData" :key="`formIndx${formIndx}`">
            <div class="circle-button-with-text">
                <b-button @click="formEl.isExpanded=!formEl.isExpanded" class="circle-button">
                    <i :class="!formEl.isExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="circle-icon-color"></i>
                </b-button>
                <span class="circle-button-text">{{ formEl.id }}</span>
            </div>
            <b-collapse v-model="formEl.isExpanded">
                <b-card class="table-container">
                    <table class="table b-table table-bordered b-table-no-border-collapse">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th class="text-center">Значение</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="([key, value], indxField) in Object.entries(formEl.fields)" :key="`formIndx${formIndx}_indxField_${indxField}_${key}`">
                                <td>{{ value.name_ru }}</td>
                                <td v-if="value.type=='boolean'" class="text-center">
                                    <b-form-checkbox v-model="value.val" disabled></b-form-checkbox>
                                </td>
                                <template v-else-if="value.val!==null">
                                    <td v-if="value.type=='double' || value.type=='int'" class="text-right">{{value.val.toLocaleString("ru-RU")}}</td>
                                    <td v-else>{{value.val}}</td>
                                </template>
                                <td v-else></td>
                            </tr>
                        </tbody>
                    </table>
                </b-card>
            </b-collapse>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import '@/assets/css/step-file.css';
import '@/assets/css/b-table.css';

@Component({
  name: 'c-doc-report',
})
export default class CDocReport extends Vue {
    @Prop({
        required: true,
        default: []
    })
    private frame!: any[];

    @Prop({
        required: true,
        default: null
    })
    private documentData!: any[] | null;

    private formData: any[] = []; // список форм

    private mounted() {
        this.getForm();
        this.$watch('documentData', () => {
            this.getForm();
        });
    }

    private getForm() {
        this.formData = [];
        let allFrame: any = {};
        for (const el of this.frame) {
            allFrame = Object.assign({ ...el.fields }, allFrame);
        }
        if (this.documentData === null) { return; }
        for (const elDoc of this.documentData) {
            const obj: any = {};
            for (const fieldKey in allFrame) {
            obj[fieldKey] = { ...allFrame[fieldKey]};
            obj[fieldKey].val = fieldKey in elDoc ? elDoc[fieldKey] : null;
            }
            this.formData.push({obslPredpId: elDoc.obslPredpId, fields: obj, isExpanded: true, id: elDoc.id });
        }
    }

}
</script>