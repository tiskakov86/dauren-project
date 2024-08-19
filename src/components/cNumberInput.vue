<template>
    <input class="form-control"
      type="text"
      :value="formattedValue"
      :disabled = "disabled"
      @input="onInput($event.target.value)"
      @keypress="noAbc"
    />
</template>


<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component({
    name: 'c-number-input'
})
export default class CNumberInput extends Vue {
    @Prop({ default: 0 }) readonly value!: number;

    @Prop({ default: false }) readonly disabled!: boolean;

    @Prop({ default: false }) readonly intType!: boolean;

    private get formattedValue(): string {
        return new Intl.NumberFormat('ru-RU').format(this.value);
    }

    @Emit('input')
    private onInput(newValue: string): number | void {
        let parsedValue = 0;
        if (!this.intType)
            parsedValue = parseFloat(newValue.replace(/[^\d.,-]/g, '').replace(/,/g, '.'));
        else {
            parsedValue = parseInt(newValue);
        }
        if (!isNaN(parsedValue)) {
            return parsedValue;
        } else {
            return 0;
        }
    }

    private noAbc(event: any) {
        // eslint-disable-next-line require-unicode-regexp
       let regex = new RegExp('^-?\\d*[.,]?\\d{0,9}$');
       if (this.intType) { regex = new RegExp(/^[0-9]*$/); }
        const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
}
</script>