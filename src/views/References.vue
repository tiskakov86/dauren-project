<template>
  <div class="business-list-view">
    <h1>Справочник Бизнесов</h1>

    <div class="form">
      <h3>Добавить новое значение</h3>
      <b-input v-model="newBusiness.code" placeholder="Код" />
      <b-input v-model="newBusiness.type" placeholder="Тип" />
      <b-input v-model="newBusiness.businessDecription" placeholder="Описание бизнеса" />
      <b-input v-model="newBusiness.nameKk" placeholder="Название (Каз)" />
      <b-input v-model="newBusiness.nameRu" placeholder="Название (Рус)" />
      <b-input v-model="newBusiness.descriptionKk" placeholder="Описание (Каз)" />
      <b-input v-model="newBusiness.descriptionRu" placeholder="Описание (Рус)" />
      <b-button class="btn-button" variant="primary"  @click="addBusiness">Добавить</b-button>
    </div>
    <div class="table-container">
      <table class="table b-table table-bordered b-table-no-border-collapse">
        <thead>
          <tr>
            <th>ID</th>
            <th>Parent ID</th>
            <th>Код</th>
            <th>Тип</th>
            <th>Описание бизнеса</th>
            <th>Название (Каз)</th>
            <th>Название (Рус)</th>
            <th>Описание (Каз)</th>
            <th>Описание (Рус)</th>
            <th>Удален</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="business in businessList" :key="business.id">
            <td v-if="!business.isEditing">{{ business.id }}</td>
            <td v-else>
              <input v-model="business.id" disabled />
            </td>

            <td v-if="!business.isEditing">{{ business.parentId }}</td>
            <td v-else>
              <input v-model="business.parentId" disabled />
            </td>

            <td v-if="!business.isEditing">{{ business.code }}</td>
            <td v-else>
              <input v-model="business.code" placeholder="Код" />
            </td>

            <td v-if="!business.isEditing">{{ business.type }}</td>
            <td v-else>
              <input v-model="business.type" placeholder="Тип" />
            </td>

            <td v-if="!business.isEditing">{{ business.businessDecription }}</td>
            <td v-else>
              <input v-model="business.businessDecription" placeholder="Описание бизнеса" />
            </td>

            <td v-if="!business.isEditing">{{ business.nameKk }}</td>
            <td v-else>
              <input v-model="business.nameKk" placeholder="Название (Каз)" />
            </td>

            <td v-if="!business.isEditing">{{ business.nameRu }}</td>
            <td v-else>
              <input v-model="business.nameRu" placeholder="Название (Рус)" />
            </td>

            <td v-if="!business.isEditing">{{ business.descriptionKk }}</td>
            <td v-else>
              <input v-model="business.descriptionKk" placeholder="Описание (Каз)" />
            </td>

            <td v-if="!business.isEditing">{{ business.descriptionRu }}</td>
            <td v-else>
              <input v-model="business.descriptionRu" placeholder="Описание (Рус)" />
            </td>

            <td v-if="!business.isEditing">{{ business.isDel }}</td>
            <td v-else>
              <input v-model="business.isDel" type="checkbox" />
            </td>

            <td v-if="!business.isEditing">
              <b-button class="btn-button" variant="primary"  @click="editBusiness(business)">Редактировать</b-button>
            </td>
            <td v-else>
              <b-button class="btn-button" variant="success"  @click="updateBusiness(business)">Сохранить</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import '@/assets/css/b-table.css';

export default {
  name: 'BusinessListView',
  data() {
    return {
      businessList: [],
      newBusiness: {
        id: '',
        parentId: '',
        code: '',
        type: '',
        businessDecription: '',
        nameKk: '',
        nameRu: '',
        descriptionKk: '',
        descriptionRu: '',
        isDel: false,
      },
    };
  },
  mounted() {
    this.fetchBusinessList();
  },
  methods: {
    async fetchBusinessList() {
      try {
        const response = await axios.get('http://85.159.27.162:85/api/Refs/businesList');
        this.businessList = response.data;
      } catch (error) {
        console.error('Ошибка при получении списка бизнесов:', error);
      }
    },
    async addBusiness() {
      try {
        const response = await axios.post('http://85.159.27.162:85/api/Refs/AddBusinesDict', this.newBusiness);
        this.businessList.push(response.data);
        this.clearNewBusinessForm();
      } catch (error) {
        console.error('Ошибка при добавлении бизнеса:', error);
      }
    },
    clearNewBusinessForm() {
      this.newBusiness = {
        id: '',
        parentId: '',
        code: '',
        type: '',
        businessDecription: '',
        nameKk: '',
        nameRu: '',
        descriptionKk: '',
        descriptionRu: '',
        isDel: false,
      };
    },
    editBusiness(business) {
      business.isEditing = true;
    },
    async updateBusiness(business) {
      try {
        await axios.post('http://85.159.27.162:85/api/Refs/UpdateBusinesDict', business);
        business.isEditing = false;
      } catch (error) {
        console.error('Ошибка при обновлении бизнеса:', error);
      }
    },
  },
};
</script>

<style scoped>
.business-list-view {
  padding: 20px;
  max-width: 100%;
  margin: auto;
}

.form {
  margin-bottom: 20px;
}

input {
  margin: 5px 0;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  padding: 6px 12px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
