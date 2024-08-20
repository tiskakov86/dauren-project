<template>
    <div>
      <b-progress :value="progress" :max="100"  animated v-if="progress>0 && progress<100"></b-progress>
      <b-card no-body>
        <div class="left-content" style="margin-left: 10px;">
          <!-- <div class="d-inline-block p-2"><b-form-input type="number" min="1990" max="2000" style="width: 200px;" v-model="curYear"/></div> -->
          <div class="d-inline-block p-2">
            <b-button @click="selectKatoClk">
              <template v-if="!curKato">Выбрать регион</template>
              <template v-else>{{ `${curKato.code} - ${curKato.name}`}}</template>
            </b-button>
          </div>
          <!--<div class="d-inline-block p-2">
            <multiselect
                  v-model="curDocument"
                  track-by="id"
                  label="name"
                  placeholder="Выбрать документ"
                  :options="documentLst"
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
              >
              </multiselect>
            </div> -->
            <!-- <div class="d-inline-block p-2">
              <b-button class="btn-button" variant="success" @click="loadDocument" :disabled="!curDocument">Открыть документ</b-button>
            </div> -->
            
            <div class="d-inline-block p-2">
              <b-button class="btn-button" variant="success" @click="addDocClk" :disabled="!curKato">Создать документ <span v-if="isVillage"> по селу</span><span v-else> по городу</span></b-button>
            </div>
            
            <b-form-select value-field="id" text-field="name"  v-model="curDocId" :options="documentLst" :select-size="4" :disabled="!saveDisabled"></b-form-select>
            <div>
              <div class="d-inline-block p-2 mt-3" v-if="curDocument"><strong>Документ за  {{ curDocument.name }}</strong></div>
              <div class="d-inline-block p-2" v-if="curDocument">
                <b-form-checkbox v-model="editMode" switch :disabled="!(curDocument && stepLst && stepLst.length)">Редактировать</b-form-checkbox>
              </div>
            </div>
              
            <div v-if="curDocument && stepLst && stepLst.length && editMode">
              <div class="d-inline-block p-2">
                <b-button class="btn-button" variant="success" @click="saveDataClk" :disabled="saveDisabled">Сохранить</b-button>
              </div>
              <div class="d-inline-block p-2">
                <b-button class="btn-button" variant="light" @click="cancelSaveClk" v-if="!saveDisabled">Отменить</b-button>
              </div>
              <div class="d-inline-block p-2">
                <b-button class="btn-button" variant="success" @click="addForm" :disabled="!saveDisabled">Добавить данные (строку)</b-button>
              </div>
            </div>
        </div>

        <b-tabs card v-model="indxStep" lazy v-if="stepLst && stepLst.length" @activate-tab="activateTabChg">
          <b-tab :title="step.name_ru" active v-for="(step, stepIndx) of stepLst" :key="`stepIndx_${stepIndx}`" lazy>
            <!-- <c-step :stepFrame="fieldEl" v-for="(fieldEl, fieldIndx) of step.fields" :key="`stepIndx_${stepIndx}_fieldIndx_${fieldIndx}`"/> -->
            <c-step :stepFrame = "step" :documentData="documentData" :edited="editMode" @change="docDataChanged" :ref="`refCStepForm${stepIndx}`"/>
          </b-tab>
        </b-tabs>
      </b-card>
      <!----------------------->
      <c-kato-modal :isVillage ="isVillage" ref="refKatoModal" @selectKato="selectKato"/>
      <c-create-doc-modal ref="refCreateDocModal" :isVillage ="isVillage" :disabled="!token" :curKato="curKato" :login="login" :token="token" @created="docCreated"/>
      <!----------------------->
      <b-modal id="confirmModal" title="Confirm" @ok="confirmSaveChange" @cancel="cancelSaveChange" v-model="showSaveModal" no-close-on-backdrop no-close-on-esc hide-header>
        <p>Есть изменения! Сохранить?</p>
      </b-modal>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import CStep from '@/components/cStep.vue';
  import CKatoModal from '@/components/cKatoModal.vue';
  import CCreateDocModal from '@/components/cCreateDocModal.vue';
  import stepFieldsSeloFrame from '@/assets/json/stepFieldsSelo.json'; // json структура шагов и их полей для Села
  import stepFieldsCityFrame from '@/assets/json/stepFieldsCity.json'; // json структура шагов и их полей для Села
  
  @Component({
    name: 'main-page',
    components: {
      'c-step': CStep,
      'c-kato-modal': CKatoModal,
      'c-create-doc-modal': CCreateDocModal
    }
  })
  export default class CNasPunkt extends Vue {
    @Prop({
        required: true,
        default: true
    })
    private readonly isVillage!: boolean;

    private indxStep = 0;
    private stepLst: any[] = [];

    private login = 'suadmin@su.qz';

    private documentLst: any[] = []; // список документов
    private curDocument: null | any = null // выбранный документ
    private curDocId: null | any = null;

    private editMode = false;

    private token: string | null = null;

    private documentData: any[] | null = null;
    private documentChangedParams: any[] = []; // параметры которые были изменены (элемент массива - отдельная форма)
    private saveDisabled = true;

    private newTabIndex: number = -1; // новый индекс при переключении вкладки (при остановке переключения, если есть не сохранённые данные)
    private showSaveModal = false; // показать модальное окно с вопросом о сохранении

    private progress = 0;

    private curKato: any| null = null;

    private mounted() {
      this.startLogin();
      this.loadDocument();
      this.$watch('curDocument', () => {
        this.loadDocument();
      })

      this.$watch('curDocId', () => {
        this.curDocument = null;
        for (let i=0; i< this.documentLst.length; i++) {
          if (this.curDocId === this.documentLst[i].id) {
            this.curDocument = this.documentLst[i];
            break;
          }
        }
        console.log('curDocument', this.curDocument);
      });
    }

    // установить текущую структуру для шагов
    private async setStepFrame() {
      let curStepLst: any = JSON.parse(JSON.stringify(stepFieldsSeloFrame));
      if (!this.isVillage) { curStepLst = JSON.parse(JSON.stringify(stepFieldsCityFrame)); }  
      /*for (const el of curStepLst) {
        const fieldsMap = new Map(Object.entries(el.fields));
        el.fields = fieldsMap;
      }
      console.log('curStepLst', curStepLst);*/
      this.stepLst = curStepLst;
      await this.$nextTick();
      if (this.stepLst.length) { this.indxStep = 0; }
    }

    // открытие конкретного документа
    private async loadDocument() {
      this.progress = 0;
      this.stepLst = [];
      this.documentData = null;
      // this.documetnDataNew = null;
      this.documentChangedParams = [];
      this.saveDisabled = true;
      this.editMode = false;
      if (this.curDocument===null) { return; }
      
      await this.setStepFrame();
      // ----
      try {
        let url = 'http://85.159.27.162:85/api/SeloForms/GetSeloFormsByDocId?idDoc='
        if (!this.isVillage) { url = 'http://85.159.27.162:85/api/CityForms/GetSeloFormsByDocId?idDoc='; } // город
        const response = await fetch(url + encodeURI(this.curDocument.id), {
            method: 'GET',
        });
        
        if (!response.ok) {
            throw new Error('loadDocument response was not ok');
        }
        const data = await response.json();
        data.sort((a: any, b: any) => (a.id > b.id) ? 1 : -1);
        console.log('loadDocument:', data);
        for (const el of data) { this.documentChangedParams.push({}); }
        this.documentData = data;
        // this.documetnDataNew = JSON.parse(JSON.stringify(data));
        this.progress = 100;
      } catch (error) {
        console.error('Error loadDocument:', error);
        this.progress = 0;
      }
    }

    // Открыть выбор КАТО (модальное окно)
    private selectKatoClk() {
      // eslint-disable-next-line
      // @ts-ignore
      this.$refs.refKatoModal.showEvent();
    }

    // выбор като из модального окна
    private selectKato(curKato: any) {
      this.curKato = curKato;
      this.loadDocumentLst();
    }

    // загрузка списка документов
    private async loadDocumentLst() {
      this.documentLst = [];
      this.curDocument = null;
      if (!this.curKato) {
        alert('Не выбран КАТО!')
        return;
      }
      try {
        let url = 'http://85.159.27.162:85/api/SeloForms/GetSeloDocument?katoKod=';
        if (!this.isVillage) { url = 'http://85.159.27.162:85/api/CityForms/GetCityDocument?katoKod='; } // город
        const response = await fetch(url + encodeURI(this.curKato.code), {
            method: 'GET',
        });
        
        if (!response.ok) {
            throw new Error('GetSeloDocument response was not ok');
        }
        const data = await response.json();
        data.sort((a: any, b: any) => (a.year < b.year) ? 1 : -1);
        for (const el of data) {
          el.name = `${el.year} год`
        }
        /*if (data.length) { 
          this.curDocument = data[0];
        } else {
          this.curDocument = null;
        }*/
        this.documentLst = data;
        console.log('documentLst', this.documentLst);
      } catch (error) {
        console.error('Error GetSeloDocument:', error);
        this.progress = 0;
      }
    }

    private async startLogin() {
      const password = 'suadmin@su.qz';
      const obj = {
        "login": this.login,
        "pwd": password,
        "rem": true
      }
      try {
            const url = 'http://85.159.27.162:85/api/Account/signin';
            let response: any = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer', 
                body: JSON.stringify(obj)
            });
            if (!response.ok) {
              throw new Error('GetSeloDocument response was not ok');
            }
            response = await response.json();
            this.token = response.token;
        } catch (error) {
          console.error('Error Login:', error);
        }
    }

    private addDocClk() {
      // eslint-disable-next-line
      // @ts-ignore
      this.$refs.refCreateDocModal.showEvent();
    }

    // Документ создан
    private async docCreated(curYear: number) {
      await this.loadDocumentLst();
      for (let i = 0; i<this.documentLst.length; i++) {
        const el = this.documentLst[i];
        if (el.year === curYear) {
          this.curDocument = el;
          break;
        }
      }
    }

    // добавить форму
    private async addForm() {
      if (!this.curDocument) { return; }
      let obj: { documentId: string, obshKolSelNasPun?: number }[]= [
        { 
          "documentId": this.curDocument.id, 
          "obshKolSelNasPun": 1 
        }
      ];
      if (!this.isVillage) { obj = [{ "documentId": this.curDocument.id }]; } // город
      try {

          let url = `http://85.159.27.162:85/api/SeloForms/AddSeloForms?login=${this.login}`;
          if (!this.isVillage) { url = `http://85.159.27.162:85/api/CityForms/AddCityForms?login=${this.login}`; }
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
            throw new Error('addForm response was not ok');
          }
          response = await response.json();
          console.log('addForm', response);
          await this.loadDocument();
          this.editMode = true;
      } catch (error) {
        console.error('Error addForm:', error);
      }
    }

    private async saveDataClk() {
      const afterSaveTabIndx = this.indxStep;
      console.log('Сохранить');
      if (!this.documentData) { return; }
      for (let i = 0; i < this.documentChangedParams.length; i++) {
        const el = this.documentChangedParams[i];
        const saveArr: { path: string, value: any, op: string }[] = [];
        for (const key in el) {
          saveArr.push({ path: key, value: el[key].value,  op: 'replace' });
        }
        const resOK = await this.saveData(saveArr, this.documentData[i].id);
        if (resOK) { this.documentChangedParams[i] = {}; }
      }
      await this.loadDocument();
      this.indxStep = afterSaveTabIndx;
      this.editMode = true;
    }

    private async saveData( saveArr: { path: string, value: any, op: string }[], id: string) {
      if(!saveArr.length) { return false; }
      console.log('saveArr', saveArr, id);
      let okFl = false;
      try {
          let url = `http://85.159.27.162:85/api/SeloForms/${id}`;
          if (!this.isVillage) { url = `http://85.159.27.162:85/api/CityForms/${id}`; }
          let response: any = await fetch(url, {
              method: 'PATCH',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer', 
              body: JSON.stringify(saveArr)
          });
          if (!response.ok) {
            throw new Error('saveData response was not ok');
          } else {
            okFl = true;
          }
          response = await response.json();
          console.log('response saveData', response);
      } catch (error) {
        console.error('Error saveData:', error);
      } finally {
        return okFl;
      }
    }

    // изменены данные из cStep
    private docDataChanged(data: { formIndx: number, key: string, value: any }) {
      console.log('docDataChanged', data);
      if (!this.documentData) { return; }
      if (this.documentData[data.formIndx][data.key] != data.value.val) {
        this.documentChangedParams[data.formIndx][data.key] = { value: data.value.val, id: this.documentData[data.formIndx].id };
      } else if (data.key in this.documentChangedParams[data.formIndx]) {
        delete this.documentChangedParams[data.formIndx][data.key];
      }
      console.log('documentChangedParams', this.documentChangedParams);
      this.setSaveDisabled();
    }

    // проверить нужно ли сохранение
    private setSaveDisabled() {
      let fl = true;
      for (let i = 0; i< this.documentChangedParams.length; i++) {
        if (Object.keys(this.documentChangedParams[i]).length) {
          fl = false;
          break;
        }
      }
      this.saveDisabled = fl;
    }

    // изменение текущей вкладки (шага)
    private activateTabChg(newTabIndex: number, prevTabIndex: number, bvEvent: any ) {
      this.setSaveDisabled();
      if (this.saveDisabled) { return; }
      this.newTabIndex = newTabIndex;
      bvEvent.preventDefault();
      this.showSaveModal = true;
    }

    private async confirmSaveChange() {
      this.showSaveModal = false;
      await this.saveDataClk();
      if (this.newTabIndex>-1) { this.indxStep = this.newTabIndex; } 
      this.newTabIndex = -1;
    }

    private cancelSaveChange() {
      this.showSaveModal = false;
      if (this.newTabIndex>-1) { this.indxStep = this.newTabIndex; }
      this.newTabIndex = -1;
      for (let i=0; i < this.documentChangedParams.length; i++) {
        this.documentChangedParams[i] = {};
      }
      this.saveDisabled = true;
    }

    // отменить изменения
    private cancelSaveClk() {
      if (!this.documentData) { return; }
      
      const ref =`refCStepForm${this.indxStep}`;
      // eslint-disable-next-line
      // @ts-ignore
      this.$refs[ref][0].getForm();
      for (const el of this.documentData) { this.documentChangedParams.push({}); }
      this.saveDisabled = true;
    }
  }

  </script>
  