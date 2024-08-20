<template>
    <div>
        <b-modal v-model="showModal" modal-class="modal-table modal-comment" title="Создать документ">
            <div class="form-group m-0"><b-form-input type="text" disabled v-model="katoName"/></div>
            <div class="form-group m-0">Год<b-form-input type="number" min="1990" max="2000" style="width: 200px;" v-model.number="curYear"/></div>
            <template #modal-footer>
                <div class="buttons">
                    <b-button class="btn-button"  variant="light" @click="showModal = false">Закрыть</b-button>
                    <b-button class="btn-button" variant="success" @click="createDocument" :disabled="!curKato">Создать</b-button>
                </div>
            </template>
        </b-modal>
    </div>
  </template>
   
  <script lang="ts">
  import { Component, Vue, Prop} from 'vue-property-decorator';
  
  @Component({
    name: 'c-create-doc-modal'
  })
  export default class CCreateDocModal extends Vue {
    @Prop({
        required: true,
        default: true
    })
    private isVillage!: boolean;

    @Prop({
        required: true,
        default: null
    })
    private curKato!: any | null;

    @Prop({
        required: true,
        default: null
    })
    private login!: string | null;

    @Prop({
        required: true,
        default: null
    })
    private token!: string | null;

    private showModal = false;

    private curYear = (new Date()).getFullYear();

    private get katoName() {
        if (this.curKato) {
            return  `${this.curKato.code} - ${this.curKato.name}`;
        } else {
            return 'КАТО не выбрано!'
        }
    }

    private showEvent() {
        this.showModal = true;
    }

    private async createDocument() {
        if (!this.curKato || !this.login || !this.curYear) {
            console.error('Не заполнены параметры!');
            return;
        }
        const obj = {
            "kodNaselPunk": this.curKato.code,
            "login": this.login,
            "year": this.curYear
        }
        console.log('--obj', obj);
        try {
            let url = 'http://85.159.27.162:85/api/SeloForms/AddSeloDocument';
            if (!this.isVillage) { url = 'http://85.159.27.162:85/api/CityForms/AddCityDocument'; }
            let response: any = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer', 
                body: JSON.stringify(obj)
            });
            if (!response.ok) {
              throw new Error('createDocument response was not ok');
            }
            response = await response.json();
            console.log('createDocument', response);
        } catch (error) {
          console.error('Error createDocument:', error);
        } finally {
            this.showModal = false;
            this.$emit('created', this.curYear);
        }
    }
  }
  </script>