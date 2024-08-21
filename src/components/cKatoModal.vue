<template>
    <div>
        <b-modal v-model="showModal" modal-class="modal-table modal-comment" title="Выбор КАТО">
        <div class="form-group m-0"><label style="font-weight: bold;"><template v-if="curKato">{{ `${curKato.code} - ${curKato.name}` }}</template></label></div>
        <div class="form-group m-0">
            <multiselect
                v-model="curObl"
                track-by="code"
                label="name"
                placeholder="Выбрать область"
                :options="oblLst"
                :searchable="true"
                :allow-empty="false"
                :show-labels="false"
            >
            </multiselect>
        </div>
        <div class="form-group m-0">
            <multiselect
                v-model="curRegion"
                track-by="code"
                label="name"
                placeholder="Выбрать регион"
                :options="regionLst"
                :searchable="true"
                :allow-empty="false"
                :show-labels="false"
            >
            </multiselect>
        </div>
        <div class="form-group m-0">
            <multiselect
                v-model="curSettlement"
                track-by="code"
                label="name"
                placeholder="Выбрать н.п./с.о"
                :options="settlementLst"
                :searchable="true"
                :allow-empty="false"
                :show-labels="false"
            >
            </multiselect>
        </div>
        <div class="form-group m-0" v-if="!villageLst || villageLst.length">
            <multiselect
                v-model="curVillage"
                track-by="code"
                label="name"
                placeholder="Выбрать посёлок"
                :options="villageLst"
                :searchable="true"
                :allow-empty="false"
                :show-labels="false"
            >
            </multiselect>
        </div>
        <template #modal-footer>
            <div class="buttons">
                <b-button class="btn-button"  variant="light" @click="showModal = false">Закрыть</b-button>
                <b-button class="btn-button" variant="success" :disabled="!saveEnable" @click="clkSelect">Выбрать</b-button>
            </div>
        </template>
    </b-modal>
    </div>
  </template>

   
  <script lang="ts">
  import { Component, Vue, Prop} from 'vue-property-decorator';
  import {makeToast, getErrorText} from '@/assets/js/some-funct';
  
  @Component({
    name: 'c-kato-modal'
  })
  export default class CKatoModal extends Vue {
    @Prop({
        required: true,
        default: true
    })
    private isVillage!: boolean;

    private showModal = false;

    private curKato: any | null = null;

    // ---------- obl
    private oblLst: any[] = [];
    private curObl: any | null = null;

    // ---- region
    private regionLst: any[] = [];
    private curRegion: any | null = null;
    // -- нас пункт или сельский округ
    private settlementLst: any[] = [];
    private curSettlement: any | null = null;
    // -- село
    private villageLst: any[] = [];
    private curVillage: any | null = null;

    private saveEnable = false;

    private showEvent() {
        this.showModal = true;
    }

    private mounted() {
        this.loadObl();

        this.$watch('curObl', () => {
            this.curRegion = null;
            this.curSettlement = null;
            this.curVillage = null;
            this.setCurKato();
            if (this.curObl && !this.curObl.isReportable) {
                this.loadRegion();
            }
        });

        this.$watch('curRegion', () => {
            this.curSettlement = null;
            this.curVillage = null;
            this.setCurKato();
            if (this.curRegion && !this.curRegion.isReportable) {
                this.loadSettlement();
            }
        });

        this.$watch('curSettlement', () => {
            this.curVillage = null;
            this.setCurKato();
            if (this.curSettlement && !this.curRegion.isReportable) {
                this.loadVillage();
            }
        });

        this.$watch('curVillage', () => {
            this.setCurKato();
        });
    }

    private setCurKato() {
        let curKato: any | null = null;
        if (this.curObl && this.curObl.isReportable) { curKato = this.curObl; }
        if (this.curRegion && this.curRegion.isReportable) { curKato = this.curRegion; }
        if (this.curSettlement && this.curSettlement.isReportable) { curKato = this.curSettlement; }
        if (this.curVillage && this.curVillage.isReportable) { curKato = this.curVillage; }
        this.saveEnable = false;
        if (curKato) {
            if (this.isVillage && curKato.katoLevel === 2) { this.saveEnable = true; }
            if (!this.isVillage && curKato.katoLevel === 1) { this.saveEnable = true; }
        }
        this.curKato = curKato;
    }

    private async loadObl() {
        const oblLst = await this.loadKato(0);
        if (oblLst.length>0) {
            this.curObl = oblLst[0]; 
        } else {
            this.curObl = null;
        }
        this.oblLst = oblLst;
    }

    private async loadRegion() {
        if (!this.curObl) { return; }
        const regionLst = await this.loadKato(this.curObl.id);
        if (regionLst.length > 0) {
            regionLst.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1);
            this.curRegion = regionLst[0];
        } else {
            this.curRegion = null;
        }
        this.regionLst = regionLst;
    }

    private async loadSettlement() {
        if (!this.curRegion) { return; }
        const settlementLst = await this.loadKato(this.curRegion.id);
        if (settlementLst.length > 0) {
            settlementLst.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1);
            this.curSettlement = settlementLst[0];
        } else {
            this.curSettlement = null;
        }
        
        this.settlementLst = settlementLst;
    }

    private async loadVillage() {
        if (!this.curSettlement) { return; }
        let villageLst = await this.loadKato(this.curSettlement.id);
        villageLst = villageLst.filter((el : any) => { return el.isReportable; });
        if (villageLst.length > 0) {
            villageLst.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1);
            this.curVillage = villageLst[0];
        } else {
            this.curVillage = null;
        }
        
        this.villageLst = villageLst;
    }

    private async loadKato(idKato: number) {
        let result: any[] = [];
        try {
            const response = await fetch(`http://85.159.27.162:85/api/RefKato/list?parentId=${idKato}`, {
                method: 'GET',
            });
            
            if (!response.ok) {
                const errTxt = await getErrorText(response);
                throw new Error(errTxt);
            }
            const data = await response.json();
            result = data;
        } catch (error) {
            result = [];
            makeToast(this, 'danger', 'Error loadKato', (error as Error).toString());
            console.error('Error loadKato:', error);
        } finally {
            return result;
        }
    }

    private clkSelect() {
        this.setCurKato();
        if (this.isVillage && this.curKato.katoLevel !== 2) { 
            alert('Выбран не верный тип населённого пункта!');
            return;
        } else if(!this.isVillage && this.curKato.katoLevel !== 1){
            alert('Выберите город!');
            return;
         }
        this.$emit('selectKato', this.curKato);
        this.showModal = false;
    }
  }
  </script>